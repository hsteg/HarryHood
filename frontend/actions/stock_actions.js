import * as APIUtil from '../util/stock_api_util';
export const RECEIVE_FULL_STOCK_INFO = "RECEIVE_FULL_STOCK_INFO";
export const RECEIVE_DAY_STOCK_GROUP_PRICE_DATA = "RECEIVE_DAY_STOCK_GROUP_PRICE_DATA";

export const getStockInfo = (stock) => dispatch => {
  return APIUtil.getStockInfo(stock).then(
    stock => {
      return dispatch(receiveFullStockInfo(stock));
    },
  );
};

export const getDayStocksPriceData = (stocks) => dispatch => {
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
