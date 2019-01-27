import * as APIUtil from '../util/user_watch_util';
export const RECEIVE_USER_WATCHES = "RECEIVE_USER_WATCHES";
import {startLoadingDayStockGroupPriceData } from './stock_actions';

export const getUserWatches = (user) => dispatch => {
  dispatch(startLoadingDayStockGroupPriceData());
  return APIUtil.getUserWatches(user).then(
    watches => {
  
      return dispatch(receiveUserWatches(watches));
    }
  );
};

const receiveUserWatches = (watches) => {
  return {
    type: RECEIVE_USER_WATCHES,
    watches
  }
}