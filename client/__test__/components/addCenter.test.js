import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddCenterComponent } from '../../src/components/addCenterComponent';

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    modalTitle: 'New Center',
    required: 'required',
    disabled: 'disabled',
    visibility: 'true',
  };
  const enzymeWrapper = mount(<AddCenterComponent {...props} />);
  return {
    props,
    enzymeWrapper,
  };
}

describe('Tests for addCenter component', () => {
  it('should render self without crashing', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.length).toBe(1);
  });
});
