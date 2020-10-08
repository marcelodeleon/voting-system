import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

export default function Election() {
  const [name, setName] = useState('');
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());

  const handleSubmit = (evt) => {
    evt.preventDefault();
    /* eslint-disable-next-line */
    console.log('Submitting');
  };
  return (
    <div>
      <h1>Nueva Eleccion</h1>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
    </div>
  );
}
