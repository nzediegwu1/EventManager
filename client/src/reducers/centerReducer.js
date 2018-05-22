import { POPULATE_CENTERS, SET_CENTER_DETAILS, GET_EVENT_CENTERS } from '../constants/actionTypes';

const initialState = {
  centerList: [],
  centerDetails: [],
  eventCenters: [],
};

const centerReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_CENTERS:
      return {
        centerDetails: [...state.centerDetails],
        eventCenters: [...state.eventCenters],
        centerList: action.payload,
      };
    case SET_CENTER_DETAILS:
      return {
        centerList: [...state.centerList],
        eventCenters: [...state.eventCenters],
        centerDetails: [action.payload],
      };
    case GET_EVENT_CENTERS:
      return {
        centerList: [...state.centerList],
        centerDetails: [...state.centerDetails],
        eventCenters: action.payload,
      };
    default:
      return state;
  }
};
export default centerReducer;
