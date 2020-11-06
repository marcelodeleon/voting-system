import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import apiClient from '../../utils/api-client';
import { setSessionToken } from '../../utils/session';

const LogInForm = styled.form`
  font-size: 1.5em;
  text-align: center;
  color: teal;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogInFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid teal;
  border-radius: 1rem;
  padding: 3rem 2rem;
`;

const SubmitInput = styled.input`
  height: 2.5rem;
  background: teal;
  color: white;
  font: inherit;
  border: 1.5px solid #0e4f1f;
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

export default function LogIn() {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmit = async () => {
    try {
      const { token } = await apiClient.post('sessions', {
        body: {
          email,
          password,
        },
      });

      setSessionToken(token);
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <LogInForm onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <LogInFields>
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
            value={password}
            name="password"
            ref={register({ required: true, minLength: 8 })}
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
        <SubmitInput type="submit" value="Log In" />
        <Link to={'/users/registration'}>
          ¿No tienes cuenta? Click aquí para registrar un usuario
        </Link>
      </LogInFields>
    </LogInForm>
  );
}
