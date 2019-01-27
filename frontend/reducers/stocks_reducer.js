import { RECEIVE_FULL_STOCK_INFO, 
        RECEIVE_DAY_STOCK_GROUP_PRICE_DATA,
        RECEIVE_USER_STOCKS } from '../actions/stock_actions';
import { merge } from 'lodash';

const stocksReducer = (state={}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_FULL_STOCK_INFO:
      newState[action.stock.quote.symbol] = action.stock;
      return newState;
    case RECEIVE_USER_STOCKS:
      return merge(newState, action.stocks);
    case RECEIVE_DAY_STOCK_GROUP_PRICE_DATA:
      let stockIds = Object.values(newState);
      let marriage = {};
      stockIds.forEach(stock => marriage[stock.id] = Object.assign(stock, action.stocks[stock.symbol]))
      return marriage;
    default:
      return newState;
  }
};

export default stocksReducer;