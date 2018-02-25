import { POPULATE_EVENTS, SET_EVENT_DETAIL, CHANGE_PAGE } from '../../constants/actionTypes';

const initialState = {
  eventList: [],
  event: [],
  currentPage: 'dashboard'
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_EVENTS:
      return { event: [...state.event], eventList: action.payload };
      break;
    case SET_EVENT_DETAIL:
      return { eventList: [...state.eventList], event: [action.payload] };
      break;
    case CHANGE_PAGE:
      return { eventList: [...state.eventList], event: [...state.event], currentPage: action.payload };
      break;
    default:
      return state;
      break;
  }
}
export default eventReducer;