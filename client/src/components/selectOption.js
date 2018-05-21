import React from 'react';
import PropTypes from 'prop-types';

export const Option = props => <option value={props.value}>{props.text}</option>;
Option.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
};
