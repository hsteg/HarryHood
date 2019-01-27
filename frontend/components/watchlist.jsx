import React from 'react';
import { connect } from 'react-redux';

class DashboardWatchlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>hello</h1>
    );
  }
}

export default connect(null, null)(DashboardWatchlist);