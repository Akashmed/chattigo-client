import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000"); // Make sure this matches the server's address

const Home = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
  
    useEffect(() => {
      // Listen for messages from the server
      socket.on('message', (data) => {
        setChat((prevChat) => [...prevChat, data]);
      });
  
      return () => socket.off('message');
    }, []);
  
    const sendMessage = () => {
      socket.emit('message', message); // Send message to server
      setMessage(''); // Clear input after sending
    };
  
    return (
      <div>
        <h2>Chattigo</h2>
        <div>
          {chat.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  }

export default Home;