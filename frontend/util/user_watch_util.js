export const getUserWatches = (user) => {
  return $.ajax({
    method: "GET",
    url: `/api/user_watches/${user}`
  });
};