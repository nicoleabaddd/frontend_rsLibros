import React from 'react';


const headerStyles = {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem 0',
};

const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const h1Styles = {
    margin: '0',
    fontSize: '1.5rem',
};

const navStyles = {
    listStyle: 'none',
    margin: '0',
    padding: '0',
    display: 'flex',
};

const navItemStyles = {
    marginLeft: '1rem',
};

const linkStyles = {
    color: 'white',
    textDecoration: 'none',
};

const Header = () => {
    return (
        <header style={headerStyles}>
            <div style={containerStyles}>
                <h1 style={h1Styles}> Intercambio de Libros </h1>
                <nav>
                    <ul style={navStyles}>
                        <li style={navItemStyles}><a href="/Home" style={linkStyles}>Home</a></li>
                        <li style={navItemStyles}><a href="/About" style={linkStyles}>About</a></li>
                        <li style={navItemStyles}><a href="/Contact" style={linkStyles}>Contact</a></li>
                        <li style={navItemStyles}><a href="/Login" style={linkStyles}>Login</a></li>
                        <li style={navItemStyles}><a href="/Messager" style={linkStyles}>Messager</a></li>
                        <li style={navItemStyles}><a href="/Exchanges" style={linkStyles}>Exchanges</a></li>
                        <li style={navItemStyles}><a href="/Recommendations" style={linkStyles}>Recommendations</a></li>
                        <li style={navItemStyles}><a href="/Perfil" style={linkStyles}>Perfil</a></li>
                        <li style={navItemStyles}><a href="/BookCreate" style={linkStyles}>BookCreate</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
