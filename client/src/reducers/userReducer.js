import { ADD_ACCOUNT_TYPE, SET_PROFILE_DETAILS, POPULATE_USERLIST } from '../constants/actionTypes';

const initialState = {
  accountType: localStorage.token ? JSON.parse(localStorage.token).accountType : 'regular',
  profileDetails: [],
  userList: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_TYPE:
      return {
        profileDetails: [...state.profileDetails],
        userList: [...state.userList],
        accountType: action.payload,
      };
    case SET_PROFILE_DETAILS:
      return {
        accountType: state.accountType,
        userList: [...state.userList],
        profileDetails: [action.payload],
      };
    case POPULATE_USERLIST:
      return {
        accountType: state.accountType,
        profileDetails: [...state.profileDetails],
        userList: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
