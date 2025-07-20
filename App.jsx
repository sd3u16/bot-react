import { useEffect, useReducer, useState, useRef } from 'react'
import { FaRobot } from "react-icons/fa6";
import { MdOutlineArrowDownward } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';
import { IoCloseOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { companyInfo } from './companyInfo';


function App() {

 const [hasInputText, setHasInputText] = useState(false);


  const [history, setHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
  const [shotPop, setShowPop] = useState(false)
  const bodyRef = useRef(null)
  
  useEffect(()=>{

    bodyRef.current &&
         bodyRef.current.scrollTo({top: bodyRef.current.scrollHeight, behavior: 'smooth'})
  }, [history])


  const generateBotResponse =async (history) => {


    const updateHistory = (text, isError = false) => {
      setHistory((prev) => [...prev.filter((msg) => msg.text != "Thinking..."), { role: "model", text, isError }]);
    };
    // Format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };



    try{
      const response = await fetch(import.meta.env.VITE_GEMINI_API_KEY, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error.message || "Something went wrong!");
      // Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      // Update chat history with the error message
      updateHistory(error.message, true);
    }
  }
    
 
  return (
    <>


   

    {shotPop &&<div className="container shown">
        <div className="chat-header">
            <div className="icon-text">
                <span className='bot-circle'><FaRobot className='bot' fill='#9e7cfb'/></span>
                <h2 className='bot-text'>Chatbot</h2>

            </div>

            <div onClick={() =>setShowPop(prev=> !prev)}className="arrow-downward">
                <MdOutlineArrowDownward fill='white'  size={25}/>
            </div>
        </div>

        <div className={`chat-body ${hasInputText ? 'chat-shrink' : ''}`} ref={bodyRef}>
            
            <div className="bot-message">
              <span className='bot-circle bot-body'><FaRobot className='bot' fill='white'/></span>
              <div className='bot-text bot-body-text'>Hey there!<br/> How can I help you today?</div>
            </div>

            {history.map((hist, i)=>{
              return <ChatMessage key={i} hist = {hist}/>
            })}

           
        </div>
 
        <div className="chat-footer">
            <ChatForm history={history} generateBotResponse={generateBotResponse} setHistory = {setHistory} onInputChange={setHasInputText}/>
            {hasInputText && <div className="keyboard-spacer"></div>}
        </div>
      </div>}

      <div onClick={()=>setShowPop(prev=>!prev)} className={shotPop === true ? 'toggle disp' :'toggle'}>
      <span className={shotPop === true ? "message openo": "message"}><IoCloseOutline size={40} color='white'/></span>
      <span className={shotPop === true ? 'closo close' :'close'}><FiMessageSquare size={40} color='white'/></span>
   </div>

  
      
    </>
  )
}

export default App
