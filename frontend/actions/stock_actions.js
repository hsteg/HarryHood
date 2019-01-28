import * as APIUtil from '../util/stock_api_util';
export const RECEIVE_FULL_STOCK_INFO = "RECEIVE_FULL_STOCK_INFO";
export const RECEIVE_DAY_STOCK_GROUP_PRICE_DATA = "RECEIVE_DAY_STOCK_GROUP_PRICE_DATA";
export const RECEIVE_USER_STOCKS = "RECEIVE_USER_STOCKS";
export const START_LOADING_FULL_STOCK_INFO = "START_LOADING_FULL_STOCK_INFO";
export const START_LOADING_DAY_STOCK_GROUP_PRICE_DATA = "START_LOADING_DAY_STOCK_GROUP_PRICE_DATA";
export const RECEIVE_USER_STOCK_OBJECT = "RECEIVE_USER_STOCK_OBJECT";

export const getStockObjectBySymbol = (symbol) => dispatch => {
  return APIUtil.getStockObjectBySymbol(symbol).then(
    stockObject => {
      return dispatch(receiveStockObject(stockObject));
    }
  );
};

export const getUserStocks = (user) => dispatch => {
  return APIUtil.getUserStocks(user).then(
    stocks => {
      return dispatch(receiveUserStocks(stocks));
    }
  );
};

export const getStockInfo = (stock) => dispatch => {
  dispatch(startLoadingFullStockInfo());
  return APIUtil.getStockInfo(stock).then(
    stock => {
      return dispatch(receiveFullStockInfo(stock));
    },
  );
};

export const getDayStocksPriceData = (stocks) => dispatch => {
  dispatch(startLoadingDayStockGroupPriceData());
  return APIUtil.getDayStocksPriceData(stocks).then(
    stocks => {
  
      return dispatch(receiveDayStockGroupPriceData(stocks));
    },
  );
};


const receiveFullStockInfo = (stock) => {
  return {
    type: RECEIVE_FULL_STOCK_INFO,
    stock
  };
};

const receiveDayStockGroupPriceData = (stocks) => {
  return {
    type: RECEIVE_DAY_STOCK_GROUP_PRICE_DATA,
    stocks
  };
};

const receiveUserStocks = (stocks) => {
  return {
    type: RECEIVE_USER_STOCKS,
    stocks
  };
}

export const startLoadingDayStockGroupPriceData = () => {
  return {
    type: START_LOADING_DAY_STOCK_GROUP_PRICE_DATA,
  };
};

export const startLoadingFullStockInfo = () => {
  return {
    type: START_LOADING_FULL_STOCK_INFO,
  };
};

const receiveStockObject = (stockObject) => {
  return {
    type: RECEIVE_USER_STOCK_OBJECT,
    stockObject
  };
};