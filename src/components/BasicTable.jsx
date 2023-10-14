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
// import "./table.css";
import ColumnFilter from "./ColumnFilter";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

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
      <TextField
        type="text"
        label="Global search"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <hr />

      {/* table oder button */}
      <Button
        variant="contained"
        onClick={() => setColumnOrder(["email", "Name"])}
      >
        Table by order
      </Button>
      <hr />

      {/* column hide checkbox */}
      <div
        style={{ display: "flex", margin: "15px", justifyContent: "center" }}
      >
        {getAllLeafColumns().map((column) => (
          <div key={column.id}>
            <Checkbox
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            <label htmlFor="">{column.id}</label>
          </div>
        ))}
      </div>

      {/* table */}
      <TableContainer>
        <Table>
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          {
                            asc: <Button sx={{ fontSize: "20px" }}>↓</Button>,
                            desc: <Button sx={{ fontSize: "20px" }}>↑</Button>,
                          }[header.column.getIsSorted()]
                        }
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
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* table pagination button */}
      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => setPageIndex(0)}>First Page</Button>
        <Button disabled={!getCanPreviousPage()} onClick={() => previousPage()}>
          Previous Page
        </Button>
        <Button disabled={!getCanNextPage()} onClick={() => nextPage()}>
          Next Page
        </Button>
        <Button onClick={() => setPageIndex(getPageCount() - 1)}>
          Last Page
        </Button>
      </div>
    </div>
  );
};

export default BasicTable;
