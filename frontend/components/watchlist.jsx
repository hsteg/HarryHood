import React from 'react';
import { connect } from 'react-redux';

class DashboardWatchlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // debugger
    // const lis = Object.keys(this.props.watches).map( watch => 
    //   {
    //     return(
    //     <li>
    //       <div className="watchlist-stock-symbol">
    //         {this.props.stocks[watch.id].symbol}
    //       </div>
    //       <div className="watchlist-stock-graph">
    //         graph here
    //       </div>
    //       <div className="watchlist-stock-price">
    //         {this.props.stocks[watch.id].quote.latestPrice}
    //       </div>
    //     </li>
    //     ); 
    //   }

    // );
    return (
      <div>hello</div>
      
    );
  }
}

export default connect(null, null)(DashboardWatchlist);