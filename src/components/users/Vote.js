import React from 'react';
import CandidateList from '../../components/CandidateList';
import { Link } from 'react-router-dom';

class Vote extends React.Component {
  state = {
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
  render() {
    return (
      <div>
        <CandidateList candidates={this.state.data} />
        <Link to="/admin/election" className="btn btn-primary">
          Votar
        </Link>
      </div>
    );
  }
}
export default Vote;
