import { combineReducers } from 'redux';

import searchResults from './search_reducer';
import news from './dashboard_news_reducer';
import loading from './loading_reducer';


export default combineReducers({
  news,
  searchResults,
  loading,
});