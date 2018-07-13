/* global expect afterEach beforeEach describe it */
import * as actionTypes from '../../src/constants/actionTypes';
import * as actions from '../../src/actions/centerActions';
import centerData from '../mocks/centers';

describe('Center action tests\n', () => {
  it('should create an action to set event-centers', done => {
    const payload = centerData.eventCenters;
    const expectedAction = {
      type: actionTypes.GET_EVENT_CENTERS,
      payload,
    };
    expect(actions.getEventCenters(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to populate center list', done => {
    const payload = centerData.eventCenters;
    const expectedAction = {
      type: actionTypes.POPULATE_CENTERS,
      payload,
    };
    expect(actions.populateCenters(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set center details', done => {
    const payload = centerData.centerDetails;
    const expectedAction = {
      type: actionTypes.SET_CENTER_DETAILS,
      payload,
    };
    expect(actions.setCenterDetails(payload)).toEqual(expectedAction);
    done();
  });
});
