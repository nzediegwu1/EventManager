/* global expect afterEach beforeEach describe it */
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import * as actionTypes from '../../src/constants/actionTypes';
import { getOne } from '../../src/services';
import centers from '../mocks/centers';
import events from '../mocks/events';
import users from '../mocks/users';
import props from '../mocks/props';
import { setPage, setDataCount } from '../../src/actions/pageActions';
import { setEventDetail } from '../../src/actions/eventActions';
import { setProfileDetails } from '../../src/actions/userActions';
import { setCenterDetails, getEventCenters } from '../../src/actions/centerActions';

const mockStore = configureMockStore();

describe('Test for GetOne center function', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  const type = 'centers';
  const itemId = 1;
  it('Should test for getOne center: success', done => {
    const url = `https://eventmanageronline.herokuapp.com/api/v1/centers/${itemId}`;
    moxios.stubRequest(url, {
      status: 200,
      data: centers.getOneCenterResponse,
    });
    const centerDetail = centers.getOneCenterResponse.data;
    const pageTitle = type === 'centers' ? 'centerDetails' : 'manageEvent';
    const expectedActions = [
      {
        type: actionTypes.SET_CENTER_DETAILS,
        payload: centerDetail,
      },
      {
        type: actionTypes.SET_PAGE,
        payload: pageTitle,
      },
    ];

    const store = mockStore({});
    props.setCenterDetails = store.dispatch(setCenterDetails(centerDetail));
    props.setPage = store.dispatch(setPage(pageTitle));
    return getOne(props, itemId, 'centers').then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for getOne event: success', done => {
    const url = `https://eventmanageronline.herokuapp.com/api/v1/events/${itemId}`;
    moxios.stubRequest(url, {
      status: 200,
      data: events.getOneCenterResponse,
    });
    const eventDetails = events.getOneResponse.data;
    const pageTitle = type === 'centers' ? 'centerDetails' : 'manageEvent';
    const expectedActions = [
      {
        type: actionTypes.SET_EVENT_DETAIL,
        payload: eventDetails,
      },
      {
        type: actionTypes.SET_PAGE,
        payload: pageTitle,
      },
    ];
    const store = mockStore({});
    props.setEventDetail = store.dispatch(setEventDetail(eventDetails));
    props.setPage = store.dispatch(setPage(pageTitle));
    return getOne(props, itemId, 'events').then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for getOne user: success', done => {
    const url = `https://eventmanageronline.herokuapp.com/api/v1/users/${itemId}`;
    moxios.stubRequest(url, {
      status: 200,
      data: users.getOneResponse,
    });
    const userDetails = users.getOneResponse.data;
    const expectedActions = [
      {
        type: actionTypes.SET_PROFILE_DETAILS,
        payload: userDetails,
      },
    ];
    const store = mockStore({});
    props.setProfileDetails = store.dispatch(setProfileDetails(userDetails));
    return getOne(props, itemId, 'users').then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for getOne eventCenter: success', done => {
    const url = `https://eventmanageronline.herokuapp.com/api/v1/centers/${itemId}`;
    moxios.stubRequest(url, {
      status: 200,
      data: centers.getOneCenterResponse,
    });
    const centerDetail = [centers.getOneCenterResponse.data];
    const expectedActions = [
      {
        type: actionTypes.SET_DATA_COUNT,
        payload: 3,
      },
      {
        type: actionTypes.GET_EVENT_CENTERS,
        payload: centerDetail,
      },
    ];
    const store = mockStore({});
    props.setDataCount = store.dispatch(setDataCount(3));
    props.getEventCenters = store.dispatch(getEventCenters(centerDetail));
    return getOne(props, itemId, 'eventCenter').then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for getOne center: error', done => {
    const url = `https://eventmanageronline.herokuapp.com/api/v1/centers/${itemId}`;
    moxios.stubRequest(url, {
      status: 404,
      response: centers.getOneErrorResponse,
    });
    const history = '/dashboard/centers';
    return getOne(props, itemId, 'centers').then(() => {
      expect(props.history.push('/dashboard/centers')).toEqual(history);
      done();
    });
  });
});
