import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import apiClient from '../../utils/api-client';
import Navbar from '../Navbar';

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
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const onSubmit = async () => {
    try {
      await apiClient.post('users', {
        body: { email, password, country, city, department, dateOfBirth },
      });
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <StyledUserRegistration>
        <h1>Registro de Usuario</h1>
        <StyledUserRegistrationForm onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              ref={register({ required: true })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">Campo requerido!</span>}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              ref={register({ required: true, minLength: 8 })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && errors.password.type === 'required' && (
              <span className="error">Campo requerido!</span>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <span className="error">
                La contraseña debe tener al menos 8 caracteres.
              </span>
            )}
          </label>
          <label>
            País:
            <input
              type="text"
              name="country"
              ref={register({ required: true })}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            {errors.country && <span className="error">Campo requerido!</span>}
          </label>
          <label>
            Departamento:
            <input
              type="text"
              name="department"
              ref={register({ required: true })}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            {errors.department && (
              <span className="error">Campo requerido!</span>
            )}
          </label>
          <label>
            Ciudad:
            <input
              type="text"
              name="city"
              ref={register({ required: true })}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <span className="error">Campo requerido!</span>}
          </label>
          <label>
            Fecha de Nacimiento:
            <DatePicker
              selected={dateOfBirth}
              name="dateOfBirth"
              onChange={(date) => setDateOfBirth(date)}
            />
          </label>
          <input type="submit" value="Crear Usuario" />
        </StyledUserRegistrationForm>
      </StyledUserRegistration>
    </React.Fragment>
  );
}
