import React from 'react';

const tableColumns = (columnArray, type) => {
  const colNumber = columnArray.length;
  const columns = columnArray.map(item => {
    const key = Math.floor(Math.random() * 10906) + 5;
    return type === 'header' ? (
      <th key={key} className={colNumber === 3 ? 'col-sm-4' : undefined}>
        {item}
      </th>
    ) : (
      <td key={key} className={colNumber === 3 ? 'col-sm-4' : undefined}>
        {item}
      </td>
    );
  }); // comumns return will be an array of column cells
  return columns;
};

export const TableHead = props => (
  <thead className={props.class}>
    <tr>{tableColumns(props.columns, 'header')}</tr>
  </thead>
);
export const TableRow = props => <tr className={props.class}>{tableColumns(props.columns)}</tr>;
