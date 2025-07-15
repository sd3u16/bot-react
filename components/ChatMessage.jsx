import React from 'react'
import { FaRobot } from "react-icons/fa6";

/*
const ChatMessage = ({hist}) => {

  const output = hist.role === 'user' ?  
  <div className="bot-text bot-body-text user-message-body">{hist.text}</div> :
  
  <div className="bot-message">
                <span className='bot-circle bot-body'><FaRobot className='bot' fill='white'/></span>
                <div className='bot-text bot-body-text'>{hist.text}</div>
              </div>

  return (
   
    <div className={hist.role==='user' ? "bot-text bot-body-text user-message-body" : 'bot-message'}>
        
        {hist.role === 'user' ? hist.text : !hist.hideInChat && <div className='bot-message'><span className='bot-circle bot-body'><FaRobot className='bot' fill='white'/></span><div className='bot-text bot-body-text'>{hist.text}</div></div>}
        
    </div>
   
  )
}
 */

const ChatMessage = ({ hist }) => {
  // Don't render if it should be hidden
  if (hist.hideInChat) return null;

  // User message
  if (hist.role === 'user') {
    return (
      <div className="bot-text bot-body-text user-message-body">
        {hist.text}
      </div>
    );
  }

  // Bot message
  return (
    <div className="bot-message">
      <span className="bot-circle bot-body">
        <FaRobot className="bot" fill="white" />
      </span>
      <div className="bot-text bot-body-text">{hist.text}</div>
    </div>
  );
};
export default ChatMessage
