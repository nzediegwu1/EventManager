import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import centerReducer from './centerReducer';
import facilityReducer from './facilityReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  users: userReducer,
  page: pageReducer,
  centers: centerReducer,
  facilities: facilityReducer,
});

export default rootReducer;
