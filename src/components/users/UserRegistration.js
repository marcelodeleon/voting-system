import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import apiClient from '../../utils/api-client';
import Navbar from '../Navbar';

const StyledUserRegistration = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: teal;
`;

const StyledUserRegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid teal;
  border-radius: 1rem;
  width: 25rem;
`;

const HelpText = styled.span`
  font-size: 0.7rem;
  font-weight: normal;
`;

const RegistrationInput = styled.input`
  display: block;
  width: 20rem;
  margin: auto;
  color: teal;
`;

const CreateButton = styled.input`
  margin-top: 1rem !important;
  background: teal;
  color: white !important;
  font: inherit;
  border: 1.5px solid #0e4f1f;
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

export default function UserRegistration() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const validateDateOfBirth = (aDate) => {
    const dateOfBirthRe = new RegExp(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    );

    return dateOfBirthRe.test(aDate);
  };

  const onSubmit = async () => {
    const dateParts = dateOfBirth.split('/');

    // month is 0-based, that's why we need dataParts[1] - 1
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    try {
      await apiClient.post('users', {
        body: {
          email,
          password,
          country,
          city,
          department,
          dateOfBirth: new Date(dateObject),
        },
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
            <RegistrationInput
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
            <RegistrationInput
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
            <RegistrationInput
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
            <RegistrationInput
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
            <RegistrationInput
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
            <RegistrationInput
              type="text"
              name="dateOfBirth"
              ref={register({ required: true, validate: validateDateOfBirth })}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <HelpText>Ingresar fecha en formato dd/mm/yyyy</HelpText>
            {errors.dateOfBirth && errors.dateOfBirth.type === 'required' && (
              <span className="error">Campo requerido!</span>
            )}
            {errors.dateOfBirth && errors.dateOfBirth.type === 'validate' && (
              <span className="error">Formato incorrecto.</span>
            )}
          </label>
          <CreateButton type="submit" value="Crear Usuario" />
        </StyledUserRegistrationForm>
      </StyledUserRegistration>
    </React.Fragment>
  );
}
