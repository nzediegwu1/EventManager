import React, { Component } from 'react';

export const TableHead = (props) => {
  const content = (
    <thead className="table-header table-header-main">
      <tr>
        <th>{props.col1}</th>
        <th>{props.col2}</th>
        <th>{props.col3}</th>
        <th>{props.col4}</th>
      </tr>
    </thead>
  );
  return content;
}