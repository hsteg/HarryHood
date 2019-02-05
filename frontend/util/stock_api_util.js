export const getStockInfo = (symbol) => {
  return $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,company,stats,chart&range=1d&chartInterval=5`,
  });
};

export const getDayStocksPriceData = (symbols) => {
  return $.ajax({ 
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote,chart&range=1d`,
  });
};

export const getHistoricalStockData = (symbol, period) => {
  return $.ajax({ 
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/${period}`,
  });
};

export const getStockSearchResults = (search) => {
  return $.ajax({
    method: "GET",
    url: `/api/stocks/search/${search}`
  });
};


export const getUserStocks = (user) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${user}`,
  }); 
};

export const getStockObjectBySymbol = (symbol) => {
  return $.ajax({
    method: "GET", 
    url: `/api/stocks/${symbol}`
  });
};