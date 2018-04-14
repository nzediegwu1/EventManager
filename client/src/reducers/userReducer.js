import { ADD_ACCOUNT_TYPE, SET_PROFILE_DETAILS } from '../constants/actionTypes';

const initialState = {
  accountType: localStorage.token ? JSON.parse(localStorage.token).accountType : 'regular',
  profileData: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_TYPE:
      return { profileData: [...state.profileData], accountType: action.payload };
    case SET_PROFILE_DETAILS:
      return { accountType: state.accountType, profileData: [action.payload] };
    default:
      return state;
  }
};
export default userReducer;
