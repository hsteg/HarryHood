import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDayStocksPriceData, getUserStocks } from '../actions/stock_actions';
import { getUserWatches } from '../actions/user_watch_actions';
import { getUserHeldStocks, getUserPortfolioSnapshots } from '../actions/session_actions';
import DashboardWatchlist from './dashboard_watchlist';
import DashboardUserStockList from './dashboard_user_stocks';
import Navbar from './navbar';
import DashboardChart from './dashboard_chart';
import DashboardNewslist from './dashboard_newslist';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockListValue: "currentPrice",
      watchListValue: "currentPrice", 
      range: "ALL",
      newsStocks: "",
    } 
    this.displayUserStockList = this.displayUserStockList.bind(this);
    this.displayUserWatchList = this.displayUserWatchList.bind(this);
    this.handleSelector = this.handleSelector.bind(this);
    this.displayUserPortfolioChart = this.displayUserPortfolioChart.bind(this);
    this.displayDashboardNewslist = this.displayDashboardNewslist.bind(this);
  }

  componentDidMount() {
    this.props.getUserStocks(this.props.currentUser.id).then(() => this.displayDashboardNewslist());
    this.props.getUserPortfolioSnapshots(this.props.currentUser.id)
    this.props.getUserHeldStocks(this.props.currentUser.id);
    this.props.getUserWatches(this.props.currentUser.id);
  }

  displayUserStockList(){
    const { userHeldStocksLoading, dashboardStocksLoading } = this.props.loading;
    const numHeldStocks = Object.keys(this.props.heldStocks);
    const numUserStocksInState = Object.keys(this.props.stocks);

    const arrEq = numHeldStocks.map(key => numUserStocksInState.includes(key) ? true : false );

    if ( userHeldStocksLoading || dashboardStocksLoading ) {
      return (<img className="right-col-loading-img" src={window.loadingIMG} />);
    } else {
      if (arrEq.includes(false) ) { return (<img className="right-col-loading-img" src={window.loadingIMG} />); }

      return (<DashboardUserStockList stocks={this.props.stocks} heldStocks={this.props.heldStocks} stockListValue={this.state.stockListValue} />);
    }
  }

  displayUserWatchList(){
    const { userWatchListLoading, dashboardStocksLoading } = this.props.loading;
    const notEnoguhStocks = Object.values(this.props.stocks).length < Object.values(this.props.userWatches).length
    if ( userWatchListLoading || dashboardStocksLoading || notEnoguhStocks) {
      return (<img className="right-col-loading-img" src={window.loadingIMG} />);
    } else {
      return (<DashboardWatchlist watches={this.props.userWatches} stocks={this.props.stocks} watchListValue={this.state.watchListValue} />);
    }
  }

  displayUserPortfolioChart() {
    const { userPortfolioDataLoading } = this.props.loading;
    if ( userPortfolioDataLoading ) {
      return (<img className="right-col-loading-img" src={window.loadingIMG} />);
    } else {
      if(this.props.portfolioSnapshots.length === 0) { return (<img className="right-col-loading-img" src={window.loadingIMG} />);}
      return (<DashboardChart currentUser={this.props.currentUser} dateRange={this.state.range} chartData={this.props.portfolioSnapshots} />);
    }
  }

  displayDashboardNewslist() {
    const { dashboardStocksLoading } = this.props.loading;
    if(dashboardStocksLoading) {
      return (<img className="right-col-loading-img" src={window.loadingIMG} />);
    } else {
      const newsStocks = Object.values(this.props.stocks).map(stock => {
        return stock.symbol;
      }).join('%20OR%20');
      this.setState({newsStocks: newsStocks});
    }
  }


  handleSelector(e) {
    this.setState({ range: e.currentTarget.innerText });
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
              {this.displayUserPortfolioChart()}
            </div>
            <nav className="chart-timeline-selector">
                <button className={this.state.range === "1D" ? "chart-selector-button-a" : "chart-selector-button"} 
                        onClick={this.handleSelector}>1D</button>
                <button className={this.state.range === "1W" ? "chart-selector-button-a" : "chart-selector-button"} 
                        onClick={this.handleSelector}>1W</button>
                <button className={this.state.range === "1M" ? "chart-selector-button-a" : "chart-selector-button"} 
                        onClick={this.handleSelector}>1M</button>
                <button className={this.state.range === "3M" ? "chart-selector-button-a" : "chart-selector-button"} 
                        onClick={this.handleSelector}>3M</button>
                <button className={this.state.range === "1Y" ? "chart-selector-button-a" : "chart-selector-button"} 
                        onClick={this.handleSelector}>1Y</button>
                <button className={this.state.range === "ALL" ? "chart-selector-button-a" : "chart-selector-button"} 
                        onClick={this.handleSelector}>ALL</button>
              </nav>
            <div className="content-news">
              {this.state.newsStocks ? <DashboardNewslist newsStocks={this.state.newsStocks}/> : <img className="right-col-loading-img" src={window.loadingIMG} />  }
            </div>
          </div>
          <div className="right-col">
            <div className="stocks-lists-container">
              <div className="stocks-list-header">
                <h1 className="stocks-list-header-text">Stocks</h1>
                <h1 className="stocks-list-header-button"></h1>
              </div>
                {this.displayUserStockList()}
              <div className="watch-list-header">
                <h1 className="stocks-list-header-text">Watchlist</h1>
                <h1 className="stocks-list-header-button"></h1>
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
    userWatches: state.entities.userWatches,
    heldStocks: state.session.heldStocks,
    loading: state.ui.loading,
    portfolioSnapshots: state.session.portfolioSnapshots,
    news: state.ui.news,
  };
};

const mdp = (dispatch) => {
  return {
    getDayStocksPriceData: (stocks) => dispatch(getDayStocksPriceData(stocks)),
    getUserWatches: (user) => dispatch(getUserWatches(user)),
    getUserStocks: (stockIds) => dispatch(getUserStocks(stockIds)),
    getUserHeldStocks: (userId) => dispatch(getUserHeldStocks(userId)),
    getUserPortfolioSnapshots: (userId) => dispatch(getUserPortfolioSnapshots(userId))
  };
}

export default connect(msp, mdp)(Dashboard);