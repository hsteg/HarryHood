export const getStockDayChartAndInfo = (symbols) => {
  return $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote,company,stats,chart&range=1d`

  });
};

// export const getDayStocksPriceData = (symbols) => {
//   return $.ajax({ 
//     method: "GET",
//     url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote,chart&range=1d`,
//   });
// };

// export const getHistoricalStockData = (symbol, period) => {
//   return $.ajax({ 
//     method: "GET",
//     url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/${period}`,
//   });
// };

export const getHistoricalStockData = (symbols) => {
  return $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=chart&range=5y`
  });
};

export const getStockNews = (name) => {
  const date = new Date;
  const lastMonthRaw = new Date(date.getTime() - (60*60*24*30*1000));
  const sources = "financial-post,financial-times,the-wall-street-journal,bloomberg,business-insider,cnbc,fortune,the-economist,the-washington-post,associated-press";

  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const lastMonth = `${lastMonthRaw.getFullYear()}-${lastMonthRaw.getMonth() + 1}-${lastMonthRaw.getDate()}`;
  return $.ajax({
    method: "GET",
    url: `https://newsapi.org/v2/everything?q=${name}&language=en&from=${lastMonth}&to=${today}&sortBy=popular&pageSize=10&apiKey=9345391bfd414fef81f23c2939844ad5&sources=${sources}`
  })
}

export const getDashboardNews = (stocks) => {
  const date = new Date;
  const twoDaysAgoRaw = new Date(date.getTime() - (60*60*24*2*1000));
  const sources = "financial-post,financial-times,the-wall-street-journal,bloomberg,cnbc,fortune,the-economist";
  const twoDaysAgo = `${twoDaysAgoRaw.getFullYear()}-${twoDaysAgoRaw.getMonth() + 1}-${twoDaysAgoRaw.getDate()}`;
  
  return $.ajax({
    method: "GET",
    url: `https://newsapi.org/v2/everything?q=%28${stocks}%29&language=en&from=${twoDaysAgo}&sortBy=publishedAt&pageSize=10&apiKey=9345391bfd414fef81f23c2939844ad5&sources=${sources}`
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