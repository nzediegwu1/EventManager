import { POPULATE_CENTERS, SET_CENTER_DETAILS } from '../constants/actionTypes';

const initialState = {
  centerList: [],
  centerDetails: [],
};

const centerReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_CENTERS:
      return { centerDetails: [...state.centerDetails], centerList: action.payload };
    case SET_CENTER_DETAILS:
      return { centerList: [...state.centerList], centerDetails: [action.payload] };
    default:
      return state;
  }
};
export default centerReducer;
