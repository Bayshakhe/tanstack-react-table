export const COLUMNS = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "IP Address",
    accessorKey: "ip_address",
  },
  {
    header: "Date of Birth",
    accessorKey: "date_of_birth",
  },
  {
    header: "Age",
    accessorKey: "age",
  },
  {
    header: "Country",
    accessorKey: "country",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
];
