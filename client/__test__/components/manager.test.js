/* global expect afterEach beforeEach describe it */
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Manager } from '../../src/components/manager';

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    setModalProps: jest.fn(),
    setProfileDetails: jest.fn(),
    editModal: 'stuff',
    deleteEvent: jest.fn(),
  };
  const enzymeWrapper = mount(<Manager {...props} />);
  return {
    props,
    enzymeWrapper,
  };
}

describe('Tests for manager component', () => {
  it('should render self without crashing', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.length).toBe(1);
  });
});
