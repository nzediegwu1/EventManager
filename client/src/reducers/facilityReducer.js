import { POPULATE_FACILITIES, SET_UNDELETED } from '../constants/actionTypes';

const initialState = {
  facilities: [],
  undeleted: [],
};

const facilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_FACILITIES:
      return { undeleted: [...state.undeleted], facilities: action.payload };
    case SET_UNDELETED:
      return { facilities: [...state.facilities], undeleted: action.payload };
    default:
      return state;
  }
};
export default facilityReducer;
