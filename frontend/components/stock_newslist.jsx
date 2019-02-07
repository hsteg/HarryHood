import React from 'react';
import { connect } from 'react-redux';
import { getStockNews } from '../actions/stock_actions';


class StockNewslist extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getStockNews(this.props.stock.symbol);
  }

  render() {
    // debugger
    if(this.props.loading.stockNewsLoading) { return (<div>"loading"</div>); };


    let { news } = this.props.stock
    news = news || [];

    const newsItems = news.map(newsItem => {
      return (
      <div className="stock-news-list-item" key={newsItem.url}>

        <div className="news-list-item-image">
          <img src={newsItem.urlToImage} />
        </div>
        
        <div className="stock-news-text-items">
          <div className="stock-news-text-source">
            {newsItem.source.name}
          </div>
          
          <div className="stock-news-text-headline">
            {newsItem.title}
          </div>

          <div className="stock-news-text-summary">
            {newsItem.description}
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

const msp = (state) => {
  return {
    
  };
};

const mdp = (dispatch) => {
  return {
    getStockNews: (symbol) => dispatch(getStockNews(symbol)),
  };
};
 
export default connect(msp, mdp)(StockNewslist)