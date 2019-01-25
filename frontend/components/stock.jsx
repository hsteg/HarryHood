import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import { getStockInfo } from '../actions/stock_actions';

class Stock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getStockInfo(this.props.symbol);
  }

  render() {
    return (
      <div>
       <h1>hello</h1>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  return {
    stocks: state.stocks,
    symbol: ownProps.match.params.symbol
  };
}

const mdp = (dispatch) => {
  return {
    getStockInfo: (stock) => dispatch(getStockInfo(stock)),
  };
}
 
export default connect(msp, mdp)(Stock);