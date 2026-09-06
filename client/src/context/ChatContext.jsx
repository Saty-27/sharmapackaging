import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatContext = createContext(null);

const API_BASE = 'http://localhost:5001/api';
const SOCKET_URL = 'http://localhost:5001';

export const ChatProvider = ({ children }) => {
  const [customerToken, setCustomerToken] = useState(() => localStorage.getItem('sp_customer_token') || null);
  const [customerUser, setCustomerUser] = useState(() => {
    const saved = localStorage.getItem('sp_customer_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Axios Instance for Customer API
  const customerApi = axios.create({
    baseURL: API_BASE
  });

  customerApi.interceptors.request.use((config) => {
    if (customerToken) {
      config.headers.Authorization = `Bearer ${customerToken}`;
    }
    return config;
  });

  // Login handler
  const loginCustomer = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/customer/login`, { email, password });
      const { token, user } = res.data;
      setCustomerToken(token);
      setCustomerUser(user);
      localStorage.setItem('sp_customer_token', token);
      localStorage.setItem('sp_customer_user', JSON.stringify(user));
      setAuthModalOpen(false);
      setIsOpen(true);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed.' };
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const registerCustomer = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/customer/register`, formData);
      const { token, user } = res.data;
      setCustomerToken(token);
      setCustomerUser(user);
      localStorage.setItem('sp_customer_token', token);
      localStorage.setItem('sp_customer_user', JSON.stringify(user));
      setAuthModalOpen(false);
      setIsOpen(true);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed.' };
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logoutCustomer = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setCustomerToken(null);
    setCustomerUser(null);
    setConversation(null);
    setMessages([]);
    setUnreadCount(0);
    localStorage.removeItem('sp_customer_token');
    localStorage.removeItem('sp_customer_user');
    setIsOpen(false);
  };

  // Fetch or initialize active customer conversation
  const loadConversation = useCallback(async () => {
    if (!customerToken) return;
    try {
      const res = await customerApi.get('/chat/conversation');
      const { conversation: conv, messages: msgs } = res.data;
      setConversation(conv);
      setMessages(msgs || []);
      return conv;
    } catch (err) {
      console.warn('Error loading customer conversation:', err);
    }
  }, [customerToken]);

  // Socket Connection Setup
  useEffect(() => {
    if (!customerToken) {
      if (socketRef.current) socketRef.current.disconnect();
      return;
    }

    const socket = io(SOCKET_URL, {
      auth: { token: customerToken },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      loadConversation().then((conv) => {
        if (conv?._id || conv?.id) {
          socket.emit('conversation:join', { conversationId: conv._id || conv.id });
        }
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('message:new', (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === msg._id || (msg.idempotencyId && m.idempotencyId === msg.idempotencyId))) {
          return prev;
        }
        return [...prev, msg];
      });

      if (msg.senderType === 'admin') {
        setUnreadCount((prev) => prev + 1);
      }
    });

    socket.on('typing:start', ({ name, senderType }) => {
      if (senderType === 'admin') {
        setIsTyping(true);
        setTypingUser(name || 'Support Team');
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
      }
    });

    socket.on('typing:stop', () => {
      setIsTyping(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [customerToken, loadConversation]);

  // Trigger chatbot button click
  const handleToggleWidget = () => {
    if (!customerToken) {
      setAuthModalOpen(true);
    } else {
      setIsOpen((prev) => !prev);
      if (!isOpen) {
        setUnreadCount(0);
        loadConversation();
      }
    }
  };

  // Send message
  const sendMessage = async (text, attachment = null) => {
    if (!conversation) return;
    const convId = conversation._id || conversation.id;
    const idempotencyId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

    const messageData = {
      conversationId: convId,
      message: text || '',
      messageType: attachment ? attachment.messageType : 'text',
      attachmentUrl: attachment ? attachment.url : '',
      attachmentName: attachment ? attachment.originalName : '',
      attachmentSize: attachment ? attachment.size : 0,
      attachmentMime: attachment ? attachment.mimeType : '',
      idempotencyId
    };

    if (socketRef.current && isConnected) {
      socketRef.current.emit('message:send', messageData);
    } else {
      // API Backup send
      try {
        const res = await customerApi.post('/chat/messages', messageData);
        setMessages((prev) => [...prev, res.data]);
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  // Upload file (1MB max enforced)
  const uploadFile = async (file) => {
    if (file.size > 1 * 1024 * 1024) {
      throw new Error('File is too large. Maximum allowed size is 1 MB.');
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await customerApi.post('/chat/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return res.data;
  };

  // Send typing events
  const sendTyping = (isTypingEvent) => {
    if (!socketRef.current || !conversation) return;
    const convId = conversation._id || conversation.id;
    if (isTypingEvent) {
      socketRef.current.emit('typing:start', { conversationId: convId });
    } else {
      socketRef.current.emit('typing:stop', { conversationId: convId });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        customerToken,
        customerUser,
        isOpen,
        authModalOpen,
        conversation,
        messages,
        unreadCount,
        isTyping,
        typingUser,
        isConnected,
        loading,
        setIsOpen,
        setAuthModalOpen,
        handleToggleWidget,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        sendMessage,
        uploadFile,
        sendTyping
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
