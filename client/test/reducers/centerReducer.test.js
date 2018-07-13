import reducer from '../../src/reducers/centerReducer';
import * as types from '../../src/constants/ActionTypes';
import centerData from '../mocks/centers';

const initialState = {
  centerList: [],
  centerDetails: [],
  eventCenters: [],
};
describe('Tests for center reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle POPULATE_CENTERS', () => {
    const centerList = centerData.getAllCenterResponse.data.data;
    expect(
      reducer(initialState, {
        type: types.POPULATE_CENTERS,
        payload: centerList,
      })
    ).toEqual({
      centerList,
      centerDetails: [],
      eventCenters: [],
    });
  });
  it('should handle SET_CENTER_DETAILS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CENTER_DETAILS,
        payload: centerData.centerDetails,
      })
    ).toEqual({
      centerList: [],
      centerDetails: [centerData.centerDetails],
      eventCenters: [],
    });
  });
  it('should handle GET_EVENT_CENTERS', () => {
    const centerList = centerData.getAllCenterResponse.data.data;
    expect(
      reducer(initialState, {
        type: types.GET_EVENT_CENTERS,
        payload: centerList,
      })
    ).toEqual({
      centerList: [],
      centerDetails: [],
      eventCenters: centerList,
    });
  });
});
