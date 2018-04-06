import { POPULATE_CENTERS, SET_CENTER_DETAILS } from '../constants/actionTypes';

export const populateCenters = centerList => ({
  type: POPULATE_CENTERS,
  payload: centerList,
});
export const setCenterDetails = centerDetails => ({
  type: SET_CENTER_DETAILS,
  payload: centerDetails,
});
