/* global expect afterEach beforeEach describe it */
import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  CenterDetailsComponent,
  mapDispatchToProps,
  mapStateToProps,
} from '../../src/components/centerDetailsComponent';

configure({ adapter: new Adapter() });

describe('Tests for centerDetails component', () => {
  const props = {
    match: {
      params: {
        id: 1,
      },
    },
    setPage: jest.fn(),
    centerDetails: [],
    facilities: [],
    history: {},
    currentPage: 1,
  };

  it('should render self without crashing', () => {
    const wrapper = shallow(<CenterDetailsComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should call setPage function when comopnent unmounts', () => {
    const wrapper = shallow(<CenterDetailsComponent {...props} />);
    wrapper.unmount();
    expect(props.setPage).toHaveBeenCalled();
  });
});
describe('mapStateToProps', () => {
  const state = {
    centers: {
      centerDetails: {},
    },
    facilities: {
      facilities: {},
    },
    page: {
      currentPage: {},
    },
  };
  it('returns the expected properties', () => {
    const mstp = mapStateToProps(state);
    expect(mstp).toHaveProperty('centerDetails');
    expect(mstp).toHaveProperty('facilities');
    expect(mstp).toHaveProperty('currentPage');
  });
});

describe('mapDispatchToProps', () => {
  it('should return', () => {
    const dispatch = jest.fn();
    // const spy = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('setCenterDetails');
    expect(mdtp).toHaveProperty('setPage');
    // expect(mdtp.setCenterDetails).toHaveBeenCalled();
  });
});
