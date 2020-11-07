import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const WelcomeWrapper = styled.div`
  text-align: center;
`;

export default function Welcome() {
  return (
    <WelcomeWrapper>
      <Navbar />
      <h1>Bienvenido al Sistema de Votación!</h1>
      <p>
        Recibirá un email con las votaciones a las que pueda participar en
        cuanto estén listas.
      </p>
      <p>
        Los links de votación son de un único uso y deberá haber iniciado sesión
        en la aplicación.
      </p>
    </WelcomeWrapper>
  );
}
