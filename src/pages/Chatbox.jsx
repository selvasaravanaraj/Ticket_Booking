import React, { useState, useEffect } from 'react';
import './style.css';


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const onSendButton = async () => {
        if (input === '') {
            return;
        }

        const userMessage = { name: "User", message: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: JSON.stringify({ message: input }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            const botMessage = { name: "Sam", message: data.answer };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error:', error);
        }

        setInput('');
    };

    useEffect(() => {
        const inputField = document.querySelector('.chatbox__support input');
        const handleKeyUp = ({ key }) => {
            if (key === "Enter") {
                onSendButton();
            }
        };
        inputField.addEventListener('keyup', handleKeyUp);

        return () => {
            inputField.removeEventListener('keyup', handleKeyUp);
        };
    }, [input, messages]);

    const updateChatText = () => {
        return messages.slice().reverse().map((item, index) => (
            <div key={index} className={`messages__item ${item.name === 'Sam' ? 'messages__item--visitor' : 'messages__item--operator'}`}>
                {item.message}
            </div>
        ));
    };

    return (
             
        
        <div className="container">
            
            <div className="chatbox chatbox--active">
                <div className="chatbox__support">
                    <div className="chatbox__header">
                        <div className="chatbox__image--header">
                            <img src="https://media3.giphy.com/media/FAskxGppmEJdhBLn5k/giphy.gif" alt="image" width="50px" height="50px" />
                        </div>
                        <div className="chatbox__content--header">
                            <h4 className="chatbox__heading--header">AI CHATBOT</h4>
                            <p className="chatbox__description--header">Hi. I'm Grandma. How can I help you?</p>
                        </div>
                    </div>
                    <div className="chatbox__messages">
                        {updateChatText()}
                    </div>
                    <div className="chatbox__footer">
                        <input 
                            type="text" 
                            placeholder="Write a message..." 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                        />
                        <button className="chatbox__send--footer send__button" onClick={onSendButton}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
