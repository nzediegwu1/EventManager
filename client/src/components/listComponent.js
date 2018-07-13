import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';

export const ListItem = props => (
  <li onClick={props.event} className={props.class}>
    <h6>
      <a className="nav-link" href="#">
        {props.title}
        <Icon src={props.icon} alt={props.alt} class="invert-color icon-margin-left" />
      </a>
    </h6>
  </li>
);

ListItem.propTypes = {
  event: PropTypes.func,
  class: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.string,
};
