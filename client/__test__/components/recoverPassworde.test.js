import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RecoverPassword } from '../../src/components/rePasswordComponent';

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    changeSubmitState:jest.fn(),
    disabled: 'disabled',
    visibility: 'true',
  };
  const enzymeWrapper = mount(<RecoverPassword {...props} />);
  return {
    props,
    enzymeWrapper,
  };
}

describe('Tests for recoverPassword component', () => {
  it('should render self without crashing', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.length).toBe(1);
  });
});
