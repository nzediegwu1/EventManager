import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ManageDetailsHeader } from '../../src/components/manageDetailsHeader';

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    param: {},
    currentPage: 1,
    history: {},
    eventDetails: [],
    centerDetails: [],
    setModalTitle: jest.fn(),
    setRequired: jest.fn(),
    editModal: 'Edit Event',
    title: 'Edit Modal',
    owner: 4,
    setEventDefaults: jest.fn(),
    setCenterDefaults: jest.fn(),
    setRandom: jest.fn(),
  };

  const enzymeWrapper = shallow(<ManageDetailsHeader {...props} />);
  return {
    props,
    enzymeWrapper,
  };
}

describe('Tests for addEvent component', () => {
  it('should render self without crashing', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.length).toBe(1);
  });
});
