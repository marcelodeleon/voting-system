import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import logo from './images/logo.svg';

const StyledNavbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const ActionsWrapper = styled.div`
  margin-right: 2rem;
`;

const Separator = styled.span`
  color: white;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const isAdmin = () => window.localStorage.getItem('role') === 'admin';

export default function Navbar() {
  return (
    <StyledNavbar className="Navbar">
      <a className="Navbar__brand" href="/vote">
        <img className="Navbar__brand-logo" src={logo} alt="logo" />
      </a>
      <ActionsWrapper>
        {!isAdmin() && (
          <React.Fragment>
            <StyledLink to={'/admin/election'}>Crear Elección</StyledLink>
            <Separator>|</Separator>
          </React.Fragment>
        )}
        <StyledLink to={'#'}>Cerrar Sesión</StyledLink>
      </ActionsWrapper>
    </StyledNavbar>
  );
}
