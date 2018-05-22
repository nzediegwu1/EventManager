import {
  SET_PAGE,
  SET_MODAL_TITLE,
  SET_REQUIRED,
  SET_EVENT_DEFAULTS,
  SET_CENTER_DEFAULTS,
  SET_DATA_COUNT,
} from '../constants/actionTypes';

export const initialState = {
  currentPage: 'dashboard',
  modalTitle: '',
  required: true,
  eventDefaults: {
    title: null,
    date: undefined,
    description: null,
    center: {
      id: '',
    },
  },
  centerDefaults: {
    name: null,
    address: null,
    location: null,
    capacity: null,
    price: null,
    availability: '',
  },
  dataCount: 1,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        eventDefaults: state.eventDefaults,
        required: state.required,
        modalTitle: state.modalTitle,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        currentPage: action.payload,
      };
    case SET_MODAL_TITLE:
      return {
        eventDefaults: state.eventDefaults,
        required: state.required,
        currentPage: state.currentPage,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        modalTitle: action.payload,
      };
    case SET_REQUIRED:
      return {
        eventDefaults: state.eventDefaults,
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        required: action.payload,
      };
    case SET_EVENT_DEFAULTS:
      return {
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        required: state.required,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        eventDefaults: action.payload,
      };
    case SET_CENTER_DEFAULTS:
      return {
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        required: state.required,
        eventDefaults: state.eventDefaults,
        dataCount: state.dataCount,
        centerDefaults: action.payload,
      };
    case SET_DATA_COUNT:
      return {
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        required: state.required,
        eventDefaults: state.eventDefaults,
        centerDefaults: state.centerDefaults,
        dataCount: action.payload,
      };
    default:
      return state;
  }
};
export default pageReducer;
