import { POPULATE_CENTERS, SET_CENTER_DETAILS } from '../constants/actionTypes';

export const populateCenters = (centerList) => {
  return {
    type: POPULATE_CENTERS,
    payload: centerList,
  };
};
export const setCenterDetails = (centerDetails) => {
  return {
    type: SET_CENTER_DETAILS,
    payload: centerDetails
  }
}