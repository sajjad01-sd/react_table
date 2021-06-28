import {format} from 'date-fns';
export const Column = [
  {
    Header: "Id",
    Footer: 'Id',
    accessor: "id",
  },
  {
    Header: "First name",
    Footer: 'First name',
    accessor: "first_name",
  },
  {
    Header: "Last name",
    Footer: 'Last name',
    accessor: "last_name",
  },
  {
    Header: "Date of Birth",
    Footer: 'Date of Birth',
    accessor: "date_of_birth",
    Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')}
  },
  {
    Header: "Country",
    Footer: 'Country',
    accessor: "country",
  },
  {
    Header: "Phone",
    Footer: 'Phone',
    accessor: "phone",
  },
];

export const GroupColumn = [
  {
    Header: "Id",
    Footer: 'Id',
    accessor: "id",
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: "First name",
        Footer: 'First name',
        accessor: "first_name",
      },
      {
        Header: "Last name",
        Footer: 'Last name',
        accessor: "last_name",
      },
    ]
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: "Date of Birth",
        Footer: 'Date of Birth',
        accessor: "date_of_birth",
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')}
      },
      {
        Header: "Country",
        Footer: 'Country',
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: 'Phone',
        accessor: "phone",
      },
    ]
  }
]
