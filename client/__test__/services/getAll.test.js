/* global expect afterEach beforeEach describe it */
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import * as actionTypes from '../../src/constants/actionTypes';
import { getAll } from '../../src/services';
import centers from '../mocks/centers';
import events from '../mocks/events';
import users from '../mocks/users';
import props from '../mocks/props';
import { setDataCount } from '../../src/actions/pageActions';
import { populateEvents } from '../../src/actions/eventActions';
import { populateUserList } from '../../src/actions/userActions';
import { getEventCenters, populateCenters } from '../../src/actions/centerActions';

const mockStore = configureMockStore();

describe('Test for GetAll function', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('Should test for getAll centers: success', done => {
    const token = JSON.parse(localStorage.token).value;
    const url = `https://eventmanageronline.herokuapp.com/api/v1/centers/?token=${token}&pageNumber=1&limit=2`;
    moxios.stubRequest(url, {
      status: 200,
      data: centers.getAllCenterResponse,
    });
    const centerList = centers.getAllCenterResponse.data.data;
    const count = centers.getAllCenterResponse.data.count;
    const expectedActions = [
      {
        type: actionTypes.POPULATE_CENTERS,
        payload: centerList,
      },
      {
        type: actionTypes.SET_DATA_COUNT,
        payload: count,
      },
    ];
    const store = mockStore({});
    props.populateCenters = store.dispatch(populateCenters(centerList));
    props.setDataCount = store.dispatch(setDataCount(count));
    return getAll(props, 'centers', 1, 2).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for getAll events: success', done => {
    const token = JSON.parse(localStorage.token).value;
    const url = `https://eventmanageronline.herokuapp.com/api/v1/events/?token=${token}&pageNumber=1&limit=2`;
    moxios.stubRequest(url, {
      status: 200,
      data: events.getAllEventsResponse,
    });
    const eventlist = events.getAllEventsResponse.data.data;
    const count = events.getAllEventsResponse.data.count;
    const expectedActions = [
      {
        type: actionTypes.POPULATE_EVENTS,
        payload: eventlist,
      },
      {
        type: actionTypes.SET_DATA_COUNT,
        payload: count,
      },
    ];
    const store = mockStore({});
    props.populateEvents = store.dispatch(populateEvents(eventlist));
    props.setDataCount = store.dispatch(setDataCount(count));
    return getAll(props, 'events', 1, 2).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for getAll eventCenters: success', done => {
    const token = JSON.parse(localStorage.token).value;
    const url = `https://eventmanageronline.herokuapp.com/api/v1/centers/?token=${token}&pageNumber=1&limit=2`;
    moxios.stubRequest(url, {
      status: 200,
      data: centers.getAllCenterResponse,
    });
    const centerList = centers.getAllCenterResponse.data.data;
    const count = centers.getAllCenterResponse.data.count;
    const expectedActions = [
      {
        type: actionTypes.GET_EVENT_CENTERS,
        payload: centerList,
      },
      {
        type: actionTypes.SET_DATA_COUNT,
        payload: count,
      },
    ];
    const store = mockStore({});
    props.getEventCenters = store.dispatch(getEventCenters(centerList));
    props.setDataCount = store.dispatch(setDataCount(count));
    return getAll(props, 'centers', 1, 2).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for getAll users: success', done => {
    const token = JSON.parse(localStorage.token).value;
    const url = `https://eventmanageronline.herokuapp.com/api/v1/users/?token=${token}&pageNumber=1&limit=2`;
    moxios.stubRequest(url, {
      status: 200,
      data: users.getAllUsersResponse,
    });
    const userlist = users.getAllUsersResponse.data.data;
    const count = users.getAllUsersResponse.data.count;
    const expectedActions = [
      {
        type: actionTypes.POPULATE_USERLIST,
        payload: userlist,
      },
      {
        type: actionTypes.SET_DATA_COUNT,
        payload: count,
      },
    ];
    const store = mockStore({});
    props.populateUserList = store.dispatch(populateUserList(userlist));
    props.setDataCount = store.dispatch(setDataCount(count));
    return getAll(props, 'users', 1, 2).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
