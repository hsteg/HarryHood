import React from 'react';
import { connect } from 'react-redux';
import { getStockInfo } from '../actions/stock_actions';
import Navbar from './navbar';
import StockChart from './stock_chart';
import TransactionBox from './transaction-box';


class Stock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getStockInfo(this.props.symbol);
  }

  render() {
    return (
      <div className="dashboard-main">
        <div className="header-container">
          <Navbar />
        </div>
        <div className="content-main">
          <div className="left-col">
            <div className="content-chart">
              <StockChart stock={this.props.stocks} />
            </div>
            <div className="content-news">
              News goes here
            </div>
          </div>
          <div className="right-col">
            <div className="transaction-container">
              <div className="transaction-container-header-container">
                  asdf
              </div>
              <div className="transaction-component">
                <TransactionBox />
              </div>
            </div>
          </div>
        </div>
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