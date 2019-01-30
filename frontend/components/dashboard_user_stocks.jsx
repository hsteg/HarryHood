import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DashboardUserStockList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) { return (<h1>loading :)</h1>); }
    const { stocks } = this.props;
    const lis = Object.values(this.props.transactions).map(transaction => {

      return (
        <Link to={`/stock/${stocks[transaction.stock_id].symbol}`} className="list-item" key={transaction.id}>
            <div className="list-stock-symbol-container">
              <h2 className=".list-stock-symbol">
                {stocks[transaction.stock_id].symbol}
              </h2>
              <h3 className="list-stock-numshares">
                numshares
              </h3>
            </div>
            <div className="list-stock-graph">
              graph here
          </div>
            <div className="list-stock-price">
              {stocks[transaction.stock_id].quote.latestPrice}
            </div>
        </Link>
      );
    }

    );
    return (
      <div>{lis}</div>

    );
  }
}

export default connect(null, null)(DashboardUserStockList);