import { combineReducers } from 'redux';

import loading from './loading_reducer';
import searchResults from './search_reducer';
import news from './dashboard_news_reducer';


export default combineReducers({
  loading,
  searchResults,
  news,
});