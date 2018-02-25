import { POPULATE_EVENTS, SET_EVENT_DETAIL, CHANGE_PAGE } from '../constants/actionTypes';

export const populateEvents = (eventList) => {
  return {
    type: POPULATE_EVENTS,
    payload: eventList,
  };
};
export const setEventDetail = (event) => {
  return {
    type: SET_EVENT_DETAIL,
    payload: event,
  };
};

export const changePage = page => {
  return {
    type: CHANGE_PAGE,
    payload: page
  }
}