import React from 'react';
import { connect } from 'react-redux';
import { getStockInfo, getStockObjectBySymbol } from '../actions/stock_actions';
import Navbar from './navbar';
import StockChart from './stock_chart';
import TransactionBox from './transaction-box';



class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false
    }
  }

  componentDidMount() {
    this.props.getStockObjectBySymbol(this.props.symbol)
    .then(() => this.props.getStockInfo(this.props.symbol))
    .then( () => this.setState({dataLoaded: true}));
  }



  render() {
    if (this.state.dataLoaded === false) { return (<h1>loading :)</h1>); };
    if (this.props.loading) { return (<h1>loading :)</h1>); };
    
    return (
      <div className="dashboard-main">
        <div className="header-container">
          <Navbar />
        </div>
        <div className="content-main">
          <div className="left-col">
            <div className="content-chart">
              
              <StockChart stock={this.props.stock} />
            </div>
            <div className="content-news">
              News goes here
            </div>
          </div>
          <div className="right-col">
            <div className="transaction-container">
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
    stock: Object.values(state.entities.stocks)[0],
    symbol: ownProps.match.params.symbol,
    loading: state.ui.loading.stockDataLoading,
  };
}

const mdp = (dispatch) => {
  return {
    getStockInfo: (stock) => dispatch(getStockInfo(stock)),
    getStockObjectBySymbol: (symbol) => dispatch(getStockObjectBySymbol(symbol)),
  };
}
 
export default connect(msp, mdp)(Stock);