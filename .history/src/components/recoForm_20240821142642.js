import React, { useState } from 'react';

const RecommendationForm = ({ recommendation, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    book: recommendation?.book || '',
    description: recommendation?.description || '',
    score: recommendation?.score || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Book:
        <input
          type="text"
          name="book"
          value={formData.book}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Score:
        <input
          type="number"
          name="score"
          min="1"
          max="5"
          value={formData.score}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default RecommendationForm;
