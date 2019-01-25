import * as APIUtil from '../util/transaction_api_util';
export const RECEIVE_USER_TRANSACTIONS = "RECEIVE_USER_TRANSACTIONS";

export const getUserTransactions = (user) => dispatch => {
  return APIUtil.getUserTransactions(user).then(
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