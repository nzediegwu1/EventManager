/* global expect afterEach beforeEach describe it */
import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  SignInPage,
  mapStateToProps,
  mapDispatchToProps,
} from '../../src/components/signinComponent';

configure({ adapter: new Adapter() });

describe('Tests for addEvent component', () => {
  const props = {
    history: {},
    setSubmitState: jest.fn(),
    disabled: 'disabled',
    visibility: false,
  };

  it('should render self without crashing', () => {
    const enzymeWrapper = shallow(<SignInPage {...props} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should call setSubmitState before unmounting', () => {
    const enzymeWrapper = shallow(<SignInPage {...props} />);
    enzymeWrapper.unmount();
    expect(props.setSubmitState).toHaveBeenCalled();
  });
  it('should call setState when changeState is triggered', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const enzymeWrapper = shallow(<SignInPage {...props} />);
    const instance = enzymeWrapper.instance();
    instance.username = {
      value: 'wisdom',
    };
    instance.password = {
      value: 'password1',
    };

    instance.handleSubmit(event);
    // expect(props.setSubmitState).toHaveBeenCalled();
  });
  it('should call setState when changeState is triggered', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const enzymeWrapper = shallow(<SignInPage {...props} />);
    const instance = enzymeWrapper.instance();
    instance.setState = jest.fn();
    instance.changeState();
    // expect(props.setSubmitState).toHaveBeenCalled();
  });
});
describe('mapStateToProps', () => {
  const state = {
    process: {
      disabled: 'disabled',
      visibility: 'hidden',
    },
  };
  it('returns the expected properties', () => {
    const mstp = mapStateToProps(state);
    expect(mstp).toHaveProperty('disabled');
    expect(mstp).toHaveProperty('visibility');
  });
});

describe('mapDispatchToProps', () => {
  it('should return', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('setAccountType');
    expect(mdtp).toHaveProperty('setSubmitState');
    // expect(mdtp.setCenterDetails).toHaveBeenCalled();
  });
});
