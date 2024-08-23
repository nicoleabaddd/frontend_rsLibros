import React, { useState, useEffect } from 'react';
import RecommendationForm from './RecommendationsList'; 
 // Asegúrate de ajustar la ruta según la estructura de carpetas

const fetchRecommendations = async () => {
  const response = await fetch('http://localhost:5000/recommendation/recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  const data = await response.json();
  return data;
};

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [formData, setFormData] = useState({ book: '', description: '', score: 1 });

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recommendationsData = await fetchRecommendations();
        setRecommendations(recommendationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };
  
    loadRecommendations();
  }, []);
  
  const handleEditClick = (rec) => {
    setSelectedRecommendation(rec);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedRecommendation(null);
  };

  const handleAddRecommendation = async (newRec) => {
    try {
      const response = await fetch('http://localhost:5000/recommendation/createRecommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRec),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create recommendation');
      }
  
      const savedRecommendation = await response.json();
      setRecommendations(prev => [
        ...prev,
        savedRecommendation,
      ]);
      setShowForm(false); // Cierra el formulario después de añadir
    } catch (error) {
      console.error('Error creating recommendation:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      if (selectedRecommendation) {
        response = await fetch(`http://localhost:5000/recommendation/updateRecommendation/${selectedRecommendation._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch('http://localhost:5000/recommendation/createRecommendation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
  
      if (!response.ok) {
        throw new Error('Failed to save recommendation');
      }
  
      const savedRecommendation = await response.json();
      if (selectedRecommendation) {
        setRecommendations(prev =>
          prev.map(rec => rec._id === savedRecommendation._id ? savedRecommendation : rec)
        );
      } else {
        setRecommendations(prev => [...prev, savedRecommendation]);
      }
      handleCloseForm(); // Cierra el formulario después de guardar
    } catch (error) {
      console.error('Error saving recommendation:', error);
    }
  };

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
  
      setRecommendations(prev => prev.filter(rec => rec._id !== id));
    } catch (error) {
      console.error('Error deleting recommendation:', error);
    }
  };

  if (loading) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2>Book Recommendations</h2>

      <button onClick={() => setShowForm(true)} style={styles.addButton}>Add New Recommendation</button>

      {showForm && (
        <RecommendationForm
          recommendation={selectedRecommendation}
          onClose={handleCloseForm}
          onSave={(updatedRec) => {
            if (selectedRecommendation) {
              setRecommendations(prev =>
                prev.map(rec => rec._id === updatedRec._id ? updatedRec : rec)
              );
            } else {
              handleAddRecommendation(updatedRec);
            }
            handleCloseForm();
          }}
        />
      )}

      <ul style={styles.list}>
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <li key={rec._id} style={styles.item}>
              <h3 style={styles.bookTitle}>{rec.book}</h3>
              <p style={styles.user}>Recommended by: {rec.user}</p>
              <p style={styles.score}>Score: {rec.score} / 5</p>
              <p style={styles.date}>Date: {new Date(rec.createdAt).toLocaleDateString()}</p>
              {rec.description && <p style={styles.description}>{rec.description}</p>}
              <button onClick={() => handleEditClick(rec)}>Edit</button>
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

const styles = {
  container: {
    padding: '20px',
  },
  addButton: {
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
  },
  bookTitle: {
    fontWeight: 'bold',
  },
  user: {
    fontStyle: 'italic',
  },
  score: {
    color: 'green',
  },
  date: {
    color: 'grey',
  },
  description: {
    marginTop: '10px',
  },
};

export default Recommendations;
