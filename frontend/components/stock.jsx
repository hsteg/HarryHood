import React from 'react';
import { connect } from 'react-redux';
import { getStockInfo } from '../actions/stock_actions';
import Navbar from './navbar';
import DashboardChart from './dashboard_chart';


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
              <DashboardChart />
            </div>
            <div className="content-news">
              News goes here
            </div>
          </div>
          <div className="right-col">
            <div className="stocks-lists-container">
              
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