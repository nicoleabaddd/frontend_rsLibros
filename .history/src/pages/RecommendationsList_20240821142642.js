import React from 'react';

const styles = {
  container: {
    padding: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
  },
};

const RecommendationsList = ({ recommendations, onEdit, onDelete }) => {

  const handleDeleteRecommendation = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/recommendation/deleteRecommendation/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete recommendation');
      }

      onDelete(id);
    } catch (error) {
      console.error('Error deleting recommendation:', error);
    }
  };

  return (
    <div style={styles.container}>
      <ul style={styles.list}>
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <li key={rec._id} style={styles.item}>
              <h3>{rec.book}</h3>
              <p>Recommended by: {rec.user}</p>
              <p>Score: {rec.score} / 5</p>
              <p>Date: {new Date(rec.createdAt).toLocaleDateString()}</p>
              {rec.description && <p>{rec.description}</p>}
              <button onClick={() => onEdit(rec)}>Edit</button>
              <button onClick={() => handleDeleteRecommendation(rec._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No recommendations available.</li>
        )}
      </ul>
    </div>
  );
};

export default RecommendationsList;