import { POPULATE_EVENTS, SET_EVENT_DETAIL } from '../../constants/actionTypes';

const initialState = {
  eventList: [],
  event: []
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_EVENTS:
      return { event: [...state.event], eventList: action.payload };
      break;
    case SET_EVENT_DETAIL:
      return { eventList: [...state.eventList], event: [action.payload] };
      break;
    default:
      return state;
      break;
  }
}
export default eventReducer;