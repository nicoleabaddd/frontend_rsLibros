import React, { useState } from 'react';

function RecommendationForm({ onSubmit }) {
  const [book, setBook] = useState('');
  const [score, setScore] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const recommendation = { book, score, description };
    onSubmit(recommendation); // Enviar solo los datos necesarios
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
}

export default RecommendationForm;

