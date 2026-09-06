const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Conversation = require('./models/Conversation');
const ChatMessage = require('./models/ChatMessage');
const CustomerUser = require('./models/CustomerUser');

const jwtSecret = process.env.JWT_SECRET || 'sharmapackaging_jwt_secret_2024_secure_key';

function initSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH']
    }
  });

  // Socket Authentication Middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) {
      return next(new Error('Authentication error: Token missing'));
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      socket.user = decoded;
      return next();
    } catch (err) {
      return next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', async (socket) => {
    const user = socket.user;
    const userId = user.id || user._id;
    const isCustomer = user.role === 'customer';
    const isAdmin = user.role === 'admin' || user.role === 'superadmin';

    // If admin connects, join admin global room
    if (isAdmin) {
      socket.join('admin:room');
    }

    // If customer connects, mark customer online in DB if active
    if (isCustomer && mongoose.connection.readyState === 1) {
      try {
        await CustomerUser.findByIdAndUpdate(userId, { isOnline: true, lastSeenAt: new Date() });
        io.to('admin:room').emit('user:status', { userId, isOnline: true });
      } catch (err) {
        console.warn('Socket status update warning:', err.message);
      }
    }

    // Join room event
    socket.on('conversation:join', async ({ conversationId }) => {
      if (!conversationId) return;
      socket.join(`conversation:${conversationId}`);
    });

    // Leave room event
    socket.on('conversation:leave', ({ conversationId }) => {
      if (!conversationId) return;
      socket.leave(`conversation:${conversationId}`);
    });

    // Send Message Event
    socket.on('message:send', async (data) => {
      try {
        const { conversationId, message, attachmentUrl, attachmentName, attachmentSize, attachmentMime, messageType, idempotencyId } = data;
        if (!conversationId) return;

        let msgRecord = null;
        const senderType = isCustomer ? 'customer' : 'admin';

        if (mongoose.connection.readyState === 1) {
          try {
            // Deduplication check
            if (idempotencyId) {
              const existing = await ChatMessage.findOne({ idempotencyId });
              if (existing) {
                return socket.emit('message:new', existing);
              }
            }

            msgRecord = await ChatMessage.create({
              conversationId,
              senderId: userId,
              senderType,
              messageType: messageType || 'text',
              message: message || '',
              attachmentUrl: attachmentUrl || '',
              attachmentName: attachmentName || '',
              attachmentSize: attachmentSize || 0,
              attachmentMime: attachmentMime || '',
              idempotencyId: idempotencyId || ''
            });

            // Update conversation stats
            const updateField = isCustomer ? { unreadCountAdmin: 1 } : { unreadCountCustomer: 1 };
            const updatedConv = await Conversation.findByIdAndUpdate(
              conversationId,
              {
                lastMessageAt: new Date(),
                $inc: updateField
              },
              { new: true }
            ).populate('customerId', 'name email phone companyName inquiryType country isOnline');

            // Emit to conversation room
            io.to(`conversation:${conversationId}`).emit('message:new', msgRecord);

            // Notify admin dashboard
            io.to('admin:room').emit('conversation:updated', {
              conversation: updatedConv,
              lastMessage: msgRecord
            });

            return;
          } catch (dbErr) {
            console.warn('DB socket message send error:', dbErr.message);
          }
        }

        // Fallback in-memory socket message emit
        msgRecord = {
          _id: 'msg-' + Date.now(),
          conversationId,
          senderId: userId,
          senderType,
          messageType: messageType || 'text',
          message: message || '',
          attachmentUrl: attachmentUrl || '',
          attachmentName: attachmentName || '',
          attachmentSize: attachmentSize || 0,
          attachmentMime: attachmentMime || '',
          createdAt: new Date()
        };

        io.to(`conversation:${conversationId}`).emit('message:new', msgRecord);
        io.to('admin:room').emit('conversation:updated', {
          conversationId,
          lastMessage: msgRecord
        });
      } catch (err) {
        console.error('Error handling socket message:send:', err);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing Indicators
    socket.on('typing:start', ({ conversationId }) => {
      if (!conversationId) return;
      socket.to(`conversation:${conversationId}`).emit('typing:start', {
        conversationId,
        senderType: isCustomer ? 'customer' : 'admin',
        name: user.name || (isCustomer ? 'Customer' : 'Support Team')
      });
    });

    socket.on('typing:stop', ({ conversationId }) => {
      if (!conversationId) return;
      socket.to(`conversation:${conversationId}`).emit('typing:stop', { conversationId });
    });

    // Message Read Event
    socket.on('message:read', async ({ conversationId }) => {
      if (!conversationId) return;
      if (mongoose.connection.readyState === 1) {
        try {
          await ChatMessage.updateMany(
            { conversationId, isRead: false },
            { $set: { isRead: true, readAt: new Date() } }
          );
          if (isCustomer) {
            await Conversation.findByIdAndUpdate(conversationId, { unreadCountCustomer: 0 });
          } else {
            await Conversation.findByIdAndUpdate(conversationId, { unreadCountAdmin: 0 });
          }
        } catch (err) {
          console.warn('DB mark read error:', err.message);
        }
      }
      io.to(`conversation:${conversationId}`).emit('message:read', { conversationId });
    });

    // Disconnect Event
    socket.on('disconnect', async () => {
      if (isCustomer && mongoose.connection.readyState === 1) {
        try {
          await CustomerUser.findByIdAndUpdate(userId, { isOnline: false, lastSeenAt: new Date() });
          io.to('admin:room').emit('user:status', { userId, isOnline: false });
        } catch (err) {
          console.warn('Socket disconnect status warning:', err.message);
        }
      }
    });
  });

  return io;
}

module.exports = initSocket;
