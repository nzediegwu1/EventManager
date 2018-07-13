/* global expect afterEach beforeEach describe it */
import reducer from '../../src/reducers/pageReducer';
import * as types from '../../src/constants/actionTypes';
import pageData from '../mocks/page';
const initialState = {
  currentPage: 'dashboard',
  modalTitle: '',
  required: true,
  eventDefaults: {
    title: null,
    date: undefined,
    picture: null,
    description: null,
    centerId: '',
    center: {
      id: '',
    },
  },
  centerDefaults: {
    name: null,
    address: null,
    location: null,
    capacity: null,
    picture: null,
    price: null,
    availability: '',
  },
  dataCount: 1,
  activePage: 1,
  random: 0,
};
const newCurrentPage = () => {
  initialState.currentPage = pageData.currentPage;
  return initialState;
};
const newModalTitle = () => {
  initialState.modalTitle = pageData.modalTitle;
  return initialState;
};
const newRequired = () => {
  initialState.required = pageData.required;
  return initialState;
};
const newEventDefaults = () => {
  initialState.eventDefaults = pageData.eventDefaults;
  return initialState;
};
const newCenterDefaults = () => {
  initialState.centerDefaults = pageData.centerDefaults;
  return initialState;
};
const newDataCount = () => {
  initialState.dataCount = pageData.dataCount;
  return initialState;
};
const newActivePage = () => {
  initialState.activePage = pageData.activePage;
  return initialState;
};
const newRandom = () => {
  initialState.random = pageData.random;
  return initialState;
};

describe('Tests for page reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle SET_PAGE', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PAGE,
        payload: pageData.currentPage,
      })
    ).toEqual(newCurrentPage());
  });
  it('should handle SET_PAGE', () => {
    expect(
      reducer(initialState, {
        type: types.SET_MODAL_TITLE,
        payload: pageData.modalTitle,
      })
    ).toEqual(newModalTitle());
  });
  it('should handle SET_REQUIRED', () => {
    expect(
      reducer(initialState, {
        type: types.SET_REQUIRED,
        payload: pageData.required,
      })
    ).toEqual(newRequired());
  });
  it('should handle SET_EVENT_DEFAULTS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_EVENT_DEFAULTS,
        payload: pageData.eventDefaults,
      })
    ).toEqual(newEventDefaults());
  });
  it('should handle SET_CENTER_DEFAULTS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CENTER_DEFAULTS,
        payload: pageData.centerDefaults,
      })
    ).toEqual(newCenterDefaults());
  });
  it('should handle SET_DATA_COUNT', () => {
    expect(
      reducer(initialState, {
        type: types.SET_DATA_COUNT,
        payload: pageData.dataCount,
      })
    ).toEqual(newDataCount());
  });
  it('should handle SET_ACTIVE_PAGE', () => {
    expect(
      reducer(initialState, {
        type: types.SET_ACTIVE_PAGE,
        payload: pageData.activePage,
      })
    ).toEqual(newActivePage());
  });
  it('should handle SET_RANDOM', () => {
    expect(
      reducer(initialState, {
        type: types.SET_RANDOM,
        payload: pageData.random,
      })
    ).toEqual(newRandom());
  });
});
