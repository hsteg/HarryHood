import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StockNewslist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stock-news-list-item">
        <div className="news-list-item-image">
          img here
        </div>
        <div className="stock-news-text-items">
          <div className="stock-news-text-source">
            source
          </div>
          <div className="stock-news-text-headline">
            headline
          </div>
          <div className="stock-news-text-source">
            source
          </div>
          <div className="stock-news-text-summary">
            summary
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(StockNewslist)