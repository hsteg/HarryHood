import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import stocksReducer from './stocks_reducer';
import transactionsReducer from './transactions_reducer';
import userWatchReducer from './user_watches_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stocksReducer,
    transactions: transactionsReducer,
    userWatches: userWatchReducer
});

export default entitiesReducer;