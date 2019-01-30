export const getUserTransactions = (user) => {
  return $.ajax({
    method: "GET",
    url: `/api/transactions/${user}`
  });
};

export const createUserTransacation = (data) => {
  return $.ajax({
    method: "POST",
    url: '/api/transactions',
    data: {data}
  });
};