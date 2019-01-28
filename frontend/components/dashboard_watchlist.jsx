import React from 'react';
import { connect } from 'react-redux';

class DashboardWatchlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) { return (<h1>loading :)</h1>); }
    const { stocks } = this.props;
    const lis = Object.values(this.props.watches).map(watch => {

      return (
        <div className="list-item" key={watch.id}>
            <div className="watchlist-stock-symbol">
              {stocks[watch.stock_id].symbol}
            </div>
            <div className="watchlist-stock-graph">
              graph here
          </div>
            <div className="watchlist-stock-price">
              {stocks[watch.stock_id].quote.latestPrice}
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

export default connect(null, null)(DashboardWatchlist);