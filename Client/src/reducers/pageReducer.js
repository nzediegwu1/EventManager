import { SET_PAGE } from '../constants/actionTypes';

const initialState = {
  currentPage: 'dashboard'
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return { currentPage: action.payload };
      break;
    default:
      return state;
      break;
  }
}
export default pageReducer;