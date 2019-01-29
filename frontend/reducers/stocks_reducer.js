import { RECEIVE_FULL_STOCK_INFO, 
        RECEIVE_DAY_STOCK_GROUP_PRICE_DATA,
        RECEIVE_USER_STOCKS,
        RECEIVE_USER_STOCK_OBJECT,
        RECEIVE_HISTORICAL_STOCK_DATA } from '../actions/stock_actions';
import { merge } from 'lodash';

const stocksReducer = (state={}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  let marriage = {};
  let stockIds;
  switch(action.type) {
    case RECEIVE_FULL_STOCK_INFO:
      stockIds = Object.values(newState);
      stockIds.forEach(stock => marriage[stock.id] = Object.assign(stock, action.stock));
      return marriage;
    case RECEIVE_USER_STOCKS:
      return merge(newState, action.stocks);
    case RECEIVE_DAY_STOCK_GROUP_PRICE_DATA:
      stockIds = Object.values(newState);
      stockIds.forEach(stock => marriage[stock.id] = Object.assign(stock, action.stocks[stock.symbol]))
      return marriage;
    case RECEIVE_USER_STOCK_OBJECT:
      return merge(newState, action.stockObject);
    case RECEIVE_HISTORICAL_STOCK_DATA:
    debugger
      stockIds = Object.values(newState)
      stockIds.forEach(stock => {
        marriage[stock.id] = stock;
        marriage[stock.id].historicalData = action.stockData;
      }); 
      debugger
    default:
      return newState;
  }
};

export default stocksReducer;