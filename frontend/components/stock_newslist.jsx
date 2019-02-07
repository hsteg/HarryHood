import React from 'react';
import { connect } from 'react-redux';


class StockNewslist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { news } = this.props.stock
    const newsItems = news.map(newsItem => {
      // debugger
      return (
      <div className="stock-news-list-item">

        <div className="news-list-item-image">
          img here
        </div>
        
        <div className="stock-news-text-items">
          <div className="stock-news-text-source">
            {newsItem.source}
          </div>
          
          <div className="stock-news-text-headline">
            {newsItem.headline}
          </div>

          <div className="stock-news-text-summary">
            {newsItem.summary}
          </div>

        </div>
      </div>
      );
    });
    return (
      <div>{newsItems}</div>
    );
  }
}

export default connect(null, null)(StockNewslist)