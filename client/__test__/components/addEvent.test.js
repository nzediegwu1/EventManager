import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddEventComponent } from '../../src/components/addEventComponent';

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    modalTitle: 'New Event',
    centers: [],
    disabled: 'disabled',
    visibility: 'hidden',
    dataCount: 3,
    match: {},
    activePage: 1,
    setActivePage: jest.fn(),
  };
  const enzymeWrapper = mount(<AddEventComponent {...props} />);
  return {
    props,
    enzymeWrapper,
  };
}

describe('Tests for addEvent component', () => {
  it('should render self without crashing', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.length).toBe(1);
  });
});
