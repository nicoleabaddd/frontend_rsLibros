import React, { useState } from 'react';

// Obtener el token del localStorage
const getToken = () => {
  const token = localStorage.getItem('authToken');
  console.log('Token retrieved:', token);
  return token;
};

// Obtener el ID del usuario desde el token
const getUserIdFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded payload:', payload);
      return payload._id; 
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

const RecommendationForm = () => {
  const [book, setBook] = useState('');
  const [score, setScore] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getUserIdFromToken(); // Obtiene el ID del usuario

    if (!userId) {
      console.error('No user ID found');
      return;
    }

    const recommendation = { 
      book, 
      score, 
      description, 
      userId 
    };

    try {
      const response = await fetch('http://localhost:5000/recommendation/createRecommendation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`, // Incluye el token en el encabezado
        },
        body: JSON.stringify(recommendation),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Server response error:', errorMessage);
        throw new Error(`Error en la solicitud: ${errorMessage}`);
      }

      const data = await response.json();
      console.log('Recommendation created:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book ID:</label>
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
};

export default RecommendationForm;
