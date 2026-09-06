const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Conversation = require('../models/Conversation');
const ChatMessage = require('../models/ChatMessage');
const CustomerUser = require('../models/CustomerUser');
const { protectCustomer } = require('../middleware/customerAuth');
const { protect: protectAdmin } = require('../middleware/auth');

// Ensure chat uploads directory exists
const uploadDir = path.join(__dirname, '../uploads/chat');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Block dangerous executable extensions
const BLOCKED_EXTENSIONS = new Set([
  '.exe', '.bat', '.cmd', '.scr', '.com', '.msi', '.js', '.vbs', '.ps1', '.sh', '.dll', '.vbe', '.jse', '.wsf', '.wsh'
]);

// Configure Multer with strict 1MB size limit and extension filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'chat-file-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (BLOCKED_EXTENSIONS.has(ext)) {
    return cb(new Error('Dangerous executable files are strictly prohibited.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB limit
  fileFilter
});

// In-Memory Fallback Store (Used when MongoDB connection is inactive)
const inMemoryConversations = new Map();
const inMemoryMessages = new Map();

// Helper to determine messageType from file mime/extension
const getMessageTypeFromFile = (mime, filename) => {
  if (mime.startsWith('image/')) return 'image';
  if (mime === 'application/pdf' || filename.endsWith('.pdf')) return 'pdf';
  if (mime.includes('spreadsheet') || mime.includes('excel') || filename.endsWith('.xlsx') || filename.endsWith('.csv')) return 'spreadsheet';
  if (mime.includes('word') || mime.includes('document') || filename.endsWith('.docx') || filename.endsWith('.doc')) return 'document';
  if (mime.includes('zip') || mime.includes('rar') || mime.includes('tar') || filename.endsWith('.zip')) return 'archive';
  return 'other';
};

// ----------------------------------------------------
// CUSTOMER ENDPOINTS
// ----------------------------------------------------

// GET /api/chat/conversation - Fetch or create active conversation for logged-in customer
router.get('/conversation', protectCustomer, async (req, res) => {
  try {
    const customerId = req.customer._id || req.customer.id;

    if (mongoose.connection.readyState === 1) {
      try {
        let conversation = await Conversation.findOne({ customerId, status: { $ne: 'closed' } })
          .populate('assignedAdminId', 'name email')
          .sort({ updatedAt: -1 });

        if (!conversation) {
          conversation = await Conversation.create({
            customerId,
            status: 'open',
            supportMode: 'human',
            lastMessageAt: new Date()
          });

          // Add welcome message from system
          await ChatMessage.create({
            conversationId: conversation._id,
            senderId: 'system',
            senderType: 'bot',
            messageType: 'text',
            message: `Hello ${req.customer.name}, welcome to Sharma Packaging Support Team. How can we assist your business today?`
          });
        }

        const messages = await ChatMessage.find({ conversationId: conversation._id }).sort({ createdAt: 1 });
        return res.json({ conversation, messages });
      } catch (dbErr) {
        console.warn('DB conversation fetch warning:', dbErr.message);
      }
    }

    // Fallback In-Memory logic
    let conv = Array.from(inMemoryConversations.values()).find(c => c.customerId === customerId && c.status !== 'closed');
    if (!conv) {
      const convId = 'conv-' + Date.now();
      conv = {
        _id: convId,
        id: convId,
        customerId,
        customerName: req.customer.name,
        companyName: req.customer.companyName,
        email: req.customer.email,
        phone: req.customer.phone,
        status: 'open',
        supportMode: 'human',
        lastMessageAt: new Date(),
        unreadCountCustomer: 0,
        unreadCountAdmin: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      inMemoryConversations.set(convId, conv);

      const sysMsg = {
        _id: 'msg-' + Date.now(),
        conversationId: convId,
        senderId: 'system',
        senderType: 'bot',
        messageType: 'text',
        message: `Hello ${req.customer.name}, welcome to Sharma Packaging Support Team. How can we assist your business today?`,
        createdAt: new Date()
      };
      inMemoryMessages.set(convId, [sysMsg]);
    }

    const messages = inMemoryMessages.get(conv._id || conv.id) || [];
    res.json({ conversation: conv, messages });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ message: 'Failed to load conversation', error: error.message });
  }
});

// POST /api/chat/upload - Customer & Admin File Upload (1MB max, MIME check)
router.post('/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File is too large. Maximum allowed size is 1 MB.' });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const fileUrl = '/uploads/chat/' + req.file.filename;
    const messageType = getMessageTypeFromFile(req.file.mimetype, req.file.originalname);

    res.json({
      url: fileUrl,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      messageType
    });
  });
});

// ----------------------------------------------------
// ADMIN ENDPOINTS
// ----------------------------------------------------

// GET /api/chat/admin/conversations - Admin list conversations with search & filter
router.get('/admin/conversations', protectAdmin, async (req, res) => {
  try {
    const { search, status } = req.query;

    if (mongoose.connection.readyState === 1) {
      try {
        let query = {};
        if (status && status !== 'all') {
          query.status = status;
        }

        let conversations = await Conversation.find(query)
          .populate('customerId', 'name email phone companyName inquiryType country isOnline lastSeenAt')
          .sort({ updatedAt: -1 })
          .lean();

        // Perform search filtering if provided
        if (search && search.trim()) {
          const s = search.trim().toLowerCase();
          conversations = conversations.filter(c => {
            const cust = c.customerId || {};
            return (
              (cust.name && cust.name.toLowerCase().includes(s)) ||
              (cust.email && cust.email.toLowerCase().includes(s)) ||
              (cust.companyName && cust.companyName.toLowerCase().includes(s)) ||
              (cust.phone && cust.phone.toLowerCase().includes(s)) ||
              c._id.toString().includes(s)
            );
          });
        }

        // Attach last message preview to each conversation
        for (let conv of conversations) {
          const lastMsg = await ChatMessage.findOne({ conversationId: conv._id })
            .sort({ createdAt: -1 })
            .lean();
          conv.lastMessage = lastMsg ? lastMsg.message || (lastMsg.attachmentName ? `📎 ${lastMsg.attachmentName}` : 'File attached') : '';
          conv.lastMessageTime = lastMsg ? lastMsg.createdAt : conv.updatedAt;
        }

        return res.json(conversations);
      } catch (dbErr) {
        console.warn('DB admin conversations fetch warning:', dbErr.message);
      }
    }

    // In-memory fallback for admin
    let list = Array.from(inMemoryConversations.values());
    if (status && status !== 'all') {
      list = list.filter(c => c.status === status);
    }
    if (search && search.trim()) {
      const s = search.trim().toLowerCase();
      list = list.filter(c => 
        (c.customerName && c.customerName.toLowerCase().includes(s)) ||
        (c.email && c.email.toLowerCase().includes(s)) ||
        (c.companyName && c.companyName.toLowerCase().includes(s))
      );
    }

    list.forEach(c => {
      const msgs = inMemoryMessages.get(c._id || c.id) || [];
      const lastMsg = msgs[msgs.length - 1];
      c.lastMessage = lastMsg ? lastMsg.message || (lastMsg.attachmentName ? `📎 ${lastMsg.attachmentName}` : 'Attachment') : '';
      c.lastMessageTime = lastMsg ? lastMsg.createdAt : c.updatedAt;
    });

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin conversations', error: error.message });
  }
});

// GET /api/chat/admin/conversations/:id - Fetch conversation detail & messages
router.get('/admin/conversations/:id', protectAdmin, async (req, res) => {
  try {
    const convId = req.params.id;

    if (mongoose.connection.readyState === 1) {
      try {
        const conversation = await Conversation.findById(convId)
          .populate('customerId', 'name email phone companyName address country inquiryType accountStatus isOnline lastSeenAt createdAt');
        
        if (!conversation) {
          return res.status(404).json({ message: 'Conversation not found' });
        }

        const messages = await ChatMessage.find({ conversationId: convId }).sort({ createdAt: 1 });

        // Mark admin unread count as 0
        conversation.unreadCountAdmin = 0;
        await conversation.save();

        return res.json({ conversation, messages });
      } catch (err) {
        console.warn('DB admin conv detail warning:', err.message);
      }
    }

    const conv = inMemoryConversations.get(convId);
    if (!conv) return res.status(404).json({ message: 'Conversation not found' });
    conv.unreadCountAdmin = 0;
    const msgs = inMemoryMessages.get(convId) || [];
    res.json({ conversation: conv, messages: msgs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversation detail', error: error.message });
  }
});

// PATCH /api/chat/admin/conversations/:id/status - Update conversation status (open/resolved/closed)
router.get('/admin/customers', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const customers = await CustomerUser.find().select('-password').sort({ createdAt: -1 });
        return res.json(customers);
      } catch (err) {
        console.warn('DB admin customers fetch warning:', err.message);
      }
    }
    const list = Array.from(inMemoryConversations.values()).map(c => ({
      _id: c.customerId,
      name: c.customerName,
      email: c.email,
      phone: c.phone,
      companyName: c.companyName,
      createdAt: c.createdAt
    }));
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
});

router.patch('/admin/conversations/:id/status', protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['open', 'pending', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const convId = req.params.id;

    if (mongoose.connection.readyState === 1) {
      try {
        const conversation = await Conversation.findByIdAndUpdate(
          convId,
          { status, updatedAt: new Date() },
          { new: true }
        ).populate('customerId', 'name email phone companyName');

        // Add system message for status update
        await ChatMessage.create({
          conversationId: convId,
          senderId: req.user.id || 'admin',
          senderType: 'system',
          messageType: 'text',
          message: `Conversation status changed to "${status}" by Support Team.`
        });

        return res.json(conversation);
      } catch (err) {
        console.warn('DB update status error:', err.message);
      }
    }

    const conv = inMemoryConversations.get(convId);
    if (conv) {
      conv.status = status;
      conv.updatedAt = new Date();
      const msgs = inMemoryMessages.get(convId) || [];
      msgs.push({
        _id: 'msg-' + Date.now(),
        conversationId: convId,
        senderId: 'admin',
        senderType: 'system',
        messageType: 'text',
        message: `Conversation status changed to "${status}" by Support Team.`,
        createdAt: new Date()
      });
    }

    res.json(conv);
  } catch (error) {
    res.status(500).json({ message: 'Error updating conversation status', error: error.message });
  }
});

module.exports = router;
