import React, { useEffect, useState } from 'react';

// Obtener el token del localStorage
const getToken = () => {
  const token = localStorage.getItem('authToken');
  console.log('Token retrieved:', token);
  return token;
};

// Obtener el ID del usuario desde el token
const getUserIdFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded payload:', payload);
      return payload._id; 
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

// Obtener el perfil del usuario desde el servidor
const fetchUserProfile = async (userId) => {
  if (!userId) {
    console.error('No user ID provided');
    return null;
  }

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
      console.error('Server response error:', errorMessage);
      throw new Error(`Error en la solicitud: ${errorMessage}`);
    }

    const dataJson = await response.json();
    return dataJson;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    return null;
  }
};

const Perfil = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = getUserIdFromToken();
      const profile = await fetchUserProfile(userId);
      setUserProfile(profile);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  if (!userProfile) {
    return <div>No se pudo cargar el perfil del usuario.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <img
          src={userProfile.profile?.avatar || 'https://via.placeholder.com/150'}
          alt="Avatar"
          style={styles.avatar}
        />
        <h2 style={styles.username}>{userProfile.username}</h2>
        <p style={styles.name}>
          {userProfile.profile?.firstName} {userProfile.profile?.lastName}
        </p>
        <p style={styles.bio}>{userProfile.profile?.bio}</p>
        <p style={styles.location}>{userProfile.profile?.location}</p>
        <p style={styles.createdAt}>
          Miembro desde: {new Date(userProfile.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  },
  profileCard: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
    width: '300px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '15px',
  },
  username: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  name: {
    fontSize: '18px',
    margin: '5px 0',
  },
  bio: {
    fontSize: '16px',
    color: '#666',
    margin: '10px 0',
  },
  location: {
    fontSize: '14px',
    color: '#888',
    margin: '10px 0',
  },
  createdAt: {
    fontSize: '14px',
    color: '#aaa',
    marginTop: '20px',
  },
};

export default Perfil;
