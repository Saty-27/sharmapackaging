import { useState, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import ChatAuthModal from './ChatAuthModal';
import ChatWindow from './ChatWindow';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import './ChatWidget.css';

export default function ChatWidget() {
  const { isOpen, handleToggleWidget, unreadCount } = useChat();
  const [showPrompt, setShowPrompt] = useState(true);

  // Auto show indication tooltip after 1 second if chat is closed
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePromptClick = () => {
    setShowPrompt(false);
    handleToggleWidget();
  };

  const handleDismissPrompt = (e) => {
    e.stopPropagation();
    setShowPrompt(false);
  };

  return (
    <>
      {/* Floating Trigger Wrapper */}
      <div className="chat-widget-trigger-wrapper">
        
        {/* Indication Tooltip Speech Bubble */}
        {!isOpen && showPrompt && (
          <div className="chat-indication-tooltip" onClick={handlePromptClick}>
            <div className="chat-indication-avatar">
              <img 
                src="/uploads/sharma_packaging_logo.png" 
                alt="Sharma Packaging Assistant" 
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
              <span className="online-indicator-dot"></span>
            </div>
            <div className="chat-indication-text">
              <span className="chat-indication-title">Sharma Packaging</span>
              <p className="chat-indication-msg">👋 How can I help you today?</p>
            </div>
            <button 
              className="chat-indication-close" 
              onClick={handleDismissPrompt} 
              aria-label="Close tooltip"
              title="Dismiss"
            >
              <FaTimes />
            </button>
            <div className="chat-indication-arrow"></div>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          className={`chat-widget-trigger ${isOpen ? 'is-active' : ''}`}
          onClick={() => {
            setShowPrompt(false);
            handleToggleWidget();
          }}
          aria-label="Open Support Chat"
        >
          {isOpen ? <FaTimes /> : <FaCommentDots />}
          {!isOpen && unreadCount > 0 && (
            <span className="chat-unread-badge">{unreadCount}</span>
          )}
        </button>
      </div>

      {/* Auth Modal */}
      <ChatAuthModal />

      {/* Chat Window Panel */}
      <ChatWindow />
    </>
  );
}
