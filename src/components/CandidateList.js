import React from 'react';

class CandidateList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.candidates.map((candidate) => {
          return <li key={candidate.id}></li>;
        })}
      </ul>
    );
  }
}
export default CandidateList;
