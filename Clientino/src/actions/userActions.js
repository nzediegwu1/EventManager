import { ADD_ACCOUNT_TYPE } from '../constants/actionTypes';

export const setAccountType = accountType => ({
  type: ADD_ACCOUNT_TYPE,
  payload: accountType,
});
