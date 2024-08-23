import React, { useState } from 'react';

function ContactUs() {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Manejador para los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div style={containerStyle}>
      <h2>Contáctanos</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="subject">Asunto:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            style={textareaStyle}
          ></textarea>
        </div>
        <button type="submit" style={buttonStyle}>Enviar</button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: '#f4f4f4',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '2px solid #000000',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #CDCDCD',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#646464',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ContactUs;
