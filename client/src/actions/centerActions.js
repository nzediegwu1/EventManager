import { POPULATE_CENTERS, SET_CENTER_DETAILS, GET_EVENT_CENTERS } from '../constants/actionTypes';

export const populateCenters = centerList => ({
  type: POPULATE_CENTERS,
  payload: centerList,
});
export const setCenterDetails = centerDetails => ({
  type: SET_CENTER_DETAILS,
  payload: centerDetails,
});
export const getEventCenters = centers => ({
  type: GET_EVENT_CENTERS,
  payload: centers,
});
