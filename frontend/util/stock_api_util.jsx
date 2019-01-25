export const getStockInfo = (location) => {
  let url = `https://api.iextrading.com/1.0/stock/${location}/stats/`;

  const req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.status === 200 && req.readyState === XMLHttpRequest.DONE) {
      const data = JSON.parse(req.responseText);
      console.log(data);
    }
  };

  req.open('GET', url, true);
  req.send();
}

