import React from 'react';

class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      cerrada: false,
      idElection: 2,
      resultado: {
        proposals: {
          title: {
            agua: 3,
            pepsi: 4,
          },
        },
      },
    };
  }

  getMaxKey = (obj) => {
    let winner = '';
    let max = 0;
    Object.keys(obj).forEach((key) => {
      if (obj[key] > max) {
        max = obj[key];
        winner = key;
      }
    });
    return winner;
  };

  getMaxValue = (obj) => {
    let winner = 0;
    Object.keys(obj).forEach((key) => {
      if (obj[key] > winner) {
        winner = obj[key];
      }
    });
    return winner;
  };

  getTotal = (obj) => {
    let total = 0;
    Object.keys(obj).forEach((key) => {
      total += obj[key];
    });
    return total;
  };

  render() {
    return (
      <div>
        <h1>Resultados de la elección {this.state.resultado.idElection} </h1>
        <div>
          <h2>De las opciones...</h2>
          <p>
            {' '}
            El ganador es {this.getMaxKey(
              this.state.resultado.proposals.title,
            )}{' '}
          </p>
        </div>
      </div>
    );
  }
}

export default ResultsPage;
