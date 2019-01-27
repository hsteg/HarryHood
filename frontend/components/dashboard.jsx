import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDayStocksPriceData, getUserStocks } from '../actions/stock_actions';
import { getUserTransactions } from '../actions/transaction_actions';
import { getUserWatches } from '../actions/user_watch_actions';
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
    this.props.getUserTransactions(this.props.currentUser.id);
    this.props.getUserWatches(this.props.currentUser.id);
    this.props.getUserStocks(this.props.currentUser.id).then( () => this.getStockSymbols()); 
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
      <div className="loggedin-main">
        <div className="loggedin-nav-holder">
          <Navbar />
        </div>
        <div className="loggedin-content-container">
          <div className="loggedin-content">
            <div className="loggedin-content-left-container">
              <section className="loggedin-content-graph-container">
                <DashboardChart />
              </section>
              <section className="loggedin-content-news-container">
                <div className="loggedin-content-news-header-container">
                  <div className="loggedin-content-news-header">
                    NEWS goes here
                    </div>
                </div>
                <div className="loggedin-content-news-list-container">
                  <div className="loggedin-content-news-item-container">
                    <div className="loggedin-content-news-item">
                      News Item
                      </div>
                    <div className="loggedin-content-news-item">
                      News Item
                      </div>
                    <div className="loggedin-content-news-item">
                      News Item
                      </div>
                    <div className="loggedin-content-news-item">
                      News Item
                      </div>
                    <div className="loggedin-content-news-item">
                      News Item
                      </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="loggedin-content-right-main-container">
              <div className="loggedin-content-right-main">
                <section className="dashboard-content-right-users-stocks">
                  <div className="dashboard-content-right-users-stocks-header">
                    <div className="dashboard-content-users-stocks-header-title">
                      User stocks
                    </div>
                    <div className="dashboard-content-users-stocks-header-button">
                      Button
                    </div>
                  </div>
                  <DashboardUserStockList stocks={this.props.stocks} loading={this.props.loading} transactions={this.props.transactions}/>
  
                </section>
                <section className="dashboard-content-right-users-watchlist">
                  <h1>watchlist</h1>
                  <DashboardWatchlist watches={this.props.userWatches} stocks={this.props.stocks} loading={this.props.loading} />
                </section>
              </div>
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
    loading: state.ui.loading.userStocksLoading,
  };
};

const mdp = (dispatch) => {
  return {
    getDayStocksPriceData: (stocks) => dispatch(getDayStocksPriceData(stocks)),
    getUserTransactions: (user) => dispatch(getUserTransactions(user)),
    getUserWatches: (user) => dispatch(getUserWatches(user)),
    getUserStocks: (stockIds) => dispatch(getUserStocks(stockIds))
  };
}

export default connect(msp, mdp)(Dashboard);