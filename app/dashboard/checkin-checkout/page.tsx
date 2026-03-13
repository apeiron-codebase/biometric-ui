// app/dashboard/checkin/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, FileSpreadsheet, FileText, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";

// Mock data – replace with real API data + live updates
const mockEmployees = [
  { id: "EMP001", name: "Rajesh Kumar", avatar: "", department: "Engineering", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present" },
  { id: "EMP002", name: "Priya Sharma", avatar: "", department: "HR", checkIn: "08:45 AM", checkOut: null, status: "In Office" },
  { id: "EMP003", name: "Vikram Singh", avatar: "", department: "Finance", checkIn: null, checkOut: null, status: "Absent" },
  { id: "EMP004", name: "Ananya Reddy", avatar: "", department: "Marketing", checkIn: "09:45 AM", checkOut: null, status: "Late" },
  { id: "EMP001", name: "Rajesh Kumar", avatar: "", department: "Engineering", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present" },
  { id: "EMP002", name: "Priya Sharma", avatar: "", department: "HR", checkIn: "08:45 AM", checkOut: null, status: "In Office" },
  { id: "EMP003", name: "Vikram Singh", avatar: "", department: "Finance", checkIn: null, checkOut: null, status: "Absent" },
  { id: "EMP004", name: "Ananya Reddy", avatar: "", department: "Marketing", checkIn: "09:45 AM", checkOut: null, status: "Late" },
  { id: "EMP001", name: "Rajesh Kumar", avatar: "", department: "Engineering", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present" },
  { id: "EMP002", name: "Priya Sharma", avatar: "", department: "HR", checkIn: "08:45 AM", checkOut: null, status: "In Office" },
  { id: "EMP003", name: "Vikram Singh", avatar: "", department: "Finance", checkIn: null, checkOut: null, status: "Absent" },
  { id: "EMP004", name: "Ananya Reddy", avatar: "", department: "Marketing", checkIn: "09:45 AM", checkOut: null, status: "Late" },
  { id: "EMP001", name: "Rajesh Kumar", avatar: "", department: "Engineering", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present" },
  { id: "EMP002", name: "Priya Sharma", avatar: "", department: "HR", checkIn: "08:45 AM", checkOut: null, status: "In Office" },
  { id: "EMP003", name: "Vikram Singh", avatar: "", department: "Finance", checkIn: null, checkOut: null, status: "Absent" },
  { id: "EMP004", name: "Ananya Reddy", avatar: "", department: "Marketing", checkIn: "09:45 AM", checkOut: null, status: "Late" },
  // Add more rows...
];

export default function CheckInOutMonitorPage() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logic (client-side for now – move to server/API later)
  const filteredEmployees = mockEmployees.filter((emp) =>
    `${emp.name} ${emp.id} ${emp.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
      case "In Office":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Late":
         return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Absent":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Check-in / Check-out Monitor
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time attendance tracking • Updates every 30 seconds
          </p>
        </div>

        {/* Export buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters: Search + Date Picker */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID or department..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset to page 1 on search
            }}
            className="pl-9"
          />
        </div>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setPage(1);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Table Card */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent key={page}> 
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px]">Employee</TableHead>
                  <TableHead >ID</TableHead>
                  <TableHead >Department</TableHead>
                  <TableHead >Check-in</TableHead>
                  <TableHead >Check-out</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEmployees.length === 0 ? (
                  <TableRow key = "empty">
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedEmployees.map((emp) => (
                    <TableRow key={emp.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={emp.avatar} alt={emp.name} />
                            <AvatarFallback>{emp.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{emp.name}</div>
                            <div className="text-xs text-muted-foreground">{emp.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{emp.id}</TableCell>
                      <TableCell>{emp.department}</TableCell>
                      <TableCell>{emp.checkIn || "—"}</TableCell>
                      <TableCell>{emp.checkOut || "—"}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={cn("capitalize", getStatusColor(emp.status))}
                        >
                          {emp.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}