import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DashboardWatchlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) { return (<h1>loading :)</h1>); }
    const { stocks } = this.props;
    const lis = Object.values(this.props.watches).map(watch => {

      return (
        <Link to={`/stock/${stocks[watch.stock_id].symbol}`} className="list-item" key={watch.id}>
          <div className="list-stock-symbol-container">
            {stocks[watch.stock_id].symbol}
          </div>
          <div className="list-stock-graph">
            graph here
          </div>
          <div className="list-stock-price">
            ${stocks[watch.stock_id].quote.latestPrice}
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