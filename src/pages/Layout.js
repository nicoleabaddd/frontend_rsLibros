import React from 'react';
import { Outlet} from 'react-router-dom';
import Header from '../components/Header';  // Ruta correcta
import Footer from '../components/Footer';  // Ruta correcta

const Layout = () => {
  return (
    <>
      <Header />
      <nav>
        <ul>

        </ul>
      </nav>
      <Outlet />
      
      <Footer />
    </>
  );
};

export default Layout;
