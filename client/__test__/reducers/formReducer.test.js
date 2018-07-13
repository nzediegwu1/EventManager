import reducer from '../../src/reducers/formReducer';
import * as types from '../../src/constants/ActionTypes';

const initiaState = {
  disabled: false,
  visibility: 'none',
};
describe('Tests for form reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initiaState);
  });
  it('should handle SET_SUBMIT_STATE: initial', () => {
    expect(
      reducer(initiaState, {
        type: types.SET_SUBMIT_STATE,
        payload: 'initial',
      })
    ).toEqual(initiaState);
  });
  it('should handle SET_SUBMIT_STATE: processing', () => {
    expect(
      reducer(initiaState, {
        type: types.SET_SUBMIT_STATE,
        payload: 'processing',
      })
    ).toEqual({
      disabled: 'disabled',
      visibility: true,
    });
  });
});
