import { RECEIVE_FULL_STOCK_INFO, 
        RECEIVE_DAY_STOCK_GROUP_PRICE_DATA,
        RECEIVE_USER_STOCKS,
        RECEIVE_USER_STOCK_OBJECT } from '../actions/stock_actions';
import { merge } from 'lodash';

const stocksReducer = (state={}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  let marriage = {};
  switch(action.type) {
    case RECEIVE_FULL_STOCK_INFO:
      let stockId = Object.values(newState);
      stockId.forEach(stock => marriage[stock.id] = Object.assign(stock, action.stock));
      return marriage;
    case RECEIVE_USER_STOCKS:
      return merge(newState, action.stocks);
    case RECEIVE_DAY_STOCK_GROUP_PRICE_DATA:
      let stockIds = Object.values(newState);
      stockIds.forEach(stock => marriage[stock.id] = Object.assign(stock, action.stocks[stock.symbol]))
      return marriage;
    case RECEIVE_USER_STOCK_OBJECT:
      return merge(newState, action.stockObject);
    default:
      return newState;
  }
};

export default stocksReducer;