import React from 'react';
import Navbar from '../Navbar';
import '../styles/Vote.css';
import queryParams from 'query-params';
import apiClient from '../../utils/api-client';

class VerifyEmail extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoaded: false,
  //     error: null,
  //     item: null,
  //     proposals: {},
  //   };
  // }

  // handleOptionChange = (changeEvent) => {
  //   const { value, name } = changeEvent.target;
  //   const proposals = { ...this.state.proposals, [name]: value };
  //   this.setState({ proposals });
  // };

  // handleSubmit = async (evt) => {
  //   evt.preventDefault();
  //   const { proposals } = this.state;
  //   try {
  //     await apiClient.post('createResult', {
  //       body: {
  //         electionId: this.state.item._id,
  //         proposals,
  //       },
  //     });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  componentDidMount = async () => {
    try {
      const query = queryParams.decode(this.props.location.search.substring(1));
      const { userId, tokenId } = query;
      console.log(userId);
      console.log(tokenId);

      const validated = await apiClient.get(
        `validateEmail?userId=${userId}&tokenId=${tokenId}`,
      );
      console.log(validated);

      // this.setState({ isLoaded: true, item: userId });
    } catch (error) {
      // this.setState({ isLoaded: true, error: error });
      alert(error);
    }
  };
  render() {
    // const { error, isLoaded, item } = this.state;
    // if (error) {
    //   return <div>Error: {error}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {
    return (
      <h1>User Validated</h1>
      // <React.Fragment>
      //   <div>
      //     <Navbar />
      //   </div>
      //   <form onSubmit={this.handleSubmit}>
      //     <div className="Election__vote" key={item.name}>
      //       <ul>
      //         <li>
      //           <b>Eleccion:</b>
      //         </li>
      //         <li>{item.name}</li>
      //         <li>
      //           <b>Descripcion:</b>
      //         </li>
      //         <li>{item.description}</li>
      //         <li>
      //           <b>Propuestas:</b>
      //         </li>
      //         <li>
      //           <ul>
      //             {item.proposals.map((proposal) => (
      //               <li key={proposal.title}>
      //                 <b>{proposal.title}</b>
      //                 <ul key={proposal.title}>
      //                   {proposal.options.map((option) => (
      //                     <li key={option}>
      //                       <input
      //                         type="radio"
      //                         name={proposal.title}
      //                         value={option}
      //                         onChange={(e) => this.handleOptionChange(e)}
      //                       />
      //                       {option}
      //                     </li>
      //                   ))}
      //                 </ul>
      //               </li>
      //             ))}
      //           </ul>
      //         </li>
      //         <li>
      //           <b>Comienza:</b>
      //         </li>
      //         <li>{item.startAt}</li>
      //         <li>
      //           <b>Termina:</b>
      //         </li>
      //         <li>{item.endAt}</li>
      //       </ul>
      //       <button className="Btn__component" type="submit">
      //         Votar
      //       </button>
      //     </div>
      //   </form>
      // </React.Fragment>
    );
    // }
  }
}
export default VerifyEmail;
