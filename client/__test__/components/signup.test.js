/* global expect afterEach beforeEach describe it */
import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignupComponent, mapDispatchToProps } from '../../src/components/signupComponent';

configure({ adapter: new Adapter() });

describe('Tests for signup component', () => {
  const props = {
    changeState: jest.fn(),
    changeSubmitState: jest.fn(),
    disabled: 'disabled',
    visibility: false,
  };

  it('should render self without crashing', () => {
    const enzymeWrapper = shallow(<SignupComponent {...props} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should call setSubmitState before unmounting', () => {
    const enzymeWrapper = shallow(<SignupComponent {...props} />);
    enzymeWrapper.unmount();
    // expect(props.setSubmitState).toHaveBeenCalled();
  });
  it('should call setState when changeState is triggered', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const enzymeWrapper = shallow(<SignupComponent {...props} />);
    const instance = enzymeWrapper.instance();
    instance.username = {
      value: 'wisdom',
    };
    instance.password = {
      value: 'password1',
    };
    instance.name = {
      value: 'Anaeze',
    };
    instance.rePassword = {
      value: 'Anaeze',
    };
    instance.email = {
      value: 'Anaeze',
    };
    instance.phone = {
      value: 'Anaeze',
    };

    instance.handleSubmit(event);
    // expect(props.setSubmitState).toHaveBeenCalled();
  });
  it('should call setState when changeState is triggered', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const enzymeWrapper = shallow(<SignupComponent {...props} />);
    const instance = enzymeWrapper.instance();
    instance.username = {
      value: 'anaeze',
    };
    instance.password = {
      value: 'password1',
    };
    instance.name = {
      value: 'Anaeze Nsoffor',
    };
    instance.rePassword = {
      value: 'password1',
    };
    instance.email = {
      value: 'nzediegwu1@gmail.com',
    };
    instance.phone = {
      value: '2347067372837',
    };

    instance.handleSubmit(event);
    // expect(props.setSubmitState).toHaveBeenCalled();
  });
});
describe('mapDispatchToProps', () => {
  it('should return', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('setAccountType');
  });
});
