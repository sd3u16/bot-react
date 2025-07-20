import React, { useRef, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

const ChatForm = ({ history, setHistory, generateBotResponse, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange(value.trim().length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userMessage = inputValue.trim();

    if (userMessage.length > 0) {
      setHistory((prev) => [...prev, { role: 'user', text: userMessage }]);

      setTimeout(() => {
        setHistory((prev) => [...prev, { role: 'model', text: "Thinking..." }]);
        generateBotResponse([
          ...history,
          { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }
        ]);
      }, 600);
    }

    // Reset input and state
    setInputValue("");
    onInputChange(false);
  };

  return (
    <>
      <form className="footer-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="form-input"
          required
          placeholder="Message..."
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className="arrowUp">
          <FaArrowUp fill="white" size={15} />
        </button>
      </form>

      <div className="cont-input"></div>
    </>
  );
};

export default ChatForm;
