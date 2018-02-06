import React from 'react';

export const Option = (props) => {
  return (
    <option value={props.value}>{props.text}</option>
  );
}