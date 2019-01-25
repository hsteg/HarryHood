export const getStockInfo = (symbol) => {
  return $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,company,stats,chart&range=1d&chartInterval=5`,
  });
};

export const getStocksPriceData = (symbols) => {
  return $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote,chart&range=1d`,
  });
};

export const getUserStocks = (stocks) => {
  return $.ajax({
    method: "GET",
    url: '/api/stocks/',
    data: { stocks }
  }); 
};