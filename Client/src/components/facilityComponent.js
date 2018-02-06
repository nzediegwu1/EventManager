import React, { Component } from 'react';

export function FacilityRow(props) {
  const content = (
    <tr>
      <td><b>{props.name}</b></td>
      <td><b>{props.spec}</b></td>
      <td><span className="badge">{props.quantity}</span></td>
      {(props.context === 'addCenter') && <td><div className="checkbox"><input type="checkbox" name="mark" /></div></td>}
    </tr>
  );
  return content;
}

export function FacilityHeader(props) {
  return (
    <thead className="table-header">
      <tr>
        <th>Facility</th>
        <th>Spec</th>
        <th>Quantity</th>
        {(props.context === 'addCenter') && <th><img src={props.deleteIcon} alt="delete" /></th>}
      </tr>
    </thead>
  );
}