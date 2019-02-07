export const getStockInfo = (symbol) => {
  return $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,company,stats,chart,news&range=1d&chartInterval=5`,
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

export const getStockNews = (symbol) => {
  const date = new Date;
  const lastMonthRaw = new Date(date.getTime() - (60*60*24*30*1000));

  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const lastMonth = `${lastMonthRaw.getFullYear()}-${lastMonthRaw.getMonth() + 1}-${lastMonthRaw.getDate()}`;
  return $.ajax({
    method: "GET",
    url: `https://newsapi.org/v2/everything?q=${symbol}&language=en&from=${lastMonth}&to=${today}&sortBy=publishedAt&pageSize=10&apiKey=9345391bfd414fef81f23c2939844ad5`
  })
}

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