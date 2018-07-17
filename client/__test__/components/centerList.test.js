/* global expect afterEach beforeEach describe it */
import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CenterList } from '../../src/components/centerListComponent';

configure({ adapter: new Adapter() });

describe('Tests for centerList component', () => {
  const props = {
    centers: [],
    match: {},
    activePage: 1,
    dataCount: 1,
    setActivePage: jest.fn(),
  };

  it('should render self without crashing', () => {
    const enzymeWrapper = shallow(<CenterList {...props} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should call setActivePage when handle is clicked', () => {
    const wrapper = shallow(<CenterList {...props} />);
    const instance = wrapper.instance();
    instance.handlePageChange(22);
    expect(props.setActivePage).toHaveBeenCalled();
  });
});
