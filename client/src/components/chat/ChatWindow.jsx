import { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { FaPaperclip, FaPaperPlane, FaTimes, FaFilePdf, FaFileAlt, FaFileImage, FaFileArchive, FaCheck, FaCheckDouble, FaSignOutAlt } from 'react-icons/fa';

import { getMediaUrl } from '../../utils/api';

export default function ChatWindow() {
  const {
    isOpen,
    setIsOpen,
    customerUser,
    messages,
    sendMessage,
    uploadFile,
    isTyping,
    typingUser,
    logoutCustomer,
    sendTyping
  } = useChat();

  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  if (!isOpen) return null;

  const handleTextChange = (e) => {
    setInputMessage(e.target.value);
    sendTyping(true);

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      sendTyping(false);
    }, 2000);
  };

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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !selectedFile) return;

    let attachmentObj = null;
    if (selectedFile) {
      setFileUploading(true);
      try {
        attachmentObj = await uploadFile(selectedFile);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err) {
        setUploadError(err.message || 'File upload failed');
        setFileUploading(false);
        return;
      }
      setFileUploading(false);
    }

    const textToSend = inputMessage.trim();
    setInputMessage('');
    sendTyping(false);
    await sendMessage(textToSend, attachmentObj);
  };

  const handleQuickOption = (optionText) => {
    sendMessage(`Inquiry Topic: ${optionText}`);
  };

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
        <a href={fullUrl} target="_blank" rel="noreferrer" className="chat-img-preview-link">
          <img src={fullUrl} alt={attachmentName || 'Attachment'} className="chat-msg-img" />
        </a>
      );
    }

    let IconComp = FaFileAlt;
    if (messageType === 'pdf') IconComp = FaFilePdf;
    if (messageType === 'archive') IconComp = FaFileArchive;

    return (
      <a href={fullUrl} target="_blank" rel="noreferrer" className="chat-file-attachment-card">
        <div className="file-card-icon"><IconComp /></div>
        <div className="file-card-info">
          <span className="file-card-name">{attachmentName || 'Attachment'}</span>
          <span className="file-card-size">{sizeMb || '1 MB'}</span>
        </div>
      </a>
    );
  };

  return (
    <div className="chat-window-panel">
      {/* Header */}
      <div className="chat-window-header">
        <div className="chat-header-info">
          <div className="chat-brand-title">Sharma Packaging</div>
          <div className="chat-sub-status">
            <span className="status-dot"></span>
            <span>Support Team • Online</span>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="chat-header-btn" title="Sign out" onClick={logoutCustomer}>
            <FaSignOutAlt />
          </button>
          <button className="chat-header-btn" onClick={() => setIsOpen(false)} aria-label="Minimize">
            <FaTimes />
          </button>
        </div>
      </div>

      {/* User Info Strip */}
      <div className="chat-user-strip">
        <span>Connected as <strong>{customerUser?.name}</strong> ({customerUser?.companyName})</span>
      </div>

      {/* Quick Action Chips */}
      <div className="chat-quick-chips">
        <button type="button" onClick={() => handleQuickOption('Product Enquiry')}>📦 Product Enquiry</button>
        <button type="button" onClick={() => handleQuickOption('Request a Quote')}>📋 Request a Quote</button>
        <button type="button" onClick={() => handleQuickOption('Technical Support')}>🔧 Technical Support</button>
        <button type="button" onClick={() => handleQuickOption('Order Assistance')}>🚛 Order Assistance</button>
      </div>

      {/* Message Stream */}
      <div className="chat-messages-container">
        {messages.map((msg, index) => {
          const isCustomerMsg = msg.senderType === 'customer';
          return (
            <div key={msg._id || index} className={`chat-message-row ${isCustomerMsg ? 'is-me' : 'is-them'}`}>
              <div className="chat-message-bubble">
                {msg.message && <div className="chat-msg-text">{msg.message}</div>}
                {msg.attachmentUrl && renderFileAttachment(msg)}
                <div className="chat-msg-meta">
                  <span className="chat-msg-time">{formatTime(msg.createdAt)}</span>
                  {isCustomerMsg && (
                    <span className="chat-msg-status">
                      {msg.isRead ? <FaCheckDouble className="read-blue" /> : <FaCheck className="sent-grey" />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="chat-message-row is-them">
            <div className="chat-message-bubble typing-bubble">
              <span className="typing-dots">
                <span></span><span></span><span></span>
              </span>
              <span className="typing-text">{typingUser || 'Support Team'} is typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Upload Error / Selected File Alert */}
      {uploadError && (
        <div className="chat-alert-banner error">
          <span>{uploadError}</span>
          <button type="button" onClick={() => setUploadError('')}>×</button>
        </div>
      )}

      {selectedFile && (
        <div className="chat-alert-banner file-staged">
          <span>📎 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
          <button type="button" onClick={() => setSelectedFile(null)}>×</button>
        </div>
      )}

      {/* Composer Input */}
      <form onSubmit={handleSend} className="chat-composer-form">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip"
        />
        <button
          type="button"
          className="chat-attach-btn"
          onClick={() => fileInputRef.current?.click()}
          title="Attach File (Max 1MB)"
        >
          <FaPaperclip />
        </button>

        <input
          type="text"
          className="chat-composer-input"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleTextChange}
        />

        <button type="submit" className="chat-send-btn" disabled={fileUploading || (!inputMessage.trim() && !selectedFile)}>
          {fileUploading ? '...' : <FaPaperPlane />}
        </button>
      </form>
    </div>
  );
}
