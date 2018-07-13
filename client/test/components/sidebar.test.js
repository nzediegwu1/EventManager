import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  SidebarComponent,
  mapStateToProps,
  mapDispatchToProps,
} from '../../src/components/sidebarComponent';

configure({ adapter: new Adapter() });

describe('Tests for addEvent component', () => {
  const props = {
    match: {},
    setProfileDetails: jest.fn(),
    history: {},
  };

  it('should render self without crashing', () => {
    const enzymeWrapper = shallow(<SidebarComponent {...props} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });
  // it('should call setState when changeState is triggered', () => {
  //   const enzymeWrapper = shallow(<SidebarComponent {...props} />);
  //   const instance = enzymeWrapper.instance();
  //   instance.changeLocation('url');
  //   // expect(props.setSubmitState).toHaveBeenCalled();
  // });
});
describe('mapDispatchToProps', () => {
  it('should return', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('setProfileDetails');
    // expect(mdtp.setCenterDetails).toHaveBeenCalled();
  });
});
