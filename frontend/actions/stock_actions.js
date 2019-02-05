import * as APIUtil from '../util/stock_api_util';
export const RECEIVE_FULL_STOCK_INFO = "RECEIVE_FULL_STOCK_INFO";
export const RECEIVE_DAY_STOCK_GROUP_PRICE_DATA = "RECEIVE_DAY_STOCK_GROUP_PRICE_DATA";
export const RECEIVE_USER_STOCKS = "RECEIVE_USER_STOCKS";
export const START_LOADING_FULL_STOCK_INFO = "START_LOADING_FULL_STOCK_INFO";
export const RECEIVE_USER_STOCK_OBJECT = "RECEIVE_USER_STOCK_OBJECT";
export const START_LOADING_HISTORICAL_STOCK_DATA = "START_LOADING_HISTORICAL_STOCK_DATA";
export const RECEIVE_HISTORICAL_STOCK_DATA = "RECEIVE_HISTORICAL_STOCK_DATA";
export const START_LOADING_DASHBOARD_STOCKS = "START_LOADING_DASHBOARD_STOCKS";
export const RECEIVE_STOCK_SEARCH_RESULTS = "RECEIVE_STOCK_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const RECEIVE_DASHBOARD_STOCKS = "RECEIVE_DASHBOARD_STOCKS";

export const getStockObjectBySymbol = (symbol) => dispatch => {
  dispatch(startLoadingFullStockInfo());
  return APIUtil.getStockObjectBySymbol(symbol).then(
    stockObject => {
      return dispatch(receiveStockObject(stockObject));
    }
  );
};

export const getHistoricalStockData = (symbol, period) => dispatch => {
  dispatch(startLoadingHistoricalStockData());
  return APIUtil.getHistoricalStockData(symbol, period).then(
    stockData => {
      return dispatch(receiveHistoricalStockData(stockData));
    }
  );
};

export const getUserStocks = (user) => dispatch => {
  dispatch(startLoadingDashboardStocks());
  return APIUtil.getUserStocks(user).then(
    stocks => {
      const symbols = Object.values(stocks).map(stock => stock.symbol).join(',');
      return APIUtil.getDayStocksPriceData(symbols).then(
        stockData => {
          return dispatch(receiveDashboardStocks(stocks, stockData));
        }
      )
      
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
  return APIUtil.getDayStocksPriceData(stocks).then(
    stocks => {
      return dispatch(receiveDayStockGroupPriceData(stocks));
    },
  );
};

export const getStockSearchResults = (search) => dispatch => {
  return APIUtil.getStockSearchResults(search).then(
    results => {
      return dispatch(receiveStockSearchResults(results));
    }
  )
};

export const clearUserSearchResults = () => dispatch => {
  return dispatch(clearSearchResults());
}

const receiveStockSearchResults = (searchResults) => {
  return {
    type: RECEIVE_STOCK_SEARCH_RESULTS, 
    searchResults
  };
};

export const receiveHistoricalStockData = (stockData) => {
  return {
    type: RECEIVE_HISTORICAL_STOCK_DATA,
    stockData
  };
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

export const startLoadingHistoricalStockData = () => {
  return {
    type: START_LOADING_HISTORICAL_STOCK_DATA,
  };
};

const startLoadingDashboardStocks = () => {
  return {
    type: START_LOADING_DASHBOARD_STOCKS,
  };
};

const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS,
  };
}

const receiveDashboardStocks = (stocks, stockData) => {
  return {
    type: RECEIVE_DASHBOARD_STOCKS, 
    stocks,
    stockData
  };
};