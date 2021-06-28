import React, { useMemo } from "react";
import { useFilters, useGlobalFilter, useTable } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { Column,GroupColumn } from "./column";
import './table.css'
import { GlobalFilter } from "./GlobalFilter";

export default function FilteringTable() {
  const columns = useMemo(() => Column, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable({
    columns,
    data,
  },
  useFilters,
  useGlobalFilter);
  

  const {getTableProps, getTableBodyProps, headerGroups,footerGroups,rows,prepareRow,state,setGlobalFilter} = tableInstance

  const {globalfilter} = state;
  return (
      
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
            {rows.map((row) => {
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
        
          <tfoot>
            {
              footerGroups.map(footerGroups => (
                <tr {...footerGroups.getFooterGroupProps()}>
                  {
                    footerGroups.headers.map(column => {
                      return (
                        <td {...column.getFooterGroupProps}>
                          {
                            column.render('Footer')
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              ))
            }
          </tfoot>
        </table>
    </div>
  );
}