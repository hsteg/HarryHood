import * as APIUtil from '../util/transaction_api_util';
export const RECEIVE_USER_TRANSACTIONS = "RECEIVE_USER_TRANSACTIONS";
export const START_LOADING_USER_TRANSACTIONS = "START_LOADING_USER_TRANSACTIONS";


export const getUserTransactions = (user) => dispatch => {
  dispatch(startLoadingUserTransactions());
  return APIUtil.getUserTransactions(user).then(
    transactions => {
      return dispatch(receiveUserTransactions(transactions));
    }
  );
};

export const createUserTransaction = (data) => dispatch => {
  return APIUtil.createUserTransaction(data).then(
    transactions => {
      return dispatch(receiveUserTransactions(transactions));
    }
  );
};

const receiveUserTransactions = (transactions) => {
  return {
    type: RECEIVE_USER_TRANSACTIONS,
    transactions
  };
};

const startLoadingUserTransactions = () => {
  return {
    type: START_LOADING_USER_TRANSACTIONS
  };
};