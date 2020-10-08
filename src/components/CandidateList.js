import React from 'react';

class CandidateList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.candidates.map((candidate) => {
          return <li key={candidate.id}></li>;
          return (
            <li key={candidate.id}>
              <p>{candidate.name} </p>
              <p>{candidate.description} </p>
              <p>{candidate.proposals[0][0]} </p>
              <p>{candidate.proposals[0][1]} </p>
              <p>{candidate.proposals[1][0]} </p>
              <p>{candidate.proposals[1][1]} </p>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default CandidateList;
