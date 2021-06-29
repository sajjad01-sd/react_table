import React, { useMemo } from "react";
import { useFilters, useGlobalFilter, usePagination, useTable, useRowSelect, useColumnOrder } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { Column,GroupColumn } from "./column";
import './table.css'
import { GlobalFilter } from "./GlobalFilter";
import { Checkbox } from "./Checkbox";
import { CSVLink } from "react-csv";
import PageData from "./PageData";

export default function ColumnHidding() {
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

  const headers = [
    {label: 'First Name', key: 'first_name'},
    {label: "Last Name", key: 'last_name'},
    {label: "Email", key: 'email'},
  ]

  const csvReport = {
    filename: 'Report.xls',
    headers: headers,
    data: data
  }

  const {getTableProps, getTableBodyProps, headerGroups,page,nextPage,previousPage,canNextPage,canPreviousPage,prepareRow,state,setGlobalFilter,pageOptions,gotoPage,pageCount,setPageSize,selectedFlatRows, setColumnOrder,allColumns,getToggleHideAllColumnsProps} = tableInstance

  const {globalfilter,pageIndex,pageSize} = state;

  return (
      
      <div>
        <GlobalFilter filter={globalfilter} setFilter={setGlobalFilter}/>
        <div>
        {/* <div>
        <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
    </div> */}
        {
            allColumns.map(column => (
                <div key={column.id} style={{ float: "left" }}>
                  <label>
                    <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
                    {column.Header}
                  </label>
                </div>
            ))
        }
        </div>
        <div>
                <button onClick={changeOrder}>Change column order</button>
           <div>
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
                <PageData pageSize={pageSize} setPageSize={setPageSize}/>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()}disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </div>
        <CSVLink {...csvReport}>Export</CSVLink>
    </div>
  );
}