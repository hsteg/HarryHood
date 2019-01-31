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

export const removeUserWatch = (watchId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/user_watches/${watchId}`
  });
};