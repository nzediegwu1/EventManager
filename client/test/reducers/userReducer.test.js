import reducer from '../../src/reducers/userReducer';
import * as types from '../../src/constants/ActionTypes';
import userData from '../mocks/users';

const initialState = {
  accountType: localStorage.token ? JSON.parse(localStorage.token).accountType : 'regular',
  profileDetails: [],
  userList: [],
};
describe('Tests for user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle ADD_ACCOUNT_TYPE', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_ACCOUNT_TYPE,
        payload: userData.accountType,
      })
    ).toEqual({
      accountType: userData.accountType,
      profileDetails: [],
      userList: [],
    });
  });
  it('should handle SET_PROFILE_DETAILS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PROFILE_DETAILS,
        payload: [userData.profileDetails],
      })
    ).toEqual({
      accountType: localStorage.token ? JSON.parse(localStorage.token).accountType : 'regular',
      profileDetails: [[userData.profileDetails]],
      userList: [],
    });
  });
  it('should handle POPULATE_USERLIST', () => {
    const userList = userData.getAllUsersResponse.data.data;
    expect(
      reducer(initialState, {
        type: types.POPULATE_USERLIST,
        payload: userList,
      })
    ).toEqual({
      accountType: localStorage.token ? JSON.parse(localStorage.token).accountType : 'regular',
      profileDetails: [],
      userList,
    });
  });
});
