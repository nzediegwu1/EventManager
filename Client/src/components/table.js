import React, { Component } from 'react';

const tableColumns = (colNumber, columnArray, type) => {
  const columns = [];
  for (let index = 0; index < colNumber; index++) {
    (type === 'header') ? columns.push(<th key={index} className={(colNumber === 3) ? 'col-sm-4' : undefined}>{columnArray[index]}</th>)
      : columns.push(<td className={(colNumber === 3) ? 'col-sm-4' : undefined} key={index}>{columnArray[index]}</td>);
    // comumns props will be an array of column cells
  }
  return columns;
}
export const TableHead = (props) => {
  const content = (
    <thead className={props.class}>
      <tr>
        {tableColumns(props.colNumber, props.columns, 'header')}
      </tr>
    </thead>
  );
  return content;
}
export const TableRow = (props) => {
  const content = (
    <tr className={props.class}>
      {tableColumns(props.colNumber, props.columns)}
    </tr>
  );
  return content;
}