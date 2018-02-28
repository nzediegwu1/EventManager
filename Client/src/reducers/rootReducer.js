import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import centerReducer from './centerReducer';

const rootReducer = combineReducers({
    events: eventReducer,
    accountType: userReducer,
    page: pageReducer,
    centers: centerReducer
});

export default rootReducer;