import ColumnFilter from "./ColumnFilter";

export const COLUMNS = [
  {
    header: "ID",
    accessorKey: "id",
    // Filter: ColumnFilter,
  },
  {
    header: "Name",
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    // Filter: ColumnFilter,
  },
  {
    header: "Email",
    accessorKey: "email",
    // Filter: ColumnFilter,
  },
  {
    header: "Gender",
    accessorKey: "gender",
    // Filter: ColumnFilter,
  },
  {
    header: "IP Address",
    accessorKey: "ip_address",
    // Filter: ColumnFilter,
  },
  {
    header: "Date of Birth",
    accessorKey: "date_of_birth",
    // Filter: ColumnFilter,
  },
  {
    header: "Age",
    accessorKey: "age",
    // Filter: ColumnFilter,
  },
  {
    header: "Country",
    accessorKey: "country",
    // Filter: ColumnFilter,
  },
  {
    header: "Phone",
    accessorKey: "phone",
    // Filter: ColumnFilter,
  },
];
