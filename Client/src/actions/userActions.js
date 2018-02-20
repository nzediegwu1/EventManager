import { ADD_ACCOUNT_TYPE } from '../constants/actionTypes'

export const setAccountType = (accountType) => {
    return {
        type: ADD_ACCOUNT_TYPE,
        payload: accountType,
    };
};