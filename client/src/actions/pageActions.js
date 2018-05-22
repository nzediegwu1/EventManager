import {
  SET_PAGE,
  SET_MODAL_TITLE,
  SET_REQUIRED,
  SET_EVENT_DEFAULTS,
  SET_CENTER_DEFAULTS,
  SET_DATA_COUNT,
} from '../constants/actionTypes';

export const setPage = page => ({
  type: SET_PAGE,
  payload: page,
});
export const setModalTitle = title => ({
  type: SET_MODAL_TITLE,
  payload: title,
});
export const setRequired = value => ({
  type: SET_REQUIRED,
  payload: value,
});
export const setEventDefaults = data => ({
  type: SET_EVENT_DEFAULTS,
  payload: data,
});
export const setCenterDefaults = data => ({
  type: SET_CENTER_DEFAULTS,
  payload: data,
});
export const setDataCount = data => ({
  type: SET_DATA_COUNT,
  payload: data,
});
