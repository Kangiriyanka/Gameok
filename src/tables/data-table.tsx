import type { ColumnDef } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "./data-pagination"
import * as React from "react"
 
import type {  SortingState, ColumnFiltersState} from "@tanstack/react-table"
import {
 
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,

} from "@tanstack/react-table"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"
 



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


 
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = React.useState<SortingState>([])
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      
      sorting,
      columnFilters
    },

  })
 
  return (
    <div>
      {/* Filter Component */}
      <div className="search flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      {/* End Filter Component */}

      
    <div className="games-table border-1 border-[var(--base-clr)] rounded-lg w-[80%]">
      <Table>
        <TableHeader >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow  key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead 
                   key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell  key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <p className="text-base"> No games found (^_^*) </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    {/* Pagination Component from the Docs */}
      <div className= "w-[80%] m-10 mt-1 relative py-3 px-8">
      <DataTablePagination table={table}/>
      </div>
    </div>
    
  )
}
