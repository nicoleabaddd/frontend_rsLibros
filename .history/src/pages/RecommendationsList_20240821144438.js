import React from 'react';

const RecommendationList = ({ recommendations, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Recommendations List</h2>
      <ul>
        {recommendations.map((reco) => (
          <li key={reco._id}>
            <p>User: {reco.user.username}</p>
            <p>Book: {reco.book.title}</p>
            <p>Score: {reco.score}</p>
            <p>Description: {reco.description}</p>
            <button onClick={() => onEdit(reco)}>Edit</button>
            <button onClick={() => onDelete(reco._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationList;
