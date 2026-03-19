import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  Table as TanstackTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmployeeRecord } from "@/app/dashboard/checkin-checkout/types";

// Hook exported so page.tsx can call useReactTable with these columns
export function useCheckInColumns(): ColumnDef<EmployeeRecord>[] {
  return useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Employee",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.avatar} />
              <AvatarFallback>{row.original.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{row.original.name}</span>
          </div>
        ),
      },
      { accessorKey: "code", header: "Emp Code" },
      { accessorKey: "department", header: "Department" },
      { accessorKey: "checkin", header: "Check-in" },
      { accessorKey: "checkout", header: "Check-out" },
      { accessorKey: "location", header: "Location" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.getValue("status") as string;
          let color = "bg-gray-100 text-gray-800 border-gray-300";
          if (s === "Active")    color = "bg-green-100 text-green-800 border-green-400";
          if (s === "In Office") color = "bg-blue-100 text-blue-800 border-blue-400";
          if (s === "Absent")    color = "bg-red-100 text-red-800 border-red-400";
          if (s === "Deactive")  color = "bg-orange-100 text-orange-800 border-orange-400";

          return (
            <Badge variant="outline" className={`px-3 py-1 border rounded ${color}`}>
              {s}
            </Badge>
          );
        },
      },
    ],
    []
  );
}

// Component just renders the table UI
type Props = {
  table: TanstackTable<EmployeeRecord>;
  columnCount: number;
};

export default function EmployeeTable({ table, columnCount }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer select-none"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{ asc: " ↑", desc: " ↓" }[header.column.getIsSorted() as string] ?? null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columnCount}
                className="h-32 text-center text-muted-foreground"
              >
                No matching records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}