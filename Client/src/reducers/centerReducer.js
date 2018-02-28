import { POPULATE_CENTERS, SET_CENTER_DETAILS } from '../constants/actionTypes';

const initialState = {
  centerList: [],
  centerDetails: []
};

const centerReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_CENTERS:
      return { centerDetails: [...state.centerDetails], centerList: action.payload };
      break;
    case SET_CENTER_DETAILS:
      return { centerList: [...state.centerList], centerDetails: [action.payload] };
      break;
    default:
      return state;
      break;
  }
}
export default centerReducer;