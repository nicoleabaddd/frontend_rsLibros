import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    profile: {
      firstName: '',
      lastName: '',
      bio: '',
      location: ''
    },
    correo: '',
    contrasenia: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [isRegistering, setIsRegistering] = useState(true); // Para alternar entre registro y login
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
        // Registro de usuario
        try {
            const response = await fetch('http://localhost:5000/user/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create user');
            }

            const data = await response.json();
            setMessage('User registered successfully! Redirecting to login...');
            setError('');
            console.log('User created successfully:', data);
            setTimeout(() => {
                setIsRegistering(false);
            }, 1500);
        } catch (error) {
            setError(error.message);
            setMessage('');
            console.error('Error:', error.message);
        }
    } else {
        // Inicio de sesión
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: formData.correo, // Asegúrate de que el nombre del campo sea correcto
                    contrasenia: formData.contrasenia, // Asegúrate de que el nombre del campo sea correcto
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login Response Data:', data);

                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    console.log('Token saved in localStorage:', localStorage.getItem('authToken'));
                    setIsLoggedIn(true);
                    alert('Login successful!');
                    navigate('/');
                } else {
                    alert('Login failed: Token not received');
                }
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred!');
        }
    }
};

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    alert('Sesión cerrada exitosamente');
    navigate('/login');
  };

  const formStyle = {
    maxWidth: '400px', // Reducido el ancho máximo
    margin: '0 auto',
    padding: '20px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const toggleButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>
        {message && <div style={{ ...messageStyle, backgroundColor: '#d4edda', color: '#155724' }}>{message}</div>}
        {error && <div style={{ ...messageStyle, backgroundColor: '#f8d7da', color: '#721c24' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {isRegistering ? (
            <>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="contrasenia"
                  value={formData.contrasenia}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.profile.firstName}
                  onChange={handleProfileChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.profile.lastName}
                  onChange={handleProfileChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Bio:</label>
                <textarea
                  name="bio"
                  value={formData.profile.bio}
                  onChange={handleProfileChange}
                  style={{ ...inputStyle, height: '60px' }}
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.profile.location}
                  onChange={handleProfileChange}
                  style={inputStyle}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="contrasenia"
                  value={formData.contrasenia}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
            </>
          )}
          <button type="submit" style={buttonStyle}>
            {isRegistering ? 'Register' : 'Login'}
          </button>
          {!isRegistering && isLoggedIn && (
            <button type="button" onClick={handleLogout} style={buttonStyle}>
              Cerrar Sesión
            </button>
          )}
        </form>
        <button onClick={() => setIsRegistering(!isRegistering)} style={toggleButtonStyle}>
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;

