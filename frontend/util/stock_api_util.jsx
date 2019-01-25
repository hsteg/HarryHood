export const getStockInfo = (stock) => {
  return $.ajax({
    method: "GET",
    URL: "",
    data: {stock}
  });
};

export const getStocksPriceData = (stocks) => {

};