import { POPULATE_FACILITIES, SET_UNDELETED } from '../constants/actionTypes';

export const populateFacilities = facilities => ({
  type: POPULATE_FACILITIES,
  payload: facilities,
});

export const setUndeletedFacilities = data => ({
  type: SET_UNDELETED,
  payload: data,
});
