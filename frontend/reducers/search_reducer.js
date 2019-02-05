import { RECEIVE_STOCK_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS } from '../actions/stock_actions';

const searchReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_STOCK_SEARCH_RESULTS:
      return action.searchResults;
    case CLEAR_SEARCH_RESULTS:
      return {};
    default:
      return state;
  }
};


export default searchReducer;