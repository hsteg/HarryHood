import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WatchListChart from './watchlist_chart'

class DashboardWatchlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stocks } = this.props;
    
    const lis = Object.values(this.props.watches).map(watch => {
      return (
        <Link to={`/stock/${stocks[watch.stock_id].symbol}`} className="list-item" key={watch.id}>
          <div className="list-stock-symbol-container">
            {stocks[watch.stock_id].symbol}
          </div>
          <div className="list-stock-graph">
            <WatchListChart chartData={stocks[watch.stock_id].chart} quote={stocks[watch.stock_id].quote} />
          </div>
          <div className="list-stock-price">
            {this.props.watchListValue === "currentPrice" ? (
                `$${(stocks[watch.stock_id].quote.latestPrice).toFixed(2)}`
                ) : (
                  `${((stocks[watch.stock_id].quote.changePercent) * 100)}%`
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

export default connect(null, null)(DashboardWatchlist);