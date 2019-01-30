import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, RECEIVE_USER_HELD_STOCKS } from '../actions/session_actions';
import { merge } from 'lodash';


const _nullState = { id: null };

const sessionReducer = (state = _nullState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: action.user.id }
    case LOGOUT_CURRENT_USER:
      return _nullState;
    case RECEIVE_USER_HELD_STOCKS:
      let newState = merge(state, action.heldStocks)
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;