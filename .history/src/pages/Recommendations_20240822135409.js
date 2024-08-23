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

// Obtiene el ID del libro por su nombre
// Obtiene el ID del libro por su nombre mediante POST
const getBookIdByName = async (title) => {
  try {
    const response = await fetch('http://localhost:5000/book/getBookByName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}` // Incluye el token en el encabezado si es necesario
      },
      body: JSON.stringify({ title }) // Envia el nombre del libro en el cuerpo de la solicitud
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Server response error:', errorMessage);
      throw new Error('Error fetching book ID');
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error fetching book ID:', error);
    return null;
  }
};



const RecommendationForm = () => {
  const [book, setBook] = useState('');
  const [score, setScore] = useState(1);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getUserIdFromToken(); // Obtiene el ID del usuario

    if (!userId) {
      setError('No user ID found');
      return;
    }

    const bookId = await getBookIdByName(book);
    if (!bookId) {
      setError('Invalid book name');
      return;
    }

    const recommendation = { 
      book: bookId, 
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
      setError(null); // Limpia el error si la recomendación se creó exitosamente
    } catch (error) {
      console.error('Error:', error);
      setError('Error creating recommendation');
    }
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
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default RecommendationForm;