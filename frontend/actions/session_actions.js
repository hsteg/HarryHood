export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS"
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"
export const RECEIVE_USER_HELD_STOCKS = "RECEIVE_USER_HELD_STOCKS";
export const START_LOADING_USER_HELD_STOCKS = "START_LOADING_USER_HELD_STOCKS";
export const RECEIVE_USER_CASH_BALANCE = "RECEIVE_USER_CASH_BALANCE";
export const START_LOADING_USER_PORTFOLIO_SNAPSHOTS = "START_LOADING_USER_PORTFOLIO_SNAPSHOTS";
export const RECEIVE_USER_PORTFOLIO_SNAPSHOTS = "RECEIVE_USER_PORTFOLIO_SNAPSHOTS";  

import * as APIUtil from '../util/session_api_util';


export const signup = (user) => dispatch => {
    return APIUtil.signup(user).then(
        user => {
            return dispatch(receiveCurrentUser(user));
        },
        errors => dispatch(receiveErrors(errors.responseJSON))
    );
};

export const login = (user) => dispatch => {
    return APIUtil.login(user).then(
        user => {
            return dispatch(receiveCurrentUser(user));
        },
        errors => dispatch(receiveErrors(errors.responseJSON))
    );
};

export const logout = () => dispatch => {
    return APIUtil.logout().then(
        () => {
            return dispatch(logoutCurrentUser());
        },
        errors => dispatch(receiveErrors(errors.responseJSON))
    );
};

export const getUserHeldStocks = (userId) => dispatch => {
  dispatch(startLoadingUserHeldStocks());
  return APIUtil.getUserHeldStocks(userId).then(
    heldStocks => {
      return dispatch(receiveUserHeldStocks(heldStocks));
    }
  );
};

export const getUserCashBalance = (userId) => dispatch => {
  return APIUtil.getUserCashBalance(userId).then(
    cashBalance => {
      return dispatch(receiveUserCashBalance(cashBalance));
    }
  );
};

export const getUserPortfolioSnapshots = (userId) = dispatch => {
  dispatch(startLoadingUserPortfolioSnapshots());
  return APIUtil.getUserPortfolioSnapshots(userId).then(
    snapshots => {
      return dispatch(receiveUserPortfolioSnapshots(snapshots));
    }
  );
};

const receiveCurrentUser = user => {
    return {
        type: RECEIVE_CURRENT_USER,
        user
    };
};

const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER,
    }
};

const receiveErrors = (errors) => {
    return {
        type: RECEIVE_SESSION_ERRORS,
        errors
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_SESSION_ERRORS,
    };
};

const receiveUserHeldStocks = (heldStocks) => {
  return {
    type: RECEIVE_USER_HELD_STOCKS,
    heldStocks
  };
}

const startLoadingUserHeldStocks = () => {
  return {
    type: START_LOADING_USER_HELD_STOCKS,
  };
};

const receiveUserCashBalance = (cashBalance) => {
  return {
    type: RECEIVE_USER_CASH_BALANCE,
    cashBalance
  }
}

const startLoadingUserPortfolioSnapshots = () => {
  return {
    type: START_LOADING_USER_PORTFOLIO_SNAPSHOTS,
  };
}

const receiveUserPortfolioSnapshots = (snapshots) => {
  return {
    type: RECEIVE_USER_PORTFOLIO_SNAPSHOTS,
    snapshots
  }
};