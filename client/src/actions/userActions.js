import { ADD_ACCOUNT_TYPE, SET_PROFILE_DETAILS } from '../constants/actionTypes';

export const setAccountType = accountType => ({
  type: ADD_ACCOUNT_TYPE,
  payload: accountType,
});

export const setProfileDetails = data => ({
  type: SET_PROFILE_DETAILS,
  payload: data,
});
