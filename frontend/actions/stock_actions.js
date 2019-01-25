import * as APIUtil from '../util/session_api_util';
export const RECEIVE_FULL_STOCK_INFO = "RECEIVE_FULL_STOCK_INFO";
export const RECEIVE_STOCK_GROUP_PRICE_DATA = "RECEIVE_STOCK_GROUP_PRICE_DATA";

export const getStockInfo = (stock) => dispatch => {
  return APIUtil.getStockInfo(stock).then(
    stock => {
      return dispatch(receiveFullStockInfo(stock));
    },
  );
};

export const getStocksPriceData = (stocks) => dispatch => {
  return APIUtil.getStocksPriceData(stocks).then(
    stocks => {
      return dispatch(receiveStockGroupPriceData(stocks));
    },
  );
};


const receiveFullStockInfo = (stock) => {
  return {
    type: RECEIVE_FULL_STOCK_INFO,
    stock
  };
};

const receiveStockGroupPriceData = (stocks) => {
  return {
    type: RECEIVE_STOCK_GROUP_PRICE_DATA,
    stocks
  };
};
