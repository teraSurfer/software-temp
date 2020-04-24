import React from 'react';
import { useTable } from 'react-table';
import { useHistory } from 'react-router-dom';
/*
 * File Created: Friday, 17th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

type HeaderItem = {
  Header: string;
  accessor: string;
};

type TableProps = {
  data: any[];
  headers: HeaderItem[];
  clickable?: boolean;
  path?: string;
};

const Table = function ({ data, headers, clickable, path }: TableProps) {
  const d = React.useMemo(() => data, [data]);
  const c = React.useMemo(() => headers, [headers]);
  const history = useHistory();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: c, data: d });

  function handleClick(evt: any, row: any) {
    evt.preventDefault();
    if (!clickable) return;
    else {
      history.push(path+`/${row.values.id}`)
    }
  }

  return (
    <table className='table table-sm table-hover table-bordered table-responsive-md mb-0' {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} scope='col'>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={(e) => handleClick(e, row)}>
              {row.cells.map((cell, idx) => {
                return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
