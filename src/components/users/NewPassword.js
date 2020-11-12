import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import apiClient from '../../utils/api-client';

import queryParams from 'query-params';

const ForgotPasswordForm = styled.form`
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
  width: 30rem;
  background: teal;
  color: white;
  border: 1.5px solid #0e4f1f;
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const inputStyle = {
  width: '30rem',
};

export default function NewPassword() {
  const { register, handleSubmit, errors } = useForm();
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      const query = queryParams.decode(this.props.location.search.substring(1));
      const { userId } = query;
      await apiClient.post('confirmPassword', {
        body: {
          userId,
          password,
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ForgotPasswordForm onSubmit={handleSubmit(onSubmit)}>
      <h1>Reset Password</h1>
      <LogInFields>
        <label>
          New Password:
          <input
            style={inputStyle}
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
        <SubmitInput type="submit" value="Set New Password" />
      </LogInFields>
    </ForgotPasswordForm>
  );
}
