import * as APIUtil from '../util/stock_api_util';
export const RECEIVE_INDIVIDUAL_STOCK_DAY_INFO = "RECEIVE_INDIVIDUAL_STOCK_DAY_INFO";
export const START_LOADING_FULL_STOCK_INFO = "START_LOADING_FULL_STOCK_INFO";
export const RECEIVE_USER_STOCK_OBJECT = "RECEIVE_USER_STOCK_OBJECT";
export const START_LOADING_HISTORICAL_STOCK_DATA = "START_LOADING_HISTORICAL_STOCK_DATA";
export const RECEIVE_HISTORICAL_STOCK_DATA = "RECEIVE_HISTORICAL_STOCK_DATA";
export const START_LOADING_DASHBOARD_STOCKS = "START_LOADING_DASHBOARD_STOCKS";
export const RECEIVE_STOCK_SEARCH_RESULTS = "RECEIVE_STOCK_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const RECEIVE_DASHBOARD_STOCKS = "RECEIVE_DASHBOARD_STOCKS";
export const RECEIVE_STOCK_NEWS = "RECEIVE_STOCK_NEWS";
export const START_LOADING_STOCK_NEWS = "START_LOADING_STOCK_NEWS";
export const START_LOADING_DASHBOARD_NEWS = "START_LOADING_DASHBOARD_NEWS";
export const RECEIVE_DASHBOARD_NEWS = "RECEIVE_DASHBOARD_NEWS";
export const RECEIVE_DASHBOARD_CHART_DATA = "RECEIVE_DASHBOARD_CHART_DATA";
export const START_LOADING_DASHBOARD_CHART_DATA = "START_LOADING_DASHBOARD_CHART_DATA";
export const FINISH_LOADING_DASHBOARD_CHART_DATA = "FINISH_LOADING_DASHBOARD_CHART_DATA";

export const getStockObjectBySymbol = (symbol) => dispatch => {
  return APIUtil.getStockObjectBySymbol(symbol).then(
    stockObject => {
      APIUtil.getStockDayChartAndInfo(symbol).then(
        stockData => {
          dispatch(receiveIndividualStockDayInfo(stockObject, stockData));
        }
      )
    }
  );
};

export const getHistoricalStockData = (symbols) => dispatch => {
  return APIUtil.getHistoricalStockData(symbols).then(
    stockData => {
      dispatch(receiveHistoricalStockData(stockData));
    }
  );
};

export const getUserStocks = (user) => dispatch => {
  dispatch(startLoadingDashboardStocks());
  return APIUtil.getUserStocks(user).then(
    stocks => {
      const symbols = Object.values(stocks).map(stock => stock.symbol).join(',');
      return APIUtil.getStockDayChartAndInfo(symbols).then(
        stockData => {
          return dispatch(receiveDashboardStocks(stocks, stockData));
        }
      )
    }
  );
};

export const getStockDayChartAndInfo = (symbols) => dispatch => {
  dispatch(startLoadingFullStockInfo());
  return APIUtil.getStockDayChartAndInfo(symbols).then(
    stock => {
      return dispatch(receiveFullStockInfo(stock));
    },
  );
};

export const getStockNews = (name, symbol) => dispatch => {
  dispatch(startLoadingStockNews());
  return APIUtil.getStockNews(name).then(
    news => {
      return dispatch(receiveStockNews(news, symbol));
    }
  );
};

export const getDashboardNews = (stocks) => dispatch => {
  dispatch(startLoadingDashboardNews());
  return APIUtil.getDashboardNews(stocks).then(
    news => {
      return dispatch(receiveDashboardNews(news));
    }
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

const receiveIndividualStockDayInfo = (stockObject, stockData) => {
  return {
    type: RECEIVE_INDIVIDUAL_STOCK_DAY_INFO,
    stockObject,
    stockData
  };
};

export const startLoadingFullStockInfo = () => {
  return {
    type: START_LOADING_FULL_STOCK_INFO,
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

const receiveStockNews = (news, symbol) => {
  return {
    type: RECEIVE_STOCK_NEWS,
    news, 
    symbol
  };
};

const startLoadingStockNews = () => {
  return {
    type: START_LOADING_STOCK_NEWS,
  };
};

const startLoadingDashboardNews = () => {
  return {
    type: START_LOADING_DASHBOARD_NEWS,
  };
};

const receiveDashboardNews = (news) => {
  return {
    type: RECEIVE_DASHBOARD_NEWS,
    news
  };
};

export const finishLoadingDashboardChartData = () => {
  return {
    type: FINISH_LOADING_DASHBOARD_CHART_DATA,
  };
};
