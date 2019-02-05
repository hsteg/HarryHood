import React from 'react';
import { connect } from 'react-redux';
import { createUserTransaction } from '../actions/transaction_actions';
import { getUserHeldStocks, getUserCashBalance } from '../actions/session_actions';
import { withRouter } from 'react-router-dom'; 

class StockTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_shares: 0,
      buy: true,
      stock_id: this.props.stock.id,
      user_id: this.props.currentUser.id,
      price_per_share: this.props.stock.quote.latestPrice,
      success: false,
      num_shares_transacted: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateNumSharesField = this.updateNumSharesField.bind(this);
    this.selectForm = this.selectForm.bind(this);
    this.calculateCostCredit = this.calculateCostCredit.bind(this);
    this.footerText = this.footerText.bind(this);
    this.displaySellButton = this.displaySellButton.bind(this);
    this.activeButton = this.activeButton.bind(this);
    this.submitButton = this.submitButton.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
  }

  componentDidMount(){
    this.props.getUserHeldStocks(this.props.currentUser.id);
  }

  handleSubmit(e) {
    e.preventDefault();
    const num_shares = this.state.buy ? this.state.num_shares : (this.state.num_shares * -1)
    this.props.createUserTransaction({stock_id: this.state.stock_id, user_id: this.state.user_id, price_per_share: this.state.price_per_share, num_shares: num_shares})
    .then(() => this.props.getUserCashBalance(this.props.currentUser.id))
    .then(() => this.props.getUserHeldStocks(this.props.currentUser.id))
    .then(() => this.setState({success: true, num_shares_transacted: this.state.num_shares}));
  }

  updateNumSharesField() {
    return (e) => {
      this.setState({ num_shares: e.target.value });
    }
  }

  displaySuccess() {
    const s = this.state.num_shares_transacted > 1 ? "s" : "";
    if(this.state.success) {
      if(this.state.buy) {
        return (
        <div className="transaction-form-footer">
          <h1 className="transaction-footer-text">Purchased {this.state.num_shares_transacted} share{s} of {this.props.currentSymbol}</h1>
        </div>
        );
      } else {
        return (
        <div className="transaction-form-footer">
          <h1 className="transaction-footer-text">Sold {this.state.num_shares_transacted} share{s} of {this.props.currentSymbol}</h1>
        </div>
        );
      }
    } else {
      return null;
    }
  }

  selectForm(value) {
    return (e) => {
      this.setState({ buy: value, success: false });
    };
  };

  calculateCostCredit() {
    const caluclatedVal = this.state.num_shares * this.props.stock.quote.latestPrice;
    return (caluclatedVal === 0) ? ("0.00") : (caluclatedVal.toFixed(2));
  }

  footerText() {
    return (this.state.buy) ? `$${this.props.currentUser.cash_balance} Buying Power Available` : `${this.props.numSharesToSell[this.props.stock.id].num_shares} Shares Available`;
  }

  activeButton(tfValue) {
    return (this.state.buy === tfValue) ? "transaction-header-button-a" : "transaction-header-button";
  }

  submitButton() {
    if(this.state.num_shares < 0) { return (<button className="invalid-transaction-button">Value cannot be negative :)</button>);  }
    if(this.state.buy) {
      if (this.calculateCostCredit() > this.props.currentUser.cash_balance) {
        return (<button className="invalid-transaction-button">Insufficient Funds</button>);
      } else {
        return (<button onClick={this.handleSubmit} className="transaction-button">Submit Order</button>);
      }
    } else {
      if (this.state.num_shares > this.props.numSharesToSell[this.props.stock.id].num_shares) {
        return (<button className="invalid-transaction-button">Insufficient Shares</button>);
      } else {
        return (<button onClick={this.handleSubmit} className="transaction-button">Submit Order</button>);
      }
    }
  }

  displaySellButton(){
    const { numSharesToSell, currentSymbol } = this.props;
    if ((numSharesToSell).hasOwnProperty(this.props.stock.id)) {
      return (<button className={this.activeButton(false)} onClick={this.selectForm(false)}>Sell {currentSymbol}</button>);
    } else {
      return (<div className="transaction-empty-sell-button"></div>);
    }
  }


  render() {
    if (Object.values(this.props.numSharesToSell).length < 1 || this.props.loading.userHeldStocks) {return (<img className="right-col-loading-img" src={window.loadingIMG} />);}

    const { currentSymbol } = this.props;

    return (
      <>
        <div className="transaction-container-header-container">
          <button className={this.activeButton(true)} onClick={this.selectForm(true)}>
            Buy {currentSymbol}
          </button>
          {this.displaySellButton()}
        </div>
        <div className="transaction-buy-form">
          <form>
            <div className="transaction-form-row">
              <h1 className="transaction-shares-text">Shares</h1>
              <input type="number" 
                    className="transaction-shares-field" 
                    placeholder="0" 
                    onChange={this.updateNumSharesField()} />
            </div>
            <div className="transaction-form-row">
              <h1 className="transaction-price-text">Market Price</h1>
              <h1 className="transaction-price-number">{this.props.stock.quote.latestPrice}</h1>
            </div>
            <div className="transaction-form-row">
              <h1 className="transaction-estimated-cost-text">
                { this.state.buy ? "Estimated Cost" : "Estimated Credit" }
              </h1>
              <h1 className="transaction-estimated-cost-number">${this.calculateCostCredit()}</h1>
            </div>
            <div className="transaction-form-row">
              {this.submitButton()}
            </div>
          </form>
        </div>
        <div className="transaction-form-footer">
          <h1 className="transaction-footer-text">{this.footerText()}</h1>
        </div>
        {this.displaySuccess()}
      </>
    );
  }
}

const msp = (state, ownProps) => {
  const currentSymbol = ownProps.match.params.symbol;

  return {
    currentUser: Object.values(state.entities.users)[0],
    currentSymbol: currentSymbol.toUpperCase(),
    numSharesToSell: state.session.heldStocks,
    loading: state.ui.loading
  };
};

const mdp = (dispatch) => {
  return {
    createUserTransaction: (data) => dispatch(createUserTransaction(data)),
    getUserHeldStocks: (userId) => dispatch(getUserHeldStocks(userId)),
    getUserCashBalance: (userId) => dispatch(getUserCashBalance(userId))
  };
}

export default withRouter(connect(msp, mdp)(StockTransaction));