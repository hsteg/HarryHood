import { RECEIVE_FULL_STOCK_INFO, 
        RECEIVE_STOCK_GROUP_PRICE_DATA } from '../actions/stock_actions';
import { merge } from 'lodash';

const stocksReducer = (state={}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_FULL_STOCK_INFO:
      newState[action.stock.quote.symbol] = action.stock;
      return newState;
    default:
      return newState;
  }
};

export default stocksReducer;