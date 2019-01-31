import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDayStocksPriceData, getUserStocks } from '../actions/stock_actions';
import { getUserTransactions } from '../actions/transaction_actions';
import { getUserWatches } from '../actions/user_watch_actions';
import { getUserHeldStocks } from '../actions/session_actions';
import DashboardWatchlist from './dashboard_watchlist';
import DashboardUserStockList from './dashboard_user_stocks';
import Navbar from './navbar';
import DashboardChart from './dashboard_chart';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getStockSymbols = this.getStockSymbols.bind(this);
    this.displayUserStockList = this.displayUserStockList.bind(this);
    this.displayUserWatchList = this.displayUserWatchList.bind(this);
  }

  componentDidMount() {
    this.props.getUserHeldStocks(this.props.currentUser.id);
    this.props.getUserTransactions(this.props.currentUser.id);
    this.props.getUserWatches(this.props.currentUser.id);
    this.props.getUserStocks(this.props.currentUser.id).then(() => this.getStockSymbols());
  }

  getStockSymbols() {
    const stockSymbols = [];
    Object.values(this.props.stocks).forEach(
      stock => stockSymbols.push(stock.symbol)
    );
    this.props.getDayStocksPriceData(stockSymbols.join(','));
  }


  displayUserStockList(){
    const { userHeldStocksLoading, userStocksLoading } = this.props.loading;
    const numHeldStocks = Object.values(this.props.heldStocks).length;
    const numUserStocksInState = Object.values(this.props.stocks).length;

    if ( userHeldStocksLoading || userStocksLoading ) {
      return (<h1>Loading</h1> );
    } else {
      if (numHeldStocks === 0 || numUserStocksInState < numHeldStocks ) { return null; }

      return (<DashboardUserStockList stocks={this.props.stocks} heldStocks={this.props.heldStocks} />);
    }
  }

  displayUserWatchList(){
    const { userWatchListLoading, userStocksLoading } = this.props.loading;
    if ( userWatchListLoading || userStocksLoading) {
      return (<h1>Loading</h1> );
    } else {
      if (Object.values(this.props.userWatches).length === 0 || Object.values(this.props.stocks).length === 0) { return null; }

      return (<DashboardWatchlist watches={this.props.userWatches} stocks={this.props.stocks} />);
    }
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
              <div className="stocks-list-header">
                <h1 className="stocks-list-header-text">user stocks</h1>
                <h1 className="stocks-list-header-button">button</h1>
              </div>
                {this.displayUserStockList()}
              <div className="watch-list-header">
                <h1 className="stocks-list-header-text">Watchlist</h1>
                <h1 className="stocks-list-header-button">button</h1>
              </div>
                {this.displayUserWatchList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const msp = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    stocks: state.entities.stocks,
    transactions: state.entities.transactions,
    userWatches: state.entities.userWatches,
    heldStocks: state.session.heldStocks,
    loading: state.ui.loading
  };
};

const mdp = (dispatch) => {
  return {
    getDayStocksPriceData: (stocks) => dispatch(getDayStocksPriceData(stocks)),
    getUserTransactions: (user) => dispatch(getUserTransactions(user)),
    getUserWatches: (user) => dispatch(getUserWatches(user)),
    getUserStocks: (stockIds) => dispatch(getUserStocks(stockIds)),
    getUserHeldStocks: (userId) => dispatch(getUserHeldStocks(userId))
  };
}

export default connect(msp, mdp)(Dashboard);