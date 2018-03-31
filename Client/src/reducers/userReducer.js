import { ADD_ACCOUNT_TYPE } from '../constants/actionTypes';

const initialState = {
  accountType: localStorage.token ? JSON.parse(localStorage.token).accountType : 'regular',
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_TYPE:
      return { accountType: action.payload };
    default:
      return state;
  }
};
export default userReducer;
