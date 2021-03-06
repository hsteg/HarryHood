export const signup = (user) => {
    return $.ajax({
        method: "POST", 
        url: "api/users",
        data: { user }
    });
}

export const login = (user) => {
    return $.ajax({
        method: "POST",
        url: "api/session",
        data: { user }
    });
}

export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: "api/session",
    });
}

export const getUserHeldStocks = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}/held_stocks`
  });
};

export const getUserCashBalance = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}/cash_balance`
  });
};

export const getUserPortfolioSnapshots = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}/portfolio_data`
  });
};