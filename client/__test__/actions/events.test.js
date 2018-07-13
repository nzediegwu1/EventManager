import * as actionTypes from '../../src/constants/actionTypes';
import { populateEvents, setEventDetail } from '../../src/actions/eventActions';
import eventData from '../mocks/events';

describe('Event action tests\n', () => {
  it('should create an action to set event details', done => {
    const eventDetails = eventData.eventDetails;
    const expectedAction = {
      type: actionTypes.SET_EVENT_DETAIL,
      payload: eventDetails,
    };
    expect(setEventDetail(eventDetails)).toEqual(expectedAction);
    done();
  });
  it('should create an action to populate event list', done => {
    const payload = eventData.eventList;
    const expectedAction = {
      type: actionTypes.POPULATE_EVENTS,
      payload,
    };
    expect(populateEvents(payload)).toEqual(expectedAction);
    done();
  });
});
