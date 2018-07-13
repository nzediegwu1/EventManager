import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ManageEventComponent } from '../../src/components/manageEventComponent';

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    match: {
      params: {
        id: 3,
      },
    },
    setPage: jest.fn(),
    eventDetails: [],
    history: {},
  };

  const enzymeWrapper = shallow(<ManageEventComponent {...props} />);
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
