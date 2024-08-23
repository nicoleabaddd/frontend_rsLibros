import React, { useState } from 'react';

// Recupera el token del localStorage
const getToken = () => {
  const token = localStorage.getItem('authToken');
  console.log('Token retrieved:', token);
  return token;
};

// Decodifica el token para obtener el ID del usuario
const getUserIdFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded payload:', payload);
      return payload._id; // Ajusta el campo según el payload de tu token
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

function RecommendationForm() {
  const [book, setBook] = useState('');
  const [score, setScore] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const recommendation = { 
      book, 
      score, 
      description, 
      userId: getUserIdFromToken() // Incluye el userId en el cuerpo de la solicitud
    };
    console.log('Recomendación recibida:', recommendation);

    fetch('http://localhost:5000/recommendation/createRecommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}` // Incluye el token en el encabezado
      },
      body: JSON.stringify(recommendation)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book Name:</label>
        <input
          type="text"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Score:</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          min="1"
          max="5"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Submit Recommendation</button>
    </form>
  );
}

export default RecommendationForm;
