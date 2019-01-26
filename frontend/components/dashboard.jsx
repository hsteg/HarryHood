import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import { getDayStocksPriceData, getUserStocks } from '../actions/stock_actions';
import { getUserTransactions } from '../actions/transaction_actions';
import { getUserWatches } from '../actions/user_watch_actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.userStocks = this.userStocks.bind(this)
    // this.userStockSymbols = this.userStockSymbols.bind(this);
    }

  componentDidMount() { 
    this.props.getUserTransactions(this.props.currentUser.id);
    this.props.getUserWatches(this.props.currentUser.id);
    this.props.getUserStocks(this.props.currentUser.id)
  }

  // componentDidUpdate() {
  //   this.userStocks();
  // }



  userStocks() {
    const userStocks = [];
    Object.values(this.props.transactions).forEach( transaction => {
      userStocks.push(transaction.stock_id);
    });
    Object.values(this.props.userWatches).forEach( watch => {
      userStocks.push(watch.stock_id);
    });
  
    return this.props.getUserStocks(userStocks);
  }

  // userStockSymbols() {
  //   const userStockSymbols = [];
  
  //   Object.values(this.props.stocks).forEach( stock => {
  //     userStockSymbols.push(stock.symbol);
  //   });
  //   return this.props.getDayStocksPriceData(userStockSymbols.join(','));
  // }

  render() {  
    return (
      <div className="dashboard-main">
        <div className="dashboard-nav-holder">
          <div className="dashboard-navbar">
            <div className="dashboard-nav-logo-search">
              <div className="dashboard-nav-logo">
                Logo here
              </div>
              <div className="dashboard-nav-searchbar-container">
                <div className="dashboard-nav-searchbar">
                  Searchbar here
                </div>
              </div>
            </div>
            <div className="dashboard-nav-right-links">
              <div className="dashboard-nav-right-links-link-item">Home</div>
              <div className="dashboard-nav-right-links-link-item">Notifications</div>
              <div className="dashboard-nav-right-links-link-item">Account</div>
              <button onClick={this.props.logout}>Log Out :(</button>
            </div>
          </div>
        </div>
        <div className="dashboard-content-container">
          <div className="dashboard-content">
            <div className="dashboard-content-left-container">
              <section className="dashboard-content-graph-container">
                <div className="dashboard-content-graph-header-container">
                  <div className="dashboard-content-graph-header-portfolio-value">
                    porfolio value here
                    </div>
                  <div className="dashboard-content-graph-header-change-container">
                    day change
                    </div>
                  <div className="dashboard-content-graph-header-change-container-afterhours">
                    after hours change
                    </div>
                </div>
                <div className="dashboard-content-graph">
                  graph here
                  </div>
                <nav className="dashboard-content-graph-timeline-selector">

                </nav>
              </section>
              <section className="dashboard-content-news-container">
                <div className="dashboard-content-news-header-container">
                  <div className="dashboard-content-news-header">
                    NEWS goes here
                    </div>
                </div>
                <div className="dashboard-content-news-list-container">
                  <div className="dashboard-content-news-item-container">
                    <div className="dashboard-content-news-item">
                      News Item
                      </div>
                    <div className="dashboard-content-news-item">
                      News Item
                      </div>
                    <div className="dashboard-content-news-item">
                      News Item
                      </div>
                    <div className="dashboard-content-news-item">
                      News Item
                      </div>
                    <div className="dashboard-content-news-item">
                      News Item
                      </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="dashboard-content-right-main-container">
              <div className="dashboard-content-right-main">
                <section className="dashboard-content-right-users-stocks">
                  <div className="dashboard-content-right-users-stocks-header">
                    <div className="dashboard-content-users-stocks-header-title">
                      User stocks
                    </div>
                    <div className="dashboard-content-users-stocks-header-button">
                      Button
                    </div>
                  </div>
                  <div className="dashboard-content-right-users-stocks-stockitem">
                    <div className="dashboard-content-right-stockitem-name-container">
                      <div className="dashboard-content-right-stockitem-name">
                      </div>
                      <div className="dashboard-content-right-stockitem-numshares">
                      </div>
                    </div>
                    <div className="dashboard-content-right-stockitem-graph-container">
                      <div className="dashboard-content-right-stockitem-graph">
                        graph
                      </div>
                    </div>
                    <div className="dashboard-content-right-stockitem-price-container">
                      <div className="dashboard-content-right-stockitem-price">

                      </div>
                    </div>
                  </div>
                </section>
                <section className="dashboard-content-right-users-watchlist">
                  <div className="dashboard-content-right-users-watchlist-header">
                    <div className="dashboard-content-users-watchlist-header-title">
                      User watchlist
                    </div>
                    <div className="dashboard-content-users-watchlist-header-button">
                      Button
                    </div>
                  </div>
                  <div className="dashboard-content-right-users-watchlist-watchitem">
                    <div className="dashboard-content-right-watchitem-name-container">
                      <div className="dashboard-content-right-watchitem-name">
                      </div>
                    </div>
                    <div className="dashboard-content-right-watchitem-graph-container">
                      <div className="dashboard-content-right-watchitem-graph">
                        graph
                      </div>
                    </div>
                    <div className="dashboard-content-right-watchitem-price-container">
                      <div className="dashboard-content-right-watchitem-price">
                      </div>
                    </div>
                  </div>
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
  };
};

const mdp = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getDayStocksPriceData: (stocks) => dispatch(getDayStocksPriceData(stocks)),
    getUserTransactions: (user) => dispatch(getUserTransactions(user)),
    getUserWatches: (user) => dispatch(getUserWatches(user)),
    getUserStocks: (stockIds) => dispatch(getUserStocks(stockIds))
  };
}

export default connect(msp, mdp)(Dashboard);