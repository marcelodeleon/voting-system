import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import ModalProposal from './ModalProposal';
import apiClient from '../../utils/api-client';

export default function Election() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [isOpenModal, setIsOpenModal] = useState(false);
  let [proposalsList, setProposals] = useState([]);
  let proposalsObj = {};

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

  const loadProposalsObj = (data) => {
    const obj = {};
    for (let i = 0; i < data.length; i++) {
      obj[i] = data[i];
    }
    proposalsObj = obj;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
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
      <h1>Nueva Eleccion</h1>
      <a
        className="App-link"
        href="../.netlify/functions/hello"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Descripcion:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
        <input type="submit" value="Submit" />
      </form>
      <button onClick={openModal}>Crear Propuestas</button>
      {isOpenModal && (
        <ModalProposal
          closeModal={closeModal}
          cancelModal={cancelModal}
          sendProposals={loadProposals}
        />
      )}
    </div>
  );
}
