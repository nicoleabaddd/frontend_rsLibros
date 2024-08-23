import React, { useState, useEffect } from 'react';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({});

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/book/getAllbook', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Error al obtener los libros');
      }

      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleButtonClick = (data) => {
    console.log(data); // Verifica aquí la estructura de `data`, en particular, cómo está el objeto `owner`
    setTooltipData(data);
    setShowTooltip(true);
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    setTooltipData({});
  };

  const bookContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columnas
    gap: '20px',
    margin: '20px',
  };

  const bookStyle = {
    textAlign: 'center',
  };

  const imageContainerStyle = {
    border: '2px solid black',
    padding: '10px',
    marginBottom: '10px',
  };

  const placeholderImageStyle = {
    width: '100%',
    height: '200px', // Ajusta la altura según sea necesario
    backgroundColor: '#f0f0f0', // Color de fondo para el espacio reservado
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
  };

  const placeholderTextStyle = {
    color: '#888',
    fontSize: '18px',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'cover',
  };

  const tooltipStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    maxWidth: '600px',
    overflowY: 'auto',
  };

  return (
    <section>
      <div style={bookContainerStyle}>
        {books.map((book, index) => (
          <div key={index} style={bookStyle}>
            <div style={imageContainerStyle}>
              {book.imageUrl ? (
                <img src={book.imageUrl} alt={book.title} style={imageStyle} />
              ) : (
                <div style={placeholderImageStyle}>
                  <span style={placeholderTextStyle}>Imagen</span>
                </div>
              )}
            </div>
            <h4>{book.title}</h4>
            <button className="boton1" onClick={() => handleButtonClick(book)}>
              + Info
            </button>
          </div>
        ))}
      </div>
  
      {showTooltip && (
        <div className="tooltip" style={tooltipStyle}>
          <h4>{tooltipData.title}</h4>
          <p><strong>Autor:</strong> {tooltipData.author}</p>
          <p><strong>ISBN:</strong> {tooltipData.isbn}</p>
          <p><strong>Descripción:</strong> {tooltipData.description}</p>
          <p><strong>Disponible:</strong> {tooltipData.available ? 'Sí' : 'No'}</p>
          <p><strong>Estado:</strong> {tooltipData.status}</p>
          <p><strong>Categoría:</strong> {tooltipData.category}</p>
          <p><strong>Fecha de Publicación:</strong> {tooltipData.publicationDate}</p>
          <p><strong>Dueño:</strong> {`${tooltipData.owner?.profile?.firstName || ''} ${tooltipData.owner?.profile?.lastName || ''}`}</p>
          <button onClick={handleCloseTooltip}>Cerrar</button>
        </div>
      )}
    </section>
  );
};

export default Home;
