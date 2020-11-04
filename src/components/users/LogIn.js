import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
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
  flex-direction: colum;
  border: 1px solid teal;
  border-radius: 1rem;
  width: 40rem;
  padding: 3rem 2rem;
`;

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { token } = await apiClient.post('sessions', {
        body: {
          email,
          password,
        },
      });

      setSessionToken(token);
      history.push('/Vote');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <LogInForm onSubmit={handleSubmit}>
      <h1>Login</h1>
      <LogInFields>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Log In" />
      </LogInFields>
    </LogInForm>
  );
}
