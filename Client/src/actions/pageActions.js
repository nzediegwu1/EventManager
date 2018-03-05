import { SET_PAGE, SET_MODAL_TITLE, SET_REQUIRED, SET_EVENT_DEFAULTS, SET_CENTER_DEFAULTS } from '../constants/actionTypes';

export const setPage = page => {
  return {
    type: SET_PAGE,
    payload: page
  };
};
export const setModalTitle = title => {
  return {
    type: SET_MODAL_TITLE,
    payload: title
  };
};
export const setRequired = value => {
  return {
    type: SET_REQUIRED,
    payload: value
  };
};
export const setEventDefaults = data => {
  return {
    type: SET_EVENT_DEFAULTS,
    payload: data
  };
};
export const setCenterDefaults = data => {
  return {
    type: SET_CENTER_DEFAULTS,
    payload: data
  }
}