import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import centerReducer from './centerReducer';
import facilityReducer from './facilityReducer';
import formReducer from './formReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  users: userReducer,
  page: pageReducer,
  centers: centerReducer,
  facilities: facilityReducer,
  process: formReducer,
});

export default rootReducer;
