import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/ModalProposal.css';

class ModalProposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      optionInput: '',
      options: [],
      proposals: [],
    };
  }

  handleNewProposal = (event) => {
    event.preventDefault();
    var allOptions = [];
    this.state.optionInput.split('/').forEach((option) => {
      let obj = {};
      obj[option] = 0;
      if (
        allOptions.filter((item) => item.hasOwnProperty(option)).length === 0
      ) {
        allOptions = [...allOptions, obj];
      }
    });
    if (
      this.state.proposals.filter((item) => item['title'] === this.state.title)
        .length === 0 &&
      this.state.title !== '' &&
      this.state.optionInput !== ''
    ) {
      this.setState({
        proposals: this.state.proposals.concat({
          title: this.state.title,
          options: allOptions,
        }),

        title: '',
        options: [],
      });
    }

    document.getElementById('myProposal').value = '';
    document.getElementById('option').value = '';
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.sendProposals(this.state.proposals);
    this.props.closeModal();
  };

  handleTitleChange = (event) => {
    event.preventDefault();
    this.setState({ title: event.target.value });
  };
  handleOptionChange = (event) => {
    event.preventDefault();
    this.setState({ optionInput: event.target.value });
  };

  handleAddOptions = (event) => {
    event.preventDefault();
    let myOptions = this.state.optionInput.split('/');
    this.setState({
      options: [...this.state.options, myOptions],
    });
  };

  render() {
    return ReactDOM.createPortal(
      <div className="modal-container">
        <div className="modal">
          <h1>Creación de Propuestas</h1>
          <form className="my-form">
            <div>
              <label>Paso 1) Ingresa la propuesta a votar </label>
            </div>
            <div>
              <input
                type="text"
                name="myProposal"
                placeholder="Ejemplo: ¿Te gusta cantar?"
                id="myProposal"
                onChange={this.handleTitleChange}
              ></input>
            </div>
            <div>
              <label>
                Paso 2) Ingresa las opciones a votar separadas por /{' '}
              </label>
            </div>
            <div>
              <input
                type="text"
                name="option"
                placeholder="Ejemplo: Si/No"
                id="option"
                onChange={this.handleOptionChange}
              ></input>
            </div>
            <div>
              <label>Para finalizar, presiona Agregar</label>
            </div>
            <button onClick={this.handleNewProposal}>Agregar</button>
            <div>
              <label>
                ¡Puedes repetir los pasos (1 y luego 2) para tener muchas
                propuestas!
                <br />
                Si ya terminaste, guarda todo presionando Terminar.
              </label>
            </div>
            <div>
              <button onClick={this.handleSubmit}>Terminar</button>
              <button onClick={this.props.cancelModal}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById('modal-root'),
    );
  }
}
export default ModalProposal;
