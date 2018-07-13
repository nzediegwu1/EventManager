import * as actionTypes from '../../src/constants/actionTypes';
import * as actions from '../../src/actions/facilityAction';
import facilityData from '../mocks/facilities';

describe('Page action tests\n', () => {
  it('should create an action to populate facilities', done => {
    const payload = facilityData.facilities;
    const expectedAction = {
      type: actionTypes.POPULATE_FACILITIES,
      payload,
    };
    expect(actions.populateFacilities(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set undeleted facilities', done => {
    const payload = facilityData.undeleted;
    const expectedAction = {
      type: actionTypes.SET_UNDELETED,
      payload,
    };
    expect(actions.setUndeletedFacilities(payload)).toEqual(expectedAction);
    done();
  });
});
