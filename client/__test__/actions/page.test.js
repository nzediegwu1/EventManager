import * as actionTypes from '../../src/constants/actionTypes';
import * as actions from '../../src/actions/pageActions';
import pageData from '../mocks/page';

describe('Page action tests\n', () => {
  it('should create an action to set current page component', done => {
    const payload = pageData.currentPage;
    const expectedAction = {
      type: actionTypes.SET_PAGE,
      payload,
    };
    expect(actions.setPage(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set required value', done => {
    const payload = pageData.required;
    const expectedAction = {
      type: actionTypes.SET_REQUIRED,
      payload,
    };
    expect(actions.setRequired(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set active page from server', done => {
    const payload = pageData.activePage;
    const expectedAction = {
      type: actionTypes.SET_ACTIVE_PAGE,
      payload,
    };
    expect(actions.setActivePage(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set random value', done => {
    const payload = pageData.random;
    const expectedAction = {
      type: actionTypes.SET_RANDOM,
      payload,
    };
    expect(actions.setRandom(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set event defaults', done => {
    const payload = pageData.eventDefaults;
    const expectedAction = {
      type: actionTypes.SET_EVENT_DEFAULTS,
      payload,
    };
    expect(actions.setEventDefaults(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set center defaults', done => {
    const payload = pageData.centerDefaults;
    const expectedAction = {
      type: actionTypes.SET_CENTER_DEFAULTS,
      payload,
    };
    expect(actions.setCenterDefaults(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set data count', done => {
    const payload = pageData.dataCount;
    const expectedAction = {
      type: actionTypes.SET_DATA_COUNT,
      payload,
    };
    expect(actions.setDataCount(payload)).toEqual(expectedAction);
    done();
  });
  it('should create an action to set modal title', done => {
    const payload = pageData.modalTitle;
    const expectedAction = {
      type: actionTypes.SET_MODAL_TITLE,
      payload,
    };
    expect(actions.setModalTitle(payload)).toEqual(expectedAction);
    done();
  });
});
