import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import eventReducer from './eventReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({ 
    articles: articleReducer,
    events: eventReducer,
    accountType: userReducer
});

export default rootReducer;