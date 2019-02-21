import {
  RECEIVE_FULL_STOCK_INFO,
  RECEIVE_DAY_STOCK_GROUP_PRICE_DATA,
  RECEIVE_USER_STOCK_OBJECT,
  RECEIVE_HISTORICAL_STOCK_DATA,
  RECEIVE_DASHBOARD_STOCKS,
  RECEIVE_STOCK_NEWS
} from '../actions/stock_actions';
import { merge } from 'lodash';

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  let marriage = {};
  let stockIds;
  switch (action.type) {
    case RECEIVE_FULL_STOCK_INFO:
      stockIds = Object.values(newState);
      stockIds.forEach(stock => marriage[stock.id] = Object.assign(stock, action.stock));
      return marriage;
    case RECEIVE_DAY_STOCK_GROUP_PRICE_DATA:
      stockIds = Object.values(newState);
      stockIds.forEach(stock => marriage[stock.id] = Object.assign(stock, action.stocks[stock.symbol]))
      return marriage;
    case RECEIVE_USER_STOCK_OBJECT:
      return action.stockObject;
    case RECEIVE_HISTORICAL_STOCK_DATA:
      stockIds = Object.values(newState);
      if(stockIds.length > 1) {
        stockIds.forEach(stock => {
          marriage[stock.id] = stock;
          marriage[stock.id].historicalData = action.stockData[stock.symbol].chart;
        });
      } else {
        stockIds.forEach(stock => {
          marriage[stock.id] = stock;
          marriage[stock.id].historicalData = action.stockData;
        });
      }
      return marriage;
    case RECEIVE_DASHBOARD_STOCKS:
      debugger
      Object.values(action.stocks).forEach(stock => marriage[stock.id] = Object.assign({ id: stock.id, symbol: stock.symbol }, action.stockData[stock.symbol]))
      return marriage;
    case RECEIVE_STOCK_NEWS:
      let stockWithNews = Object.values(newState)[0];
      stockWithNews.news = action.news.articles;
      const obj = {};
      obj[stockWithNews.id] = stockWithNews;
      return obj;
    default:
      return newState;
  }
};

export default stocksReducer;