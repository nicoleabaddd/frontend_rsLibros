import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Utility functions
const getToken = () => localStorage.getItem('authToken');

const getUserIdFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload._id;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

const fetchUserProfile = async (userId) => {
  if (!userId) return null;
  try {
    const response = await fetch(`http://localhost:5000/user/getUsers/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error en la solicitud: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    return null;
  }
};

// React component
const Exchange = () => {
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnCondition, setReturnCondition] = useState(''); // Agregar campo opcional
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = getUserIdFromToken();
        if (id) {
          setUserId(id);
          const userProfile = await fetchUserProfile(id);
          if (userProfile) {
            setUsername(userProfile.username);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const validateForm = () => {
    return title.trim() && owner.trim() && loanDate.trim() && returnDate.trim();
  };

  const requestBook = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.error('Todos los campos son requeridos');
      return;
    }

    // Datos a enviar al backend
    const exchangeData = {
      owner,
      book: title, // Suponiendo que book es el título del libro, ajusta si es diferente
      loanDate,
      returnDate,
      returnCondition,
      title,
      requester: userId // Enviar el ID del usuario
    };

    // Imprimir los datos que se enviarán
    console.log('Datos a enviar al backend:', exchangeData);

    try {
      const response = await fetch('http://localhost:5000/exchange/createExchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(exchangeData),
      });

      if (response.ok) {
        // Resetear campos después del envío exitoso
        setTitle('');
        setOwner('');
        setLoanDate('');
        setReturnDate('');
        setReturnCondition('');
        // Redirigir a una página de confirmación o lista de intercambios
        navigate('/exchanges');
      } else {
        const errorData = await response.json();
        console.error('Error requesting book:', errorData.message);
      }
    } catch (error) {
      console.error('Error requesting book:', error);
    }
  };

  return (
    <div>
      <form onSubmit={requestBook} style={formStyle}>
        <h2>Request a Book</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          style={inputStyle}
        />
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Owner"
          style={inputStyle}
        />
        <label style={labelStyle}>Loan Date</label>
        <input
          type="date"
          value={loanDate}
          onChange={(e) => setLoanDate(e.target.value)}
          style={inputStyle}
        />
        <label style={labelStyle}>Return Date</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          style={inputStyle}
        />
        <label style={labelStyle}>Return Condition (Optional)</label>
        <input
          type="text"
          value={returnCondition}
          onChange={(e) => setReturnCondition(e.target.value)}
          placeholder="Condition of the book upon return"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Request Book</button>
      </form>
    </div>
  );
};

// Styles
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  margin: '0 auto'
};

const inputStyle = {
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer'
};

const labelStyle = {
  marginTop: '10px'
};

export default Exchange;
