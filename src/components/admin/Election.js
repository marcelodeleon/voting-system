import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import ModalProposal from './ModalProposal';
import apiClient from '../../utils/api-client';
import '../styles/Election.css';

export default function Election() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
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
      await apiClient.post('createElections', {
        body: {
          electionData: {
            name,
            description,
            proposals: proposalsList,
            startAt,
            endAt,
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
          Fecha Inicio:
          <DatePicker
            selected={startAt}
            onChange={(date) => setStartAt(date)}
          />
        </label>
        <label>
          Fecha Fin:
          <DatePicker selected={endAt} onChange={(date) => setEndAt(date)} />
        </label>
        {isOpenModal && (
          <ModalProposal
            closeModal={closeModal}
            cancelModal={cancelModal}
            sendProposals={loadProposals}
          />
        )}
        <button className={'form-component'} onClick={openModal}>
          Crear Propuestas
        </button>
        <input className={'form-component'} type="submit" value="Submit" />
      </form>
    </div>
  );
}
