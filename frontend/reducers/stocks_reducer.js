import {
  RECEIVE_INDIVIDUAL_STOCK_DAY_INFO,
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
  let stocks;
  switch (action.type) {
    case RECEIVE_INDIVIDUAL_STOCK_DAY_INFO:
      stocks = Object.values(newState).filter(stock => (stock.symbol in action.stockData));
      if (stocks.length === 1) {
        newState[stocks[0].id] = Object.assign(stocks[0], action.stockData[stocks[0].symbol]);
      } else {
        let stockDataObject = Object.values(action.stockData)[0];
        let newStockObject = Object.values(action.stockObject)[0];
        newState[newStockObject.id] = Object.assign(newStockObject, stockDataObject);
      }
      return newState;
    case RECEIVE_USER_STOCK_OBJECT:
      return action.stockObject;
    case RECEIVE_HISTORICAL_STOCK_DATA:
      stocks = Object.values(newState);
      for(let i = 0; i < stocks.length; i++) {
        if (stocks[i].symbol in action.stockData) {
          stocks[i].historicalData = action.stockData[stocks[i].symbol].chart;
        } else {
          continue;
        }
      }
      return newState;
    case RECEIVE_DASHBOARD_STOCKS:
      Object.values(action.stocks).forEach(stock => marriage[stock.id] = Object.assign({ id: stock.id, symbol: stock.symbol }, action.stockData[stock.symbol]))
      return marriage;
    case RECEIVE_STOCK_NEWS:
      stocks = Object.values(newState).filter(stock => (stock.symbol === action.symbol));
      stocks[0].news = action.news.articles;
      newState[stocks[0].id] = stocks[0];
      return newState;
    default:
      return newState;
  }
};

export default stocksReducer;