import {
  SET_PAGE,
  SET_MODAL_TITLE,
  SET_REQUIRED,
  SET_EVENT_DEFAULTS,
  SET_CENTER_DEFAULTS,
  SET_DATA_COUNT,
  SET_ACTIVE_PAGE,
  SET_RANDOM,
} from '../constants/actionTypes';

export const initialState = {
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

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        eventDefaults: state.eventDefaults,
        required: state.required,
        modalTitle: state.modalTitle,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        activePage: state.activePage,
        random: state.random,
        currentPage: action.payload,
      };
    case SET_MODAL_TITLE:
      return {
        eventDefaults: state.eventDefaults,
        required: state.required,
        currentPage: state.currentPage,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        activePage: state.activePage,
        random: state.random,
        modalTitle: action.payload,
      };
    case SET_REQUIRED:
      return {
        eventDefaults: state.eventDefaults,
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        activePage: state.activePage,
        random: state.random,
        required: action.payload,
      };
    case SET_EVENT_DEFAULTS:
      return {
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        required: state.required,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        activePage: state.activePage,
        random: state.random,
        eventDefaults: action.payload,
      };
    case SET_CENTER_DEFAULTS:
      return {
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        required: state.required,
        eventDefaults: state.eventDefaults,
        dataCount: state.dataCount,
        activePage: state.activePage,
        random: state.random,
        centerDefaults: action.payload,
      };
    case SET_DATA_COUNT:
      return {
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        required: state.required,
        eventDefaults: state.eventDefaults,
        centerDefaults: state.centerDefaults,
        activePage: state.activePage,
        random: state.random,
        dataCount: action.payload,
      };
    case SET_ACTIVE_PAGE:
      return {
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        required: state.required,
        eventDefaults: state.eventDefaults,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        random: state.random,
        activePage: action.payload,
      };
    case SET_RANDOM:
      return {
        currentPage: state.currentPage,
        modalTitle: state.modalTitle,
        required: state.required,
        eventDefaults: state.eventDefaults,
        centerDefaults: state.centerDefaults,
        dataCount: state.dataCount,
        activePage: state.activePage,
        random: action.payload,
      };

    default:
      return state;
  }
};
export default pageReducer;
