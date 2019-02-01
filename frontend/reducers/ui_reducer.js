import { combineReducers } from 'redux';

import loading from './loading_reducer';
import searchResults from './search_reducer';


export default combineReducers({
  loading,
  searchResults, 
});