import React, { useState, useEffect } from 'react';

// Frontend para gestionar libros
const Home = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({});
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    description: '',
    owner: '', // Nuevo campo para el dueño del libro
    available: 'Sí',
    image: null,
    status: 'Nuevo',
    category: '',
    publicationDate: '',
  });

  useEffect(() => {
    fetchBooks();
    fetchUsers(); // Obtener la lista de usuarios cuando se monta el componente
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/book/getBooks', { // Asegúrate de que esta ruta es correcta
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Error al obtener los libros');
      }

      const books = await response.json();
      setBooks(books);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }

      const users = await response.json();
      setUsers(users);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const createBook = async (bookData) => {
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('isbn', bookData.isbn);
    formData.append('description', bookData.description);
    formData.append('owner', bookData.owner); // Añadir el dueño del libro al FormData
    formData.append('available', bookData.available);
    formData.append('status', bookData.status);
    formData.append('category', bookData.category);
    formData.append('publicationDate', bookData.publicationDate);
    if (bookData.image) {
      formData.append('image', bookData.image);
    }

    try {
      const response = await fetch('http://localhost:5000/book/createBook', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en la creación del libro');
      }

      const result = await response.json();
      console.log('Libro creado:', result);
      fetchBooks(); // Actualizar la lista de libros
    } catch (error) {
      console.error('Error al añadir el libro:', error);
    }
  };

  const handleButtonClick = (data) => {
    setTooltipData(data);
    setShowTooltip(true);
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    setTooltipData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBook((prevBook) => ({
        ...prevBook,
        image: file,
      }));
    }
  };

  const handleAddBook = async () => {
    await createBook(newBook);
    setNewBook({
      title: '',
      author: '',
      isbn: '',
      description: '',
      owner: '', // Restablecer el campo dueño
      available: 'Sí',
      image: null,
      status: 'Nuevo',
      category: '',
      publicationDate: '',
    });
  };

  return (
    <section>
      <div style={bookContainerStyle}>
        {books.map((book, index) => (
          <div key={index} style={bookStyle}>
            <img className="imagen5" src={book.imageUrl} alt="Portada" style={imageStyle} />
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
          <p><strong>Disponible:</strong> {tooltipData.available}</p>
          <p><strong>Estado:</strong> {tooltipData.status}</p>
          <p><strong>Categoría:</strong> {tooltipData.category}</p>
          <p><strong>Fecha de Publicación:</strong> {tooltipData.publicationDate}</p>
          <button onClick={handleCloseTooltip}>Cerrar</button>
        </div>
      )}

      <div style={formStyle}>
        <h3>Añadir Nuevo Libro</h3>
        <input 
          type="text" 
          name="title" 
          placeholder="Título" 
          value={newBook.title} 
          onChange={handleInputChange} 
          style={inputStyle}
        />
        <input 
          type="text" 
          name="author" 
          placeholder="Autor" 
          value={newBook.author} 
          onChange={handleInputChange} 
          style={inputStyle}
        />
        <input 
          type="text" 
          name="isbn" 
          placeholder="ISBN" 
          value={newBook.isbn} 
          onChange={handleInputChange} 
          style={inputStyle}
        />
        <textarea 
          name="description" 
          placeholder="Descripción" 
          value={newBook.description} 
          onChange={handleInputChange} 
          style={inputStyle}
        />
        <select
          name="owner"
          value={newBook.owner}
          onChange={handleInputChange}
          style={inputStyle}
        >
          <option value="">Selecciona un dueño</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.profile.firstName} {user.profile.lastName}
            </option>
          ))}
        </select>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={inputStyle}
        />
        <input 
          type="text" 
          name="status" 
          placeholder="Estado (Nuevo/Usado)" 
          value={newBook.status} 
          onChange={handleInputChange} 
          style={inputStyle}
        />
        <input 
          type="text" 
          name="category" 
          placeholder="Categoría" 
          value={newBook.category} 
          onChange={handleInputChange} 
          style={inputStyle}
        />
        <input 
          type="date" 
          name="publicationDate" 
          placeholder="Fecha de Publicación" 
          value={newBook.publicationDate} 
          onChange={handleInputChange} 
          style={inputStyle}
        />
        <button onClick={handleAddBook} style={buttonStyle}>Añadir Libro</button>
      </div>
    </section>
  );
};

// Estilos para los componentes
const bookContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  margin: '20px',
};

const bookStyle = {
  width: '150px',
  margin: '10px 20px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  textAlign: 'center',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
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

const formStyle = {
  margin: '20px auto',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
};

const inputStyle = {
  marginBottom: '10px',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#28a745',
  color: '#fff',
  cursor: 'pointer',
};

export default Home;
