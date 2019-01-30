import { RECEIVE_CURRENT_USER, RECEIVE_USER_CASH_BALANCE } from '../actions/session_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_USER_CASH_BALANCE:
      newState[action.cashBalance.id].cash_balance = action.cashBalance.cash_balance;
      return newState;
    default:
      return newState;
  }
}

export default usersReducer;