import * as APIUtil from '../util/transaction_api_util';
export const RECEIVE_USER_TRANSACTIONS = "RECEIVE_USER_TRANSACTIONS";
import {startLoadingDayStockGroupPriceData } from './stock_actions';

export const getUserTransactions = (user) => dispatch => {
  dispatch(startLoadingDayStockGroupPriceData());
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