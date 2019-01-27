import React from 'react';
import { connect } from 'react-redux';

class DashboardWatchlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) { return (<h1>loading :)</h1>); } 
    const {stocks} = this.props;
    const lis = Object.values(this.props.watches).map(watch => {
      
      return (
        <li key={watch.id}>
          <div className="watchlist-stock-symbol">
            {stocks[watch.stock_id].symbol}
          </div>
          <div className="watchlist-stock-graph">
            graph here
          </div>
          <div className="watchlist-stock-price">
            {stocks[watch.stock_id].quote.latestPrice}
          </div>
        </li>
      );
    }

    );
    return (
      <div>{lis}</div>

    );
  }
}

export default connect(null, null)(DashboardWatchlist);