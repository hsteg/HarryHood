import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WatchListChart from './watchlist_chart';

class DashboardUserStockList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { stocks } = this.props;
    const lis = Object.values(this.props.heldStocks).filter((stock) => stock.num_shares > 0).map(heldStock => {
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
            <WatchListChart chartData={stocks[heldStock.stock_id].chart} quote={stocks[heldStock.stock_id].quote} />
          </div>
          <div className="list-stock-price">
            {this.props.stockListValue === "currentPrice" ? (
              `$${(stocks[heldStock.stock_id].quote.latestPrice).toFixed(2)}`
            ) : (
                `${((stocks[heldStock.stock_id].quote.changePercent) * 100)}%`
              )}
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