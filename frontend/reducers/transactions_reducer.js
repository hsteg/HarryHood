import { RECEIVE_USER_TRANSACTIONS } from '../actions/transaction_actions';
import { merge } from 'lodash';

const transactionsReducer = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER_TRANSACTIONS:
      let newState = merge({}, state, action.transactions);
      return newState;
    default:
      return state;
  }
};

export default transactionsReducer;