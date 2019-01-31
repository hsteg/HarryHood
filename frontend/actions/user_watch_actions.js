import * as APIUtil from '../util/user_watch_util';
export const RECEIVE_USER_WATCHES = "RECEIVE_USER_WATCHES";
export const START_LOADING_USER_WATCHES = "START_LOADING_USER_WATCHES";

export const getUserWatches = (user) => dispatch => {
  dispatch(startLoadingUserWatches());
  return APIUtil.getUserWatches(user).then(
    watches => {
      return dispatch(receiveUserWatches(watches));
    }
  );
};

export const createUserWatch = (user, stock) => dispatch => {
  return APIUtil.createUserWatch(user, stock).then(
    watches => {
      dispatch(startLoadingUserWatches());
      return dispatch(receiveUserWatches(watches))
    }
  );
};

const receiveUserWatches = (watches) => {
  return {
    type: RECEIVE_USER_WATCHES,
    watches
  };
};

const startLoadingUserWatches = () => {
  return {
    type: START_LOADING_USER_WATCHES
  };
};
