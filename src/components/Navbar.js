import React from 'react';
import './styles/Navbar.css';
import logo from '../components/images/logo.svg';
import '../components/styles/Navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <div className="Navbar">
        <div className="container-fluid">
          <a className="Navbar__brand" href="/vote">
            <img className="Navbar__brand-logo" src={logo} alt="logo" />
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
