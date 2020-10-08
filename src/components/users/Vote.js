import React from 'react';
import CandidateList from '../../components/CandidateList';
import Navbar from '../Navbar';

class Vote extends React.Component {
  state = {
    loding: true,
    error: null,
    data: [
      {
        id: '1',
        name: 'Elecciones',
        description: 'Cambiar muebles',
        proposals: [
          ['Muebles nuevos', ['Si', 'No', 'Abstencion']],
          ['Muebles viejos', ['Si', 'No', 'Abstencion']],
        ],
      },
    ],
  };

  // componentDidMount(){
  //   this.fetchData();
  // }

  // fetchData = () => {
  // this.setState({loading: true, error: null});

  // try{
  //   const data = [];
  //   this.setState({loading: false,data: data});

  // }catch (error){
  //   this.setState({loading: false,error: error});

  // }
  // }

  render() {
    // if (this.state.loding === true){
    //   return 'Loading...';
    // }
    return (
      <div>
        <Navbar />
        <CandidateList candidates={this.state.data} />
        <div>
          <a
            className="App-link"
            href="http://localhost:8888/.netlify/functions/hello"
            target="_blank"
            rel="noopener noreferrer"
          >
            Votar
          </a>
        </div>
      </div>
    );
  }
}
export default Vote;
