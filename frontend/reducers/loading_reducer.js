import {
  RECEIVE_FULL_STOCK_INFO,
  RECEIVE_DAY_STOCK_GROUP_PRICE_DATA,
  START_LOADING_FULL_STOCK_INFO,
  START_LOADING_DAY_STOCK_GROUP_PRICE_DATA,
} from '../actions/stock_actions';

const initialState = {
  stockDataLoading: false,
  userStocksLoading: false,
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FULL_STOCK_INFO:
      return Object.assign({}, state, { stockDataLoading: false });
    case START_LOADING_FULL_STOCK_INFO:
      return Object.assign({}, state, { stockDataLoading: true });
    case RECEIVE_DAY_STOCK_GROUP_PRICE_DATA:
      return Object.assign({}, state, { userStocksLoading: false });
    case START_LOADING_DAY_STOCK_GROUP_PRICE_DATA:
      return Object.assign({}, state, { detailLoading: true });
    default:
      return state;
  }
};

export default loadingReducer;