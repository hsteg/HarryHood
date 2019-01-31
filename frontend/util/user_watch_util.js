export const getUserWatches = (user) => {
  return $.ajax({
    method: "GET",
    url: `/api/user_watches/${user}`
  });
};

export const createUserWatch = (user, stock) => {
  return $.ajax({
    method: "POST",
    url: `/api/user_watches/${user}/${stock}`
  });
};