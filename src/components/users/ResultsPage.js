import React from 'react';
import apiClient from '../../utils/api-client';
import queryParams from 'query-params';

class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      electionId: null,
      proposals: {
        title: {},
      },
    };
  }

  componentDidMount = async () => {
    try {
      //const result = await apiClient.get('getResultById');
      const query = queryParams.decode(this.props.location.search.substring(1));
      const { electionId } = query;
      console.log({ electionId });
      const result = await apiClient.get(
        `getResultById?electionId=${electionId}`,
      );

      console.log(result);
      this.setState({
        isLoaded: true,
        electionId: result[0].electionId,
        proposals: result[0].proposals,
      });
    } catch (error) {
      this.setState({ isLoaded: true });
      alert(error.message);
    }
  };

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
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {Object.keys(this.state.proposals).map((key) => (
            <div>
              <h2 key={key}> Resultados de la Propuesta: {key} </h2>
              <h3 key>
                El ganador es {this.getMaxKey(this.state.proposals[key])}
              </h3>
              {Object.keys(this.state.proposals[key]).map((key2) => (
                <div>
                  <h3 key={key2}>
                    Opción: {key2} - Votos: {this.state.proposals[key][key2]}
                  </h3>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  }
}

export default ResultsPage;
