import React from 'react';
import { connect } from 'react-redux';
import { getStockInfo, getStockObjectBySymbol } from '../actions/stock_actions';
import Navbar from './navbar';
import StockChart from './stock_chart';
import StockTransaction from './stock_transaction';
import { withRouter } from 'react-router-dom';



class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      range: "1D"
    }
    this.handleSelector = this.handleSelector.bind(this);
  }

  componentDidMount() {
    this.props.getStockObjectBySymbol(this.props.symbol)
      .then(() => this.props.getStockInfo(this.props.symbol))
      .then(() => this.setState({ dataLoaded: true }));
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.symbol !== this.props.match.params.symbol) {
      this.setState({dataLoaded: false})
      this.props.getStockObjectBySymbol(this.props.symbol)
      .then(() => this.props.getStockInfo(this.props.symbol))
      .then(() => this.setState({ dataLoaded: true }));
    } 
  }

  handleSelector(e) {
    this.setState({ range: e.currentTarget.innerText });
  }



  render() {
    if (this.state.dataLoaded === false || this.props.loading || !(this.props.stock)  ) {return (<div className="page-loading"><img className="page-loading-spinner" src={window.loadingIMG} /></div>); };
    return (
      <div className="dashboard-main">
        <div className="header-container">
          <Navbar />
        </div>
        <div className="content-main">
          <div className="left-col">
            <div className="content-chart">
              <StockChart stock={this.props.stock} dateRange={this.state.range} />
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
                <button className={this.state.range === "5Y" ? "chart-selector-button-a" : "chart-selector-button"} 
                        onClick={this.handleSelector}>5Y</button>
              </nav>
            </div>
            <div className="content-news">
              News goes here
            </div>
          </div>
          <div className="right-col">
            <div className="transaction-container">
              <div className="transaction-component">
                <StockTransaction stock={this.props.stock} />
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
    stock: Object.values(state.entities.stocks).filter((stock) => stock.symbol === ownProps.match.params.symbol)[0],
    symbol: ownProps.match.params.symbol.toUpperCase(),
    loading: state.ui.loading.stockDataLoading,
  };
}

const mdp = (dispatch) => {
  return {
    getStockInfo: (stock) => dispatch(getStockInfo(stock)),
    getStockObjectBySymbol: (symbol) => dispatch(getStockObjectBySymbol(symbol)),
  };
}

export default withRouter(connect(msp, mdp)(Stock));