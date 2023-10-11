import { useMemo } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { COLUMNS } from "./column";
import MOCK_DATA from "./MOCK_DATA.json";
import "./table.css";

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const { getHeaderGroups, getRowModel } = tableInstance;

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasicTable;
