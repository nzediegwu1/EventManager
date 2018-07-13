/* global expect afterEach beforeEach describe it */
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import * as actionTypes from '../../../src/constants/actionTypes';
import { Transactions } from '../../../src/services';
import centers from '../../../__test__/mocks/centers';
import props from '../../../__test__/mocks/props';
import { setCenterDetails } from '../../../src/actions/centerActions';
import { setEventDetail } from '../../../src/actions/eventActions';
import { setModalTitle } from '../../../src/actions/pageActions';
import events from '../../mocks/events';
import users from '../../mocks/users';
import { setProfileDetails } from '../../../src/actions/userActions';
import { populateFacilities } from '../../../src/actions/facilityAction';

const token = JSON.parse(localStorage.token).value;
const mockStore = configureMockStore();
describe('Test for GetOne center function', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('Should test for add a center: success', done => {
    const url = 'https://eventmanageronline.herokuapp.com/api/v1/centers';
    moxios.stubRequest(url, {
      status: 201,
      data: centers.getOneCenterResponse,
    });
    const data = {
      name: 'Wisdom square',
      address: 'Ikorodu Road',
      location: 'Lagos',
      capacity: '12000',
      price: '7500',
      picture: 'yabametro.jpg',
      publicId: 'dev/centers/yabametro',
      availability: 'close',
      token,
    };
    const expectedActions = [
      {
        type: actionTypes.SET_CENTER_DETAILS,
        payload: data,
      },
      {
        type: actionTypes.SET_MODAL_TITLE,
        payload: 'New Center',
      },
    ];
    const tx = new Transactions(props, 'center');
    const store = mockStore({});
    props.setCenterDetails = store.dispatch(setCenterDetails(data));
    props.modalTitle = store.dispatch(setModalTitle('New Center'));
    return tx.addOrUpdate(3, data).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for add an event: success', done => {
    const url = 'https://eventmanageronline.herokuapp.com/api/v1/events';
    moxios.stubRequest(url, {
      status: 201,
      data: events.getOneResponse,
    });
    const data = {
      title: 'Human right seminar',
      date: 'August 17, 2019',
      time: '12:30',
      description: 'A technology learning program',
      picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
      publicId: 'dev/centers/youth_dev_auditorium',
      centerId: '2',
      token,
    };
    const expectedActions = [
      {
        type: actionTypes.SET_EVENT_DETAIL,
        payload: data,
      },
      {
        type: actionTypes.SET_MODAL_TITLE,
        payload: 'New Event',
      },
    ];
    const tx = new Transactions(props, 'event');
    const store = mockStore({});
    props.setEventDetail = store.dispatch(setEventDetail(data));
    props.modalTitle = store.dispatch(setModalTitle('New Event'));
    return tx.addOrUpdate(3, data).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for modify a center: success', done => {
    const url = 'https://eventmanageronline.herokuapp.com/api/v1/centers/3';
    moxios.stubRequest(url, {
      status: 202,
      data: centers.getOneCenterResponse,
    });
    const data = {
      name: 'Wisdom square',
      address: 'Ikorodu Road',
      location: 'Lagos',
      capacity: '12000',
      price: '7500',
      picture: 'yabametro.jpg',
      publicId: 'dev/centers/yabametro',
      availability: 'close',
      token,
    };
    const expectedActions = [
      {
        type: actionTypes.SET_CENTER_DETAILS,
        payload: data,
      },
      {
        type: actionTypes.SET_MODAL_TITLE,
        payload: 'Modify Center',
      },
    ];
    const tx = new Transactions(props, 'center');
    const store = mockStore({});
    props.setCenterDetails = store.dispatch(setCenterDetails(data));
    props.modalTitle = store.dispatch(setModalTitle('Modify Center'));
    return tx.addOrUpdate(3, data).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for modify an event: success', done => {
    const url = 'https://eventmanageronline.herokuapp.com/api/v1/events/3';
    moxios.stubRequest(url, {
      status: 202,
      data: events.getOneResponse,
    });
    const data = {
      title: 'Human right seminar',
      date: 'August 17, 2019',
      time: '12:30',
      description: 'A technology learning program',
      picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
      publicId: 'dev/centers/youth_dev_auditorium',
      centerId: '2',
      token,
    };
    const expectedActions = [
      {
        type: actionTypes.SET_EVENT_DETAIL,
        payload: data,
      },
      {
        type: actionTypes.SET_MODAL_TITLE,
        payload: 'Modify Event',
      },
    ];
    const tx = new Transactions(props, 'event');
    const store = mockStore({});
    props.setEventDetail = store.dispatch(setEventDetail(data));
    props.modalTitle = store.dispatch(setModalTitle('Modify Event'));
    return tx.addOrUpdate(3, data).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for modify user profile: success', done => {
    const url = `https://eventmanageronline.herokuapp.com/api/v1/users/?token=${token}`;
    moxios.stubRequest(url, {
      status: 202,
      data: users.getOneResponse,
    });
    const data = {
      title: 'Human right seminar',
      date: 'August 17, 2019',
      time: '12:30',
      description: 'A technology learning program',
      picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
      publicId: 'dev/centers/youth_dev_auditorium',
      centerId: '2',
      token,
    };
    const expectedActions = [
      {
        type: actionTypes.SET_PROFILE_DETAILS,
        payload: data,
      },
      {
        type: actionTypes.SET_MODAL_TITLE,
        payload: 'Modify Profile',
      },
    ];
    const tx = new Transactions(props, 'profile');
    const store = mockStore({});
    props.setProfileDetails = store.dispatch(setProfileDetails(data));
    props.modalTitle = store.dispatch(setModalTitle('Modify Profile'));
    return tx.addOrUpdate(3, data).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('Should test for modify center facilities: success', done => {
    const url = `https://eventmanageronline.herokuapp.com/api/v1/facilities/3?token=${token}`;
    moxios.stubRequest(url, {
      status: 202,
      data: users.getOneResponse,
    });
    const data = {
      title: 'Human right seminar',
      date: 'August 17, 2019',
      time: '12:30',
      description: 'A technology learning program',
      picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
      publicId: 'dev/centers/youth_dev_auditorium',
      centerId: '2',
      token,
    };
    const expectedActions = [
      {
        type: actionTypes.POPULATE_FACILITIES,
        payload: data,
      },
      {
        type: actionTypes.SET_MODAL_TITLE,
        payload: 'Modify Facilities',
      },
    ];
    const tx = new Transactions(props, 'facilities');
    const store = mockStore({});
    props.populateFacilities = store.dispatch(populateFacilities(data));
    props.modalTitle = store.dispatch(setModalTitle('Modify Facilities'));
    return tx.addOrUpdate(3, data).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
