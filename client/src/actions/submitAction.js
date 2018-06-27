import { SET_SUBMIT_STATE } from '../constants/actionTypes';

export const setSubmitState = submitState => ({
  type: SET_SUBMIT_STATE,
  payload: submitState,
});
