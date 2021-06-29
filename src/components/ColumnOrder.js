import React, { useMemo } from "react";
import { useFilters, useGlobalFilter, usePagination, useTable, useRowSelect, useColumnOrder } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { Column,GroupColumn } from "./column";
import './table.css'
import { GlobalFilter } from "./GlobalFilter";
import { Checkbox } from "./Checkbox";

export default function ColumnOrder() {
  const columns = useMemo(() => Column, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable({
    columns,
    data,
    initialState: { pageSize: 10 }

  },
  useFilters,
  useGlobalFilter,
  usePagination,
  useColumnOrder,
  useRowSelect,
  hooks => {
    hooks.visibleColumns.push(columns => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Checkbox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
      },
      ...columns
    ])
  }
  );
  
  const changeOrder = () => {
      setColumnOrder([
          "id",
          "first_name",
          "last_name",
          "phone",
          "country",
          "date_of_birth"
      ])
  }

  const {getTableProps, getTableBodyProps, headerGroups,page,nextPage,previousPage,canNextPage,canPreviousPage,prepareRow,state,setGlobalFilter,pageOptions,gotoPage,pageCount,setPageSize,selectedFlatRows, setColumnOrder} = tableInstance

  const {globalfilter,pageIndex,pageSize} = state;
  return (
      <>
            <button onClick={changeOrder}>Change column order</button>
    <div>
        <GlobalFilter filter={globalfilter} setFilter={setGlobalFilter}/>
          <table {...getTableProps}>
            <thead>
              {headerGroups.map((headerGroups) => (
                <tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
              ))}
          
            </thead>
            <tbody {...getTableBodyProps}>
              {page.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <pre>
            <code>
              {JSON.stringify(
                {
                  selectedFlatRows: selectedFlatRows.map(row => row.original)
                },
                null,
                2
              )}
            </code>
        </pre>
        </div>
        <div>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <span>
             | Go to page: {' '}
             <input type="number" defaultValue={pageIndex + 1} onChange= {(e) => {
                 const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                 gotoPage(pageNumber)
             }} style={{width: '50px'}}/>
            </span>
            <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              {[10,25,50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>Show {pageSize}</option>
              ))}
            </select>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()}disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
    </div>
    </>
  );
}