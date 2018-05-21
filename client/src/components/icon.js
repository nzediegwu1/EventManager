import React from 'react';
import { apiLink } from '../services';
import PropTypes from 'prop-types';

const Icon = props => (
  <img
    onClick={props.clickAction}
    className={props.class}
    src={`${apiLink}/images/${props.src}`}
    alt={props.alt}
    id={props.id}
  />
);
export default Icon;
Icon.propTypes = {
  clickAction: PropTypes.func,
  class: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.string,
};
