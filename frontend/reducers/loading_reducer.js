import {
  RECEIVE_FULL_STOCK_INFO,
  RECEIVE_DAY_STOCK_GROUP_PRICE_DATA,
  START_LOADING_FULL_STOCK_INFO,
  START_LOADING_HISTORICAL_STOCK_DATA,
  RECEIVE_HISTORICAL_STOCK_DATA,
  START_LOADING_USER_STOCKS
} from '../actions/stock_actions';

import { START_LOADING_USER_WATCHES, RECEIVE_USER_WATCHES } from '../actions/user_watch_actions';
import { START_LOADING_USER_TRANSACTIONS, RECEIVE_USER_TRANSACTIONS } from '../actions/transaction_actions';
import { RECEIVE_USER_HELD_STOCKS, START_LOADING_USER_HELD_STOCKS, RECEIVE_USER_PORTFOLIO_SNAPSHOTS, START_LOADING_USER_PORTFOLIO_SNAPSHOTS } from '../actions/session_actions';

const initialState = {
  stockDataLoading: false,
  userStocksLoading: false,
  historicalStockDataLoading: false,
  userWatchListLoading: false,
  userTransactionsLoading: false,
  userHeldStocksLoading: false,
  userPortfolioDataLoading: true
};


const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FULL_STOCK_INFO:
      return Object.assign({}, state, { stockDataLoading: false });
    case START_LOADING_FULL_STOCK_INFO:
      return Object.assign({}, state, { stockDataLoading: true });
    case START_LOADING_HISTORICAL_STOCK_DATA:
      return Object.assign({}, state, { historicalStockDataLoading: true })
    case RECEIVE_HISTORICAL_STOCK_DATA:
      return Object.assign({}, state, { historicalStockDataLoading: false })
    case START_LOADING_USER_WATCHES:
      return Object.assign({}, state, { userWatchListLoading: true })
    case RECEIVE_USER_WATCHES:
      return Object.assign({}, state, { userWatchListLoading: false })
    case START_LOADING_USER_TRANSACTIONS:
      return Object.assign({}, state, { userTransactionsLoading: true })
    case RECEIVE_USER_TRANSACTIONS:
      return Object.assign({}, state, { userTransactionsLoading: false })
    case START_LOADING_USER_HELD_STOCKS:
      return Object.assign({}, state, { userHeldStocksLoading: true })
    case RECEIVE_USER_HELD_STOCKS:
      return Object.assign({}, state, { userHeldStocksLoading: false })
    case START_LOADING_USER_STOCKS:
      return Object.assign({}, state, { userStocksLoading: true })
    case RECEIVE_DAY_STOCK_GROUP_PRICE_DATA:
      return Object.assign({}, state, { userStocksLoading: false })
    case START_LOADING_USER_PORTFOLIO_SNAPSHOTS:
      return Object.assign({}, state, { userPortfolioDataLoading: true })
    case RECEIVE_USER_PORTFOLIO_SNAPSHOTS:
      return Object.assign({}, state, { userPortfolioDataLoading: false })
    default:
      return state;
  }
};

export default loadingReducer;