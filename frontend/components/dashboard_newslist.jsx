import React from 'react';
import { connect } from 'react-redux';
import { getDashboardNews } from '../actions/stock_actions';

class DashboardNewslist extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getDashboardNews(this.props.stocks);
  }

  render() {
    // debugger
    if(this.props.loading) { return (<img className="right-col-loading-img" src={window.loadingIMG} />); };
    debugger
    let { news } = this.props.news;
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
    loading: state.ui.loading.dashboardNewsLoading,
    news: state.ui.news,
  };
};

const mdp = (dispatch) => {
  return {
    getDashboardNews: (stocks) => dispatch(getDashboardNews(stocks)),
  };
};

export default connect(msp, mdp)(DashboardNewslist);