import * as actionTypes from '../../src/constants/actionTypes';
import { setAccountType, setProfileDetails, populateUserList } from '../../src/actions/userActions';
import userData from '../mocks/users';

describe('User action tests\n', () => {
  it('should create an action to set account type', done => {
    const accountType = userData.accountType;
    const expectedAction = {
      type: actionTypes.ADD_ACCOUNT_TYPE,
      payload: accountType,
    };
    expect(setAccountType(accountType)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set profile details', done => {
    const payload = userData.profileDetails;
    const expectedAction = {
      type: actionTypes.SET_PROFILE_DETAILS,
      payload,
    };
    expect(setProfileDetails(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set user list', done => {
    const userList = userData.userList;
    const expectedAction = {
      type: actionTypes.POPULATE_USERLIST,
      payload: userList,
    };
    expect(populateUserList(userList)).toEqual(expectedAction);
    done();
  });
});
