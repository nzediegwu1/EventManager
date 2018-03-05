import { SET_PAGE, SET_MODAL_TITLE, SET_REQUIRED, SET_EVENT_DEFAULTS, SET_CENTER_DEFAULTS } from '../constants/actionTypes';

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
    }
  },
  centerDefaults: {
    name: null,
    address: null,
    location: null,
    capacity: null,
    price: null,
    availability: ''
  }
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return { eventDefaults: state.eventDefaults, required: state.required, modalTitle: state.modalTitle, centerDefaults: state.centerDefaults, currentPage: action.payload };
      break;
    case SET_MODAL_TITLE:
      return { eventDefaults: state.eventDefaults, required: state.required, currentPage: state.currentPage, centerDefaults: state.centerDefaults, modalTitle: action.payload };
      break;
    case SET_REQUIRED:
      return { eventDefaults: state.eventDefaults, currentPage: state.currentPage, modalTitle: state.modalTitle, centerDefaults: state.centerDefaults, required: action.payload };
      break;
    case SET_EVENT_DEFAULTS:
      return { currentPage: state.currentPage, modalTitle: state.modalTitle, required: state.required, centerDefaults: state.centerDefaults, eventDefaults: action.payload };
      break;
    case SET_CENTER_DEFAULTS:
      return { currentPage: state.currentPage, modalTitle: state.modalTitle, required: state.required, eventDefaults: state.eventDefaults, centerDefaults: action.payload };
      break;
    default:
      return state;
      break;
  }
}
export default pageReducer;