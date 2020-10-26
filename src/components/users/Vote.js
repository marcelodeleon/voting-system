import React from 'react';
import Navbar from '../Navbar';
import '../styles/Vote.css';
import apiClient from '../../utils/api-client';

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      items: [],
    };
  }

  componentDidMount = async () => {
    try {
      const elections = await apiClient.get('getElectionsById');
      this.setState({ isLoaded: true, items: elections });
    } catch (error) {
      this.setState({ isLoaded: true });
      alert(error.message);
    }
  };
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <div>
            <Navbar />
          </div>
          {items.map((item) => (
            <td className="Election__vote" key={item.name}>
              <tr>
                <b>Eleccion:</b>
              </tr>
              <tr>{item.name}</tr>
              <tr>
                <b>Descripcion:</b>
              </tr>
              <tr>{item.description}</tr>
              <tr>
                <b>Propuesta:</b>
              </tr>
              <tr>
                {item.proposals.map((proposal) => (
                  <tr>{proposal.title}</tr>
                ))}
              </tr>
              <tr>
                <b>Opciones:</b>
              </tr>
              <tr>
                {item.proposals.map((proposal) => (
                  <tr>
                    {proposal.options.map((option) => (
                      <tr>
                        <input
                          type="radio"
                          name="opcion"
                          value="insert"
                          //id="insert-${data.id}"
                        />
                        {option}
                      </tr>
                    ))}
                  </tr>
                ))}
              </tr>
              <tr>
                <b>Comienza:</b>
              </tr>
              <tr>{item.startAt}</tr>
              <tr>
                <b>Termina:</b>
              </tr>
              <tr>{item.endAt}</tr>
              <button className="Btn__component" type="submit">
                Votar
              </button>
            </td>
          ))}
        </React.Fragment>
      );
    }
  }
}
export default Vote;
