// src/components/Messenger.js

import React, { useState, useEffect } from 'react';

// Simula una función para enviar mensajes
const sendMessage = (newMessage) => {
  // Aquí podrías hacer una llamada a la API para enviar el mensaje al servidor
  console.log('Message sent:', newMessage);
};

const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sender] = useState('John Doe'); // Usuario actual, se puede ajustar según tu lógica
  const [receiver] = useState('Jane Smith'); // Usuario receptor, se puede ajustar según tu lógica

  useEffect(() => {
    // Simular datos de mensajes para pruebas
    const simulatedMessages = [
      {
        _id: '1',
        sender: 'John Doe',
        receiver: 'Jane Smith',
        content: 'Hi, hay un libro de secretos del olimpo?',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        sender: 'Jane Smith',
        receiver: 'John Doe',
        content: 'Si, 434$ libro nuevo en uide biblioteca',
        createdAt: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setMessages(simulatedMessages);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === '') return; // No enviar mensaje vacío

    const messageToSend = {
      _id: (messages.length + 1).toString(), // Simula un ID único
      sender: sender,
      receiver: receiver,
      content: newMessage,
      createdAt: new Date().toISOString(),
    };

    // Actualizar el estado con el nuevo mensaje
    setMessages([...messages, messageToSend]);
    setNewMessage(''); // Limpiar el campo del mensaje

    // Llamada a la función para simular el envío
    sendMessage(messageToSend);
  };

  if (loading) {
    return <div style={styles.messageContainer}>Loading...</div>;
  }

  return (
    <div style={styles.messageContainer}>
      <h2>Messages</h2>
      <ul style={styles.messageList}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <li key={message._id} style={styles.messageItem}>
              <div style={styles.messageHeader}>
                <span style={styles.messageSender}>From: {message.sender}</span>
                <span style={styles.messageReceiver}>To: {message.receiver}</span>
              </div>
              <div style={styles.messageContent}>
                <p>{message.content}</p>
              </div>
              <div style={styles.messageFooter}>
                <span>{new Date(message.createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))
        ) : (
          <li style={styles.messageItem}>No messages found.</li>
        )}
      </ul>
      <form onSubmit={handleSendMessage} style={styles.form}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
};

// Estilos en línea
const styles = {
  messageContainer: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  messageList: {
    listStyleType: 'none',
    padding: '0',
    marginBottom: '20px',
  },
  messageItem: {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  messageSender: {
    color: '#333',
  },
  messageReceiver: {
    color: '#666',
  },
  messageContent: {
    marginBottom: '10px',
  },
  messageFooter: {
    textAlign: 'right',
    fontSize: '0.8em',
    color: '#888',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  textarea: {
    resize: 'none',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    minHeight: '100px',
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#686868',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Messenger;
