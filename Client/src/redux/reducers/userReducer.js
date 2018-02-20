import { ADD_ACCOUNT_TYPE } from '../../constants/actionTypes';

const initialState = {
  accountType: localStorage.token ? JSON.parse(localStorage.token).accountType : 'regular'
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_TYPE:
      return { accountType: action.payload };
      break;
    default:
      return state;
      break;
  }
};
export default userReducer;