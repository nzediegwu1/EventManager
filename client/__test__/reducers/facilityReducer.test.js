import reducer from '../../src/reducers/facilityReducer';
import * as types from '../../src/constants/ActionTypes';
import facilityData from '../mocks/facilities';

const initialState = {
  facilities: [],
  undeleted: [],
};
describe('Tests for facility reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle POPULATE_FACILITIES', () => {
    expect(
      reducer(initialState, {
        type: types.POPULATE_FACILITIES,
        payload: facilityData.facilities,
      })
    ).toEqual({
      facilities: facilityData.facilities,
      undeleted: [],
    });
  });
  it('should handle SET_UNDELETED', () => {
    expect(
      reducer(initialState, {
        type: types.SET_UNDELETED,
        payload: facilityData.undeleted,
      })
    ).toEqual({
      facilities: [],
      undeleted: facilityData.undeleted,
    });
  });
});
