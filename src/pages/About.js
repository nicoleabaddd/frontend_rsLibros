import React from 'react';

function About() {
  return (
    <div style={containerStyle}>
      <div style={aboutStyle}>
        <h2>Acerca de Nosotros</h2>
        <p>
        Bienvenido a nuestra plataforma de intercambio de libros.
        Somos un equipo apasionado por la lectura y dedicado a facilitar
        el acceso a libros para todos. Nuestra misión es conectar a lectores
        con una comunidad donde puedan intercambiar, descubrir y disfrutar
        de nuevos títulos.
        </p>
        <p>
        Fundada en [año], nuestra plataforma ha crecido hasta convertirse
        en un lugar donde los amantes de los libros pueden compartir sus
        lecturas favoritas, encontrar joyas literarias, y hacer nuevas
        amistades a través de su pasión compartida. Creemos en el poder
        de los libros para inspirar, educar y conectar personas de todos
        los ámbitos de la vida.
        </p>
        <p>
        Gracias por unirte a nosotros en esta aventura literaria.
        Si tienes alguna pregunta o necesitas más información, no
        dudes en ponerte en contacto con nosotros. ¡Estamos aquí
        para ayudarte a descubrir tu próximo gran libro!
        </p>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#ffffff',
};

const aboutStyle = {
  backgroundColor: '#CDCDCD',
  padding: '50px',
  borderRadius: '20px',
  maxWidth: '600px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export default About;
