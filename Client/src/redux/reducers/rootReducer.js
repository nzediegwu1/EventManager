import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({ 
    events: eventReducer,
    accountType: userReducer
});

export default rootReducer;