import { RECEIVE_USER_WATCHES } from '../actions/user_watch_actions';
import { merge } from 'lodash';

const userWatchReducer = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER_WATCHES:
      return action.watches;
    default:
      return state;
  }
};

export default userWatchReducer;