import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import './styles/Navbar.css';
import logo from './images/logo.svg';
import { removeSessionToken } from '../utils/session';

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

export default function Navbar() {
  const history = useHistory();

  const isAdmin = () => window.localStorage.getItem('role') === 'admin';

  const logOut = () => {
    removeSessionToken();
    history.push('/');
  };

  return (
    <StyledNavbar className="Navbar">
      <a className="Navbar__brand" href="/vote">
        <img className="Navbar__brand-logo" src={logo} alt="logo" />
      </a>
      <ActionsWrapper>
        {isAdmin() && (
          <React.Fragment>
            <StyledLink to={'/admin/election'}>Crear Elección</StyledLink>
            <Separator>|</Separator>
          </React.Fragment>
        )}
        <StyledLink to={'#'} onClick={logOut}>
          Cerrar Sesión
        </StyledLink>
      </ActionsWrapper>
    </StyledNavbar>
  );
}
