import React from 'react';
import { apiLink } from '../services';

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
