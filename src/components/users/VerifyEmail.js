import React from 'react';
import '../styles/Vote.css';
import queryParams from 'query-params';
import apiClient from '../../utils/api-client';

class VerifyEmail extends React.Component {
  componentDidMount = async () => {
    try {
      const query = queryParams.decode(this.props.location.search.substring(1));
      const { userId, tokenId } = query;

      await apiClient.get(`validateEmail?userId=${userId}&tokenId=${tokenId}`);
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return <h1>User Validated</h1>;
  }
}
export default VerifyEmail;
