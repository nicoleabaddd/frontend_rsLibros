import React, { useState } from 'react';

const RecommendationForm = ({ recommendation, onSave }) => {
  const [formData, setFormData] = useState({
    user: recommendation ? recommendation.user._id : '',
    book: recommendation ? recommendation.book._id : '',
    score: recommendation ? recommendation.score : '',
    description: recommendation ? recommendation.description : '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Book ID:</label>
        <input
          type="text"
          name="book"
          value={formData.book}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Score:</label>
        <input
          type="number"
          name="score"
          value={formData.score}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default RecommendationForm;

