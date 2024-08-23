import React, { useState } from 'react';

// Recupera el token del localStorage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Decodifica el token para obtener el ID del usuario
const getUserIdFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id; // Asegúrate de que el payload contiene el campo 'id'
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

  // Función para buscar el ID del libro por su nombre
  const fetchBookIdByName = async (bookName) => {
    try {
      const response = await fetch(`http://localhost:5000/books?name=${bookName}`);
      const data = await response.json();
      return data._id; // Asume que el servidor devuelve un objeto con el ID del libro
    } catch (error) {
      console.error('Error fetching book ID:', error);
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el ID del libro usando su nombre
    const bookId = await fetchBookIdByName(book);
    if (!bookId) {
      console.error('Book not found');
      return;
    }

    const recommendation = {
      book: bookId,
      score,
      description,
      userId: getUserIdFromToken() // Obtener el ID del usuario desde el token
    };

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
