import {format} from 'date-fns';
import { ColumnFilter } from './Columnfilter';
export const Column = [
  {
    Header: "Id",
    Footer: 'Id',
    accessor: "id",
    Filter: ColumnFilter,
    // disableFilters: true
  },
  {
    Header: "First name",
    Footer: 'First name',
    accessor: "first_name",
    Filter: ColumnFilter,
  },
  {
    Header: "Last name",
    Footer: 'Last name',
    accessor: "last_name",
    Filter: ColumnFilter,
  },
  {
    Header: "Date of Birth",
    Footer: 'Date of Birth',
    accessor: "date_of_birth",
    Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')},
    Filter: ColumnFilter,
  },
  {
    Header: "Country",
    Footer: 'Country',
    accessor: "country",
    Filter: ColumnFilter,
  },
  {
    Header: "Phone",
    Footer: 'Phone',
    accessor: "phone",
    Filter: ColumnFilter,
  },
];

export const GroupColumn = [
  {
    Header: "Id",
    Footer: 'Id',
    accessor: "id",
    Filter: ColumnFilter,
  },
  {
    Header: 'Name',
    Footer: 'Name',
    Filter: ColumnFilter,
    columns: [
      {
        Header: "First name",
        Footer: 'First name',
        accessor: "first_name",
        Filter: ColumnFilter,
      },
      {
        Header: "Last name",
        Footer: 'Last name',
        accessor: "last_name",
        Filter: ColumnFilter,
      },
    ]
  },
  {
    Header: 'Info',
    Footer: 'Info',
    Filter: ColumnFilter,
    columns: [
      {
        Header: "Date of Birth",
        Footer: 'Date of Birth',
        accessor: "date_of_birth",
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')},
        Filter: ColumnFilter,
      },
      {
        Header: "Country",
        Footer: 'Country',
        accessor: "country",
        Filter: ColumnFilter,
      },
      {
        Header: "Phone",
        Footer: 'Phone',
        accessor: "phone",
        Filter: ColumnFilter,
      },
    ]
  }
]
