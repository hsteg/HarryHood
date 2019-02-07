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
    if(this.props.loading.stockNewsLoading) { return (<img className="right-col-loading-img" src={window.loadingIMG} />); };


    let { news } = this.props.stock
    news = news || [];

    const newsItems = news.map(newsItem => {
      return (
      <a href={newsItem.url} className="stock-news-list-item" key={newsItem.url}>

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
      </a>
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