import { SET_SUBMIT_STATE } from '../constants/actionTypes';

const initialState = {
  disabled: false,
  visibility: 'none',
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBMIT_STATE:
      return {
        disabled: action.payload === 'initial' ? false : 'disabled',
        visibility: action.payload === 'initial' ? 'none' : true,
      };
    default:
      return state;
  }
};
export default formReducer;
