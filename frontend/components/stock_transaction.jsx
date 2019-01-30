import React from 'react';
import { connect } from 'react-redux';

class StockTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numShares: 0,
      buy: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateNumSharesField = this.updateNumSharesField.bind(this);
    this.selectForm = this.selectForm.bind(this);
    this.calculateCostCredit = this.calculateCostCredit.bind(this);
  }

  // componentWillMount() {
  //   // this.props.clearErrors();
  // }

  handleSubmit(e) {
    e.preventDefault();
    debugger;
  }

  updateNumSharesField() {
    return (e) => {
      this.setState({ numShares: e.target.value });
    }
  }

  selectForm(value) {
    return (e) => {
      this.setState({ buy: value });
    };
  };

  calculateCostCredit() {
    const caluclatedVal = this.state.numShares * this.props.latestStockPrice;
    return (caluclatedVal === 0) ? ("0.00") : (caluclatedVal.toFixed(2));
  }

  render() {
    const { currentSymbol, latestStockPrice } = this.props;

    const buy = (field) => {
      if (this.state.buy === field) {
        return "transaction-header-button-a";
      } else {
        return "transaction-header-button"
      }
    };

    const footerText = (this.state.buy) ? `$${this.props.currentUser.cash_balance} Buying Power Available` : "Shares Available";

    return (
      <>
        <div className="transaction-container-header-container">
          <button className={buy(true)} onClick={this.selectForm(true)}>
            Buy {currentSymbol}
          </button>
          <button className={buy(false)} onClick={this.selectForm(false)}>
            Sell {currentSymbol}
          </button>
        </div>
        <div className="transaction-buy-form">
          <form onSubmit={this.handleSubmit}>
            <div className="transaction-form-row">
              <h1 className="transaction-shares-text">Shares</h1>
              <input type="text" 
                    className="transaction-shares-field" 
                    placeholder="0" 
                    onChange={this.updateNumSharesField()} />
            </div>
            <div className="transaction-form-row">
              <h1 className="transaction-price-text">Market Price</h1>
              <h1 className="transaction-price-number">{latestStockPrice}</h1>
            </div>
            <div className="transaction-form-row">
              <h1 className="transaction-estimated-cost-text">
                { this.state.buy ? "Estimated Cost" : "Estimated Credit" }
              </h1>
              <h1 className="transaction-estimated-cost-number">${this.calculateCostCredit()}</h1>
            </div>
            <div className="transaction-form-row">
              <input type="submit" value="Review Order" className="transaction-button" />
            </div>
          </form>
        </div>
        <div className="transaction-form-footer">
          <h1 className="transaction-footer-text">{footerText}</h1>
        </div>
      </>
    );
  }
}

const msp = (state) => {
  return {
    currentUser: Object.values(state.entities.users)[0],
    latestStockPrice: Object.values(state.entities.stocks)[0].quote.latestPrice,
    currentSymbol: Object.values(state.entities.stocks)[0].symbol,
  };
};

export default connect(msp, null)(StockTransaction);