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
      history.push('/');
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
        <SubmitInput type="submit" value="Log In" />
      </LogInFields>
    </LogInForm>
  );
}
