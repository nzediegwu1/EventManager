import React from 'react';
import PropTypes from 'prop-types';

export const Filter = props => (
  <ul className="nav nav-pills flex-column">
    <li className="list-group-item sidebar-header text-center">
      <input
        id={props.id}
        className="form-control search-input search-list"
        type="search"
        placeholder={props.placeholder}
        aria-label="Search"
        onKeyUp={props.handleSearch}
      />
    </li>
  </ul>
);

Filter.propTypes = {
  placeholder: PropTypes.string,
  handleSearch: PropTypes.func,
  id: PropTypes.string,
};
