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
              <DashboardUserStockList stocks={this.props.stocks} loading={this.props.loading} transactions={this.props.transactions} />
              <div className="watch-list-header">
                <h1 className="stocks-list-header-text">Watchlist</h1>
                <h1 className="stocks-list-header-button">button</h1>
              </div>
              <DashboardWatchlist watches={this.props.userWatches} stocks={this.props.stocks} loading={this.props.loading} />
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
    dayStockDataLoading: state.ui.loading.dayStockDataLoading,
    userWatchListLoading: state.ui.loading.userWatchListLoading,
    userTransactionsLoading: state.ui.loading.userTransactionsLoading,
    userHeldStocksLoading: state.ui.loading.userHeldStocksLoading
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