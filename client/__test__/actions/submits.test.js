import * as actionTypes from '../../src/constants/actionTypes';
import { setSubmitState } from '../../src/actions/submitAction';

describe('Event action tests\n', () => {
  it('should create an action to set event details', done => {
    const payload = 'initial';
    const expectedAction = {
      type: actionTypes.SET_SUBMIT_STATE,
      payload,
    };
    expect(setSubmitState(payload)).toEqual(expectedAction);
    done();
  });
});
