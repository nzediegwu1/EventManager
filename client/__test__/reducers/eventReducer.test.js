import reducer from '../../src/reducers/eventReducer';
import * as types from '../../src/constants/actionTypes';
import eventData from '../mocks/events';

const initialState = {
  eventList: [],
  event: [],
};
describe('Tests for event reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle POPULATE_EVENTS', () => {
    expect(
      reducer(initialState, {
        type: types.POPULATE_EVENTS,
        payload: eventData.eventList,
      })
    ).toEqual({
      eventList: eventData.eventList,
      event: [],
    });
  });
  it('should handle SET_EVENT_DETAIL', () => {
    expect(
      reducer(initialState, {
        type: types.SET_EVENT_DETAIL,
        payload: eventData.eventDetails,
      })
    ).toEqual({
      eventList: [],
      event: [eventData.eventDetails],
    });
  });
});
