import React from 'react';
import './ClaudeComponent.css';

interface ClaudeComponentProps {
  initialMessage?: string;
}

const ClaudeComponent: React.FC<ClaudeComponentProps> = ({ 
  initialMessage = "Hello, I'm Claude! How can I help you today?" 
}) => {
  return (
    <div className="claude-container">
      <div className="claude-header">
        <h2>Claude Assistant</h2>
      </div>
      
      <div className="claude-messages">
        <div className="claude-message">
          {initialMessage}
        </div>
      </div>
    </div>
  );
};

export default ClaudeComponent;