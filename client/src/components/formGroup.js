import React from 'react';
import { apiLink } from '../services';
import PropTypes from 'prop-types';

const Input = props => {
  if (props.params.required) {
    return (
      <input
        type={props.params.inputType}
        name={props.params.inputName}
        placeholder={props.params.placeholder}
        required
        className={props.params.className}
        ref={props.params.ref}
      />
    );
  }
  return (
    <input
      type={props.params.inputType}
      name={props.params.inputName}
      placeholder={props.params.placeholder}
      className={props.params.className}
      ref={props.params.ref}
    />
  );
};
export const FormGroup = props => (
  <div className="form-group">
    <div className="input-group">
      <span className="input-group-addon">
        <img src={`${apiLink}/images/${props.image}`} alt={props.alt} />
      </span>
      <Input params={props.inputProps} />
    </div>
  </div>
);
Input.propTypes = {
  params: PropTypes.object,
};
FormGroup.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  inputProps: PropTypes.object,
};
