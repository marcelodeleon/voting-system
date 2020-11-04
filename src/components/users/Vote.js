import React from 'react';
import Navbar from '../Navbar';
import '../styles/Vote.css';

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
    await fetch('../.netlify/functions/getElections')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
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
                <b>Nombre:</b>
              </tr>
              <tr>{item.name}</tr>
              <tr>
                <b>Descripcion:</b>
              </tr>
              <tr>{item.description}</tr>
              <tr>
                <b>Descripcion:</b>
              </tr>
              <tr>{item.proposals.type}</tr>
              <tr>
                <b>Comienza:</b>
              </tr>
              <tr>{item.startAt}</tr>
              <tr>
                <b>Termina:</b>
              </tr>
              <tr>{item.endAt}</tr>
              <button className="Btn__component" type="button">
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
