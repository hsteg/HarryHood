import React from 'react';
import { connect } from 'react-redux';

class DashboardUserStockList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) { return (<h1>loading :)</h1>); }
    const { stocks } = this.props;
    const lis = Object.values(this.props.transactions).map(transaction => {

      return (
        <div className="list-item" key={transaction.id}>
          
            <div className="list-stock-symbol">
              {stocks[transaction.stock_id].symbol}
            </div>
            <div className="list-stock-graph">
              graph here
          </div>
            <div className="list-stock-price">
              {stocks[transaction.stock_id].quote.latestPrice}
            </div>

        </div>
      );
    }

    );
    return (
      <div>{lis}</div>

    );
  }
}

export default connect(null, null)(DashboardUserStockList);