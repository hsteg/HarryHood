import React from 'react';
import { connect } from 'react-redux';

class TransactionBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>hello i am transactionbox</h1>
    );
  }
}

export default connect(null, null)(TransactionBox);