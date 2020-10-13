import React from 'react';
//import CandidateList from '../../components/CandidateList';
import Navbar from '../Navbar';

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
            <td key={item.name}>
              {item.name}
              {item.description}
              {item.startAt}
              {item.endAt}
            </td>
          ))}
        </React.Fragment>
      );
    }
  }
}
export default Vote;
