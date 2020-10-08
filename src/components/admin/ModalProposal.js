import React from 'react';
import ReactDOM from 'react-dom';

class ModalProposal extends React.Component {
  constructor() {
    super();
    this.state = {
      proposals: [
        {
          title: '',
          options: [],
        },
      ],
    };
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-container">
        <div className="modal">
          <h1>Creación de Propuestas</h1>
          <form className="my-form">
            <div>
              <label>Ingresa la propuesta a votar </label>
            </div>
            <div>
              <input type="text" id="title"></input>
            </div>
            <div>
              <label>
                Ingresa una opción para votar <br />y presiona OK{' '}
              </label>
            </div>
            <div>
              <input type="text"></input>
            </div>
            <button>OK</button>
            <button type="submit">Listo</button>
            <button>Cancelar</button>
          </form>
        </div>
      </div>,
      document.getElementById('modal-root'),
    );
  }
}
export default ModalProposal;
