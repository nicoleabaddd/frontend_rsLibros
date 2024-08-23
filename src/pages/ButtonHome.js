import React from 'react';
import { Link } from 'react-router-dom';

const ButtonHome = () => {
    return (
      <main className="m-5">
        <div className="topboton">
          <div className="centrar-en-medio"></div>
          <div className="rectangulo-botones">
            <div className="rectangulo-amarillo">Categorías</div>
            <Link to="/misterio">
              <button className="button1">Misterio</button>
              <span className="backdrop1"></span>
            </Link>
            <Link to="/fantasia">
              <button className="button2">Fantasía</button>
              <span className="backdrop2"></span>
            </Link>
            <Link to="/romance">
              <button className="button3">Romance</button>
              <span className="backdrop3"></span>
            </Link>
          </div>
        </div>
      </main>
    );
  };
  
  export default ButtonHome;