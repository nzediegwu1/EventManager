import { SET_PAGE } from '../constants/actionTypes';

export const setPage = page => {
    return {
      type: SET_PAGE,
      payload: page
    }
  }