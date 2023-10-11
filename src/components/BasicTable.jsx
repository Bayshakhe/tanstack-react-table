import { useMemo, useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { COLUMNS } from "./column";
import MOCK_DATA from "./MOCK_DATA.json";
import "./table.css";

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const {
    getHeaderGroups,
    getRowModel,
    setPageIndex,
    previousPage,
    nextPage,
    getPageCount,
    getCanPreviousPage,
    getCanNextPage,
  } = tableInstance;

  return (
    <div>
      <input
        type="text"
        style={{ fontSize: "20px", padding: "8px" }}
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{ asc: "↓", desc: "↑" }[header.column.getIsSorted()]}
                    </div>
                  }
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
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPageIndex(0)}>First Page</button>
        <button disabled={!getCanPreviousPage()} onClick={() => previousPage()}>
          Previous Page
        </button>
        <button disabled={!getCanNextPage()} onClick={() => nextPage()}>
          Next Page
        </button>
        <button onClick={() => setPageIndex(getPageCount() - 1)}>
          Last Page
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
