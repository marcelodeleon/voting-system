import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import ModalProposal from './ModalProposal';
import Navbar from '../Navbar';
import apiClient from '../../utils/api-client';
import '../styles/Election.css';

const ProposalsButton = styled.button`
  display: block;
  width: 20rem;
  margin: auto;
  color: teal;
`;

export default function Election() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [states, setStates] = useState('');
  const [age, setAge] = useState('');
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [isOpenModal, setIsOpenModal] = useState(false);
  // eslint-disable-next-line
  let [proposalsList, setProposals] = useState([]);

  // eslint-disable-next-line
  let proposalsObj = {};

  const loadProposalsObj = (data) => {
    const obj = {};
    for (let i = 0; i < data.length; i += 1) {
      obj[i] = data[i];
    }
    proposalsObj = obj;
  };

  const loadProposals = (data) => {
    data.forEach((item) => {
      if (
        proposalsList.filter((elem) => elem.title === item.title).length === 0
      ) {
        setProposals((proposalsList = proposalsList.concat(item)));
      }
    });
    loadProposalsObj(proposalsList);
  };

  const onSubmit = async () => {
    try {
      if (proposalsList.length === 0)
        return alert('No se puede crear una eleccion sin propuestas');
      await apiClient.post('createElections', {
        body: {
          electionData: {
            name,
            description,
            proposals: proposalsList,
            startAt,
            endAt,
            city,
            states,
            age,
          },
        },
      });
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const cancelModal = (event) => {
    event.preventDefault();
    setIsOpenModal(false);
  };

  return (
    <div>
      <Navbar />
      <h1 className="election-title">Nueva Eleccion</h1>
      <form className="election-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            name="name"
            ref={register({ required: true })}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">Campo requerido!</span>}
        </label>
        <label>
          Descripcion:
          <input
            type="text"
            value={description}
            name="description"
            ref={register({ required: true })}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <span className="error">Campo requerido!</span>
          )}
        </label>
        <label>
          Ciudad:
          <input
            type="text"
            value={city}
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Departamento:
          <input
            type="text"
            value={states}
            name="states"
            onChange={(e) => setStates(e.target.value)}
          />
        </label>
        <label>
          Edades:
          <input
            type="text"
            value={age}
            name="age"
            placeholder="Ejemplo: 18-55"
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label>
          Fecha y Hora de Inicio:
          <DatePicker
            selected={startAt}
            onChange={(date) => setStartAt(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="dd/MM/yyyy HH:mm"
            timeIntervals={15}
          />
        </label>
        <label>
          Fecha y Hora de Fin:
          <DatePicker
            selected={endAt}
            onChange={(date) => setEndAt(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="dd/MM/yyyy HH:mm"
            timeIntervals={15}
          />
        </label>
        {isOpenModal && (
          <ModalProposal
            closeModal={closeModal}
            cancelModal={cancelModal}
            sendProposals={loadProposals}
          />
        )}
        <ProposalsButton className={'form-component'} type="button" onClick={openModal}>
          Crear Propuestas
        </ProposalsButton>
        <input className={'form-component'} type="submit" value="Submit" />
      </form>
    </div>
  );
}
