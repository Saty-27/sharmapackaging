import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import { getMediaUrl } from '../../utils/api';
import { 
  FaSearch, FaPaperclip, FaPaperPlane, FaUser, FaBuilding, FaEnvelope, 
  FaPhone, FaGlobe, FaCheckCircle, FaExclamationCircle, 
  FaFilePdf, FaFileAlt, FaFileImage, FaFileArchive, FaUserCircle, FaTimes
} from 'react-icons/fa';
import './AdminChatbot.css';

const trimTrailingSlash = (value) => (value || '').replace(/\/+$/, '');
const configuredApiBase = import.meta.env.VITE_API_URL?.trim();
const defaultApiBase = import.meta.env.DEV ? 'http://localhost:5002' : '';
const BASE_HOST = trimTrailingSlash(configuredApiBase || defaultApiBase);

const API_BASE = `${BASE_HOST}/api`;
const SOCKET_URL = BASE_HOST || (typeof window !== 'undefined' ? window.location.origin : '');

export default function AdminChatbot() {
  const { token, user: adminUser } = useAuth();
  
  const [conversations, setConversations] = useState([]);
  const [selectedConvId, setSelectedConvId] = useState(null);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [customerIsTyping, setCustomerIsTyping] = useState(false);
  const [typingCustomerName, setTypingCustomerName] = useState('');
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const selectedConvIdRef = useRef(selectedConvId);
  const threadRef = useRef(null);

  useEffect(() => {
    selectedConvIdRef.current = selectedConvId;
  }, [selectedConvId]);

  const effectiveToken = token || localStorage.getItem('sharmapackaging_token');

  // Admin Axios instance
  const adminApi = axios.create({ baseURL: API_BASE });
  adminApi.interceptors.request.use((config) => {
    const t = effectiveToken || localStorage.getItem('sharmapackaging_token');
    if (t) config.headers.Authorization = `Bearer ${t}`;
    return config;
  });

  // Fetch conversation list
  const fetchConversations = useCallback(async () => {
    try {
      const res = await adminApi.get('/chat/admin/conversations', {
        params: { search: searchTerm, status: statusFilter }
      });
      const rawList = res.data || [];
      const sortedList = [...rawList].sort((a, b) => {
        const timeA = new Date(a.lastMessageTime || a.updatedAt || a.createdAt || 0).getTime();
        const timeB = new Date(b.lastMessageTime || b.updatedAt || b.createdAt || 0).getTime();
        return timeB - timeA;
      });
      setConversations(sortedList);
      if (!selectedConvIdRef.current && sortedList.length > 0) {
        const initialId = sortedList[0]._id || sortedList[0].id;
        setSelectedConvId(initialId);
      }
    } catch (err) {
      console.warn('Error fetching admin conversations:', err);
    }
  }, [searchTerm, statusFilter]);

  // Fetch active conversation detail & messages
  const fetchActiveConversationDetail = useCallback(async (convId) => {
    if (!convId) return;
    try {
      const res = await adminApi.get(`/chat/admin/conversations/${convId}`);
      setActiveConv(res.data.conversation);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.warn('Error fetching active conversation detail:', err);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  useEffect(() => {
    if (selectedConvId) {
      fetchActiveConversationDetail(selectedConvId);
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('conversation:join', { conversationId: selectedConvId });
      }
    }
  }, [selectedConvId, fetchActiveConversationDetail]);

  // Socket Connection Setup for Admin
  useEffect(() => {
    const currentToken = effectiveToken || localStorage.getItem('sharmapackaging_token');
    if (!currentToken) return;

    const socket = io(SOCKET_URL, {
      auth: { token: currentToken },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      const activeId = selectedConvIdRef.current;
      if (activeId) {
        socket.emit('conversation:join', { conversationId: activeId });
      }
    });

    socket.on('message:new', (msg) => {
      const activeId = String(selectedConvIdRef.current || '');
      const msgConvId = String(msg?.conversationId?._id || msg?.conversationId || msg?.conversation || '');
      if (activeId && msgConvId && msgConvId === activeId) {
        setMessages((prev) => {
          if (prev.some((m) => String(m._id) === String(msg._id) || (msg.idempotencyId && m.idempotencyId === msg.idempotencyId))) {
            return prev;
          }
          return [...prev, msg];
        });
        fetchActiveConversationDetail(activeId);
      }
      fetchConversations();
    });

    socket.on('conversation:updated', ({ conversation, lastMessage }) => {
      fetchConversations();
      const activeId = String(selectedConvIdRef.current || '');
      const targetConvId = String(
        conversation?._id || 
        conversation?.id || 
        lastMessage?.conversationId?._id || 
        lastMessage?.conversationId || 
        lastMessage?.conversation || 
        ''
      );

      if (activeId && targetConvId && targetConvId === activeId) {
        if (lastMessage) {
          setMessages((prev) => {
            if (prev.some((m) => String(m._id) === String(lastMessage._id) || (lastMessage.idempotencyId && m.idempotencyId === lastMessage.idempotencyId))) {
              return prev;
            }
            return [...prev, lastMessage];
          });
        }
        fetchActiveConversationDetail(activeId);
      }
    });

    socket.on('typing:start', ({ senderType, name, conversationId }) => {
      const activeId = selectedConvIdRef.current;
      if (senderType === 'customer' && conversationId === activeId) {
        setCustomerIsTyping(true);
        setTypingCustomerName(name || 'Customer');
      }
    });

    socket.on('typing:stop', ({ conversationId }) => {
      const activeId = selectedConvIdRef.current;
      if (conversationId === activeId) {
        setCustomerIsTyping(false);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [effectiveToken, fetchConversations]);

  // Switch Active Conversation Room
  const handleSelectConversation = (convId) => {
    if (selectedConvId === convId) return;
    if (socketRef.current && selectedConvId) {
      socketRef.current.emit('conversation:leave', { conversationId: selectedConvId });
    }
    setSelectedConvId(convId);
    if (socketRef.current) {
      socketRef.current.emit('conversation:join', { conversationId: convId });
    }
  };

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTo({
        top: threadRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, customerIsTyping]);

  // File select handler (1MB cap)
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setUploadError('');
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      setUploadError('File is too large. Maximum allowed size is 1 MB.');
      e.target.value = '';
      return;
    }

    const ext = file.name.split('.').pop().toLowerCase();
    const blocked = ['exe', 'bat', 'cmd', 'scr', 'com', 'msi', 'js', 'vbs', 'ps1', 'sh'];
    if (blocked.includes(ext)) {
      setUploadError('Executable files are strictly prohibited.');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  // Upload file API
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await adminApi.post('/chat/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  };

  // Send message handler
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!selectedConvId || (!inputMessage.trim() && !selectedFile)) return;

    let attachmentObj = null;
    if (selectedFile) {
      setFileUploading(true);
      try {
        attachmentObj = await uploadFile(selectedFile);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err) {
        setUploadError(err.message || 'Upload failed');
        setFileUploading(false);
        return;
      }
      setFileUploading(false);
    }

    const textToSend = inputMessage.trim();
    setInputMessage('');

    const idempotencyId = 'msg-admin-' + Date.now();
    const messageData = {
      conversationId: selectedConvId,
      senderType: 'admin',
      message: textToSend,
      messageType: attachmentObj ? attachmentObj.messageType : 'text',
      attachmentUrl: attachmentObj ? attachmentObj.url : '',
      attachmentName: attachmentObj ? attachmentObj.originalName : '',
      attachmentSize: attachmentObj ? attachmentObj.size : 0,
      attachmentMime: attachmentObj ? attachmentObj.mimeType : '',
      idempotencyId
    };

    // Optimistic UI update in Admin thread
    const localMsg = {
      _id: idempotencyId,
      conversationId: selectedConvId,
      senderId: adminUser?.id || adminUser?._id || 'admin',
      senderType: 'admin',
      messageType: messageData.messageType,
      message: messageData.message,
      attachmentUrl: messageData.attachmentUrl,
      attachmentName: messageData.attachmentName,
      attachmentSize: messageData.attachmentSize,
      attachmentMime: messageData.attachmentMime,
      createdAt: new Date().toISOString()
    };
    setMessages((prev) => [...prev, localMsg]);

    if (socketRef.current) {
      socketRef.current.emit('message:send', messageData);
    }

    try {
      await adminApi.post('/chat/admin/messages', messageData);
    } catch (err) {
      console.warn('API backup admin message send error:', err.message);
    }
  };

  // Status Change (Resolve / Reopen)
  const handleStatusChange = async (newStatus) => {
    if (!selectedConvId) return;
    try {
      const res = await adminApi.patch(`/chat/admin/conversations/${selectedConvId}/status`, { status: newStatus });
      setActiveConv(res.data);
      fetchConversations();
    } catch (err) {
      console.warn('Error updating status:', err);
    }
  };

  // Compute counters
  const totalCount = conversations.length;
  const openCount = conversations.filter(c => c.status === 'open').length;
  const pendingCount = conversations.filter(c => c.status === 'pending').length;
  const unreadCount = conversations.filter(c => c.unreadCountAdmin > 0).length;
  const onlineCount = conversations.filter(c => c.customerId?.isOnline).length;

  const customerObj = activeConv?.customerId || {};

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderFileAttachment = (msg) => {
    const { messageType, attachmentUrl, attachmentName, attachmentSize } = msg;
    const fullUrl = getMediaUrl(attachmentUrl);
    const sizeMb = attachmentSize ? (attachmentSize / (1024 * 1024)).toFixed(2) + ' MB' : '';

    if (messageType === 'image') {
      return (
        <a href={fullUrl} target="_blank" rel="noreferrer" className="admin-chat-img-link">
          <img src={fullUrl} alt={attachmentName} className="admin-chat-msg-img" />
        </a>
      );
    }

    let IconComp = FaFileAlt;
    if (messageType === 'pdf') IconComp = FaFilePdf;
    if (messageType === 'archive') IconComp = FaFileArchive;

    return (
      <a href={fullUrl} target="_blank" rel="noreferrer" className="admin-chat-file-card">
        <div className="file-card-icon"><IconComp /></div>
        <div className="file-card-info">
          <span className="file-card-name">{attachmentName || 'Attachment'}</span>
          <span className="file-card-size">{sizeMb || '1 MB'}</span>
        </div>
      </a>
    );
  };

  return (
    <div className="admin-chatbot-page">
      {/* Top Counter Bar */}
      <div className="admin-chatbot-stats-bar">
        <div className="stat-chip">
          <span className="stat-label">TOTAL</span>
          <span className="stat-val">{totalCount}</span>
        </div>
        <div className="stat-chip open">
          <span className="stat-label">OPEN</span>
          <span className="stat-val">{openCount}</span>
        </div>
        <div className="stat-chip pending">
          <span className="stat-label">PENDING</span>
          <span className="stat-val">{pendingCount}</span>
        </div>
        <div className="stat-chip unread">
          <span className="stat-label">UNREAD</span>
          <span className="stat-val">{unreadCount}</span>
        </div>
        <div className="stat-chip online">
          <span className="stat-label">ONLINE</span>
          <span className="stat-val">{onlineCount}</span>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="admin-chatbot-main-grid">
        {/* Left List Panel */}
        <div className="admin-chatbot-sidebar">
          {/* Search Box */}
          <div className="admin-chat-search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search customer, company, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          <div className="admin-chat-tabs">
            <button className={statusFilter === 'all' ? 'active' : ''} onClick={() => setStatusFilter('all')}>All</button>
            <button className={statusFilter === 'open' ? 'active' : ''} onClick={() => setStatusFilter('open')}>Open</button>
            <button className={statusFilter === 'pending' ? 'active' : ''} onClick={() => setStatusFilter('pending')}>Pending</button>
            <button className={statusFilter === 'resolved' ? 'active' : ''} onClick={() => setStatusFilter('resolved')}>Resolved</button>
          </div>

          {/* Conversation Cards List */}
          <div className="admin-conv-list">
            {conversations.length === 0 ? (
              <div className="admin-empty-state">No conversations found.</div>
            ) : (
              conversations.map((c) => {
                const cId = c._id || c.id;
                const cust = c.customerId || {};
                const isSelected = cId === selectedConvId;
                const hasUnread = c.unreadCountAdmin > 0;

                return (
                  <div
                    key={cId}
                    className={`admin-conv-card ${isSelected ? 'is-selected' : ''} ${hasUnread ? 'is-unread' : ''}`}
                    onClick={() => handleSelectConversation(cId)}
                  >
                    <div className="conv-card-avatar">
                      <FaUserCircle />
                      {cust.isOnline && <span className="online-indicator"></span>}
                    </div>

                    <div className="conv-card-body">
                      <div className="conv-card-top">
                        <span className="conv-customer-name">{cust.name || c.customerName || 'Customer'}</span>
                        <span className="conv-time">{formatTime(c.lastMessageTime || c.updatedAt)}</span>
                      </div>

                      <div className="conv-company-name">{cust.companyName || c.companyName || 'Company'}</div>

                      <div className="conv-card-msg">
                        {c.lastMessage || 'Started conversation'}
                      </div>
                    </div>

                    {hasUnread && <span className="unread-dot">{c.unreadCountAdmin}</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Active Chat Window */}
        <div className="admin-chatbot-chat-area">
          {activeConv ? (
            <>
              {/* Header */}
              <div className="admin-chat-header">
                <div className="admin-chat-user-info">
                  <div className="admin-chat-avatar">
                    <FaUserCircle />
                    {customerObj.isOnline && <span className="online-indicator"></span>}
                  </div>
                  <div>
                    <div className="admin-cust-name-row">
                      <h3>{customerObj.name || activeConv.customerName || 'Customer'}</h3>
                      <span className={`status-pill ${activeConv.status}`}>{activeConv.status}</span>
                    </div>
                    <div className="admin-cust-sub">
                      <span>{customerObj.companyName || activeConv.companyName}</span> • <span>{customerObj.email || activeConv.email}</span> • <span>{customerObj.phone || activeConv.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="admin-header-actions">
                  <button type="button" className="btn-outline-sm" onClick={() => setShowProfileDrawer(!showProfileDrawer)}>
                    <FaUser /> View Profile
                  </button>

                  {activeConv.status !== 'resolved' ? (
                    <button type="button" className="btn-resolve-sm" onClick={() => handleStatusChange('resolved')}>
                      <FaCheckCircle /> Mark Resolved
                    </button>
                  ) : (
                    <button type="button" className="btn-reopen-sm" onClick={() => handleStatusChange('open')}>
                      <FaExclamationCircle /> Reopen
                    </button>
                  )}
                </div>
              </div>

              {/* Chat Thread */}
              <div className="admin-chat-thread" ref={threadRef}>
                {messages.map((m, idx) => {
                  const isAdminMsg = m.senderType === 'admin';
                  const isSystem = m.senderType === 'system';

                  if (isSystem) {
                    return (
                      <div key={m._id || idx} className="admin-system-msg-row">
                        <span>{m.message}</span>
                      </div>
                    );
                  }

                  return (
                    <div key={m._id || idx} className={`admin-msg-row ${isAdminMsg ? 'is-admin' : 'is-customer'}`}>
                      <div className="admin-msg-bubble">
                        {m.message && <div className="msg-text">{m.message}</div>}
                        {m.attachmentUrl && renderFileAttachment(m)}
                        <div className="msg-time">{formatTime(m.createdAt)}</div>
                      </div>
                    </div>
                  );
                })}

                {customerIsTyping && (
                  <div className="admin-msg-row is-customer">
                    <div className="admin-msg-bubble typing-bubble">
                      <span className="typing-text">{typingCustomerName} is typing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Staged Upload / Error Banner */}
              {uploadError && (
                <div className="admin-alert-banner error">
                  <span>{uploadError}</span>
                  <button type="button" onClick={() => setUploadError('')}>×</button>
                </div>
              )}

              {selectedFile && (
                <div className="admin-alert-banner file-staged">
                  <span>📎 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                  <button type="button" onClick={() => setSelectedFile(null)}>×</button>
                </div>
              )}

              {/* Composer */}
              <form onSubmit={handleSendMessage} className="admin-chat-composer">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip"
                />
                <button
                  type="button"
                  className="admin-attach-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach File (Max 1MB)"
                >
                  <FaPaperclip />
                </button>

                <input
                  type="text"
                  className="admin-composer-input"
                  placeholder="Type your response to customer..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />

                <button type="submit" className="admin-send-btn" disabled={fileUploading || (!inputMessage.trim() && !selectedFile)}>
                  {fileUploading ? '...' : <FaPaperPlane />}
                </button>
              </form>
            </>
          ) : (
            <div className="admin-no-selected">
              <FaUserCircle className="empty-icon" />
              <h3>Select a customer conversation</h3>
              <p>Choose an active conversation from the list to view profile and reply in real time.</p>
            </div>
          )}
        </div>

        {/* Customer Profile Drawer */}
        {showProfileDrawer && customerObj && (
          <div className="admin-profile-drawer">
            <div className="drawer-header">
              <h3>Customer Profile</h3>
              <button onClick={() => setShowProfileDrawer(false)}><FaTimes /></button>
            </div>

            <div className="drawer-body">
              <div className="profile-hero">
                <FaUserCircle className="profile-big-avatar" />
                <h4>{customerObj.name || 'Customer'}</h4>
                <p>{customerObj.companyName || 'Company'}</p>
                <span className={`status-badge ${customerObj.isOnline ? 'online' : 'offline'}`}>
                  {customerObj.isOnline ? '● Online Now' : 'Offline'}
                </span>
              </div>

              <div className="profile-details-list">
                <div className="detail-item">
                  <FaEnvelope className="icon" />
                  <div>
                    <label>Email Address</label>
                    <span>{customerObj.email || 'N/A'}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FaPhone className="icon" />
                  <div>
                    <label>Phone Number</label>
                    <span>{customerObj.phone || 'N/A'}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FaBuilding className="icon" />
                  <div>
                    <label>Company Name</label>
                    <span>{customerObj.companyName || 'N/A'}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FaGlobe className="icon" />
                  <div>
                    <label>Country / Location</label>
                    <span>{customerObj.country || 'India'}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FaFileAlt className="icon" />
                  <div>
                    <label>Inquiry Type</label>
                    <span>{customerObj.inquiryType || 'General Enquiry'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
