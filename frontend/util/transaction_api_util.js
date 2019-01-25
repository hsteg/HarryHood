export const getUserTransactions = (user) => {
  return $.ajax({
    method: "GET",
    url: `/api/transactions/${user}`
  });
};