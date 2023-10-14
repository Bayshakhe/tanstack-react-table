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
import ColumnFilter from "./ColumnFilter";

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState("");
  const [columnOrder, setColumnOrder] = useState("");

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
      columnFilters: columnFilters,
      columnVisibility: columnVisibility,
      columnOrder: columnOrder,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
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
    getAllLeafColumns,
  } = tableInstance;

  return (
    <div>
      {/* global search by text */}
      <input
        type="text"
        style={{ fontSize: "20px", padding: "8px" }}
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <hr />

      {/* table oder button */}
      <button onClick={() => setColumnOrder(["email", "Name"])}>
        Table by order
      </button>
      <hr />

      {/* column hide checkbox */}
      <div
        style={{ display: "flex", margin: "15px", justifyContent: "center" }}
      >
        {getAllLeafColumns().map((column) => (
          <div key={column.id}>
            <label htmlFor="">
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.id}
            </label>
          </div>
        ))}
      </div>

      {/* table */}
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
                      {/* {header.column.getCanFilter() ? (
                        <div>
                          <ColumnFilter
                            column={header.column}
                            table={tableInstance}
                          />
                        </div>
                      ) : null} */}
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

      {/* table pagination button */}
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
