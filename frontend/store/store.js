import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

let middleware;

if (process.env.NODE_ENV === 'development') {
  middleware = [thunk, logger];
} else {
  middlware = [thunk];
}

const configureStore = (preloadedState =  {}) => {
    return createStore(rootReducer, preloadedState, applyMiddleware(...middleware));
};

export default configureStore;