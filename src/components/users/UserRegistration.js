import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import apiClient from '../../utils/api-client';

const StyledUserRegistration = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledUserRegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function UserRegistration() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    await apiClient.post('users', {
      body: { email, country, city, department, dateOfBirth },
    });
  };

  return (
    <StyledUserRegistration>
      <h1>Registro de Usuario</h1>
      <StyledUserRegistrationForm onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          País:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Departamento:
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </label>
        <label>
          Ciudad:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Fecha de Nacimiento:
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
          />
        </label>
        <input type="submit" value="Crear Usuario" />
      </StyledUserRegistrationForm>
    </StyledUserRegistration>
  );
}
