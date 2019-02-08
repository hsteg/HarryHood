import { RECEIVE_DASHBOARD_NEWS } from '../actions/stock_actions';

const newsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_DASHBOARD_NEWS:
      return action.news.articles;
    default:
      return state;
  }
}

export default newsReducer;