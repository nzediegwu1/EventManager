import { ADD_ACCOUNT_TYPE, SET_PROFILE_DETAILS } from '../constants/actionTypes';

const initialState = {
  accountType: localStorage.token ? JSON.parse(localStorage.token).accountType : 'regular',
  profileDetails: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_TYPE:
      return { profileDetails: [...state.profileDetails], accountType: action.payload };
    case SET_PROFILE_DETAILS:
      return { accountType: state.accountType, profileDetails: [action.payload] };
    default:
      return state;
  }
};
export default userReducer;
