import React, { useState } from 'react';

function RecommendationForm() {
  const [book, setBook] = useState('');
  const [score, setScore] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const recommendation = { book, score, description };
    console.log('Recomendación recibida:', recommendation);
    // Aquí puedes manejar el objeto de recomendación como desees
  };

  fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Reemplaza YOUR_ACCESS_TOKEN con el token real
    },
    body: JSON.stringify({
      // tu cuerpo de solicitud aquí
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

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
}

export default RecommendationForm;