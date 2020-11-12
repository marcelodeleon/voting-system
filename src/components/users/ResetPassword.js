import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import apiClient from '../../utils/api-client';

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

export default function ResetPassword() {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState('');
  const history = useHistory();

  const onSubmit = async () => {
    try {
      await apiClient.post('resetPassword', {
        body: {
          email,
        },
      });

      alert(
        'Se ha enviado un mail a su casilla de correo para reiniciar su contraseña.',
      );
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ForgotPasswordForm onSubmit={handleSubmit(onSubmit)}>
      <h1>Reset Password</h1>
      <LogInFields>
        <label>
          Email:
          <input
            style={inputStyle}
            type="email"
            name="email"
            ref={register({ required: true })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">Campo requerido!</span>}
        </label>
        <SubmitInput type="submit" value="Reset Password" />
      </LogInFields>
    </ForgotPasswordForm>
  );
}
