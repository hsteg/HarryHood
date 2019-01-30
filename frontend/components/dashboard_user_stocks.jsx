import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DashboardUserStockList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stocks } = this.props;
    const lis = Object.values(this.props.heldStocks).map(heldStock => {
      return (
        <Link to={`/stock/${stocks[heldStock.stock_id].symbol}`} className="list-item" key={heldStock.stock_id}>
            <div className="list-stock-symbol-container">
              <h2 className=".list-stock-symbol">
                {stocks[heldStock.stock_id].symbol}
              </h2>
              <h3 className="list-stock-numshares">
                {heldStock.num_shares} Shares
              </h3>
            </div>
            <div className="list-stock-graph">
              graph here
          </div>
            <div className="list-stock-price">
              ${stocks[heldStock.stock_id].quote.latestPrice}
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