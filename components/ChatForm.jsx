import React, { useRef } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

const ChatForm = ({history, setHistory, generateBotResponse}) => {

  const inputRef = useRef(null)

  const handleSubmit = (e) =>{
    e.preventDefault();

    const userMessage = inputRef.current.value.trim();

    if(userMessage.length > 0){
        setHistory(prev=>[...prev, {role:'user', text: userMessage}])

        setTimeout(()=>{
        setHistory(prev=>[...prev, {role:'model', text:"Thinking..."}])
        generateBotResponse([...history, { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }]);

    },600)
    }

    

    

    inputRef.current.value = ""




  }

  return (
    <form className='footer-form' action="">
                <input ref={inputRef} type="text" className='form-input' required placeholder='Message...'  />
                <button onClick={handleSubmit} className='arrowUp'><FaArrowUp fill='white' size={15}/></button>

    </form>
  )
}

export default ChatForm
