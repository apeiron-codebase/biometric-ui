'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  PaginationState,
} from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// types
import { EmployeeRecord, StatusFilter } from './types';

// components
import Filters from '@/components/checkin/filters';
import ExportButtons from '@/components/checkin/export-buttons';
import EmployeeTable, { useCheckInColumns } from '@/components/checkin/employee-table';
import PaginationControls from '@/components/checkin/pagination-controls';
import KPICards from '@/components/checkin/kpi-card';

//title dd/mm/yyyy
const today = new Date(2026, 2, 24);

export default function CheckInOutPage() {
  const [records, setRecords] = useState<EmployeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // --- Fetch --------------------------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      const mock: EmployeeRecord[] = [
        { code: 'E001', name: 'Rajesh Kumar', avatar: 'https://i.pravatar.cc/48?u=1', department: 'Engineering', checkin: '09:12', checkout: '18:45', location: 'Chennai HQ', status: 'Active' },
        { code: 'E042', name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/48?u=2', department: 'HR', checkin: '08:55', checkout: '-', location: 'Remote', status: 'In Office' },
        { code: 'E117', name: 'Arjun Menon', avatar: 'https://i.pravatar.cc/48?u=3', department: 'Sales', checkin: '10:05', checkout: '17:30', location: 'Coimbatore', status: 'Active' },
        { code: 'E089', name: 'Sneha R', avatar: 'https://i.pravatar.cc/48?u=4', department: 'Marketing', checkin: '-', checkout: '-', location: 'Leave', status: 'Absent' },
        { code: 'E256', name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/48?u=5', department: 'Engineering', checkin: '09:30', checkout: '-', location: 'Bangalore', status: 'In Office' },
        ...Array.from({ length: 25 }, (_, i) => ({
          code: `E${300 + i}`,
          name: `Employee ${i + 6}`,
          avatar: `https://i.pravatar.cc/48?u=${i + 6}`,
          department: ['Engineering', 'Sales', 'HR', 'Marketing', 'Finance'][i % 5],
          checkin: '09:00',
          checkout: '18:00',
          location: 'Chennai',
          status: ['Active', 'In Office', 'Absent', 'Deactive'][i % 4],
        })),
      ];
      setRecords(mock);
      setLoading(false);
    };
    fetchData();
  }, []);

  // --- Stats --------------------------
  const stats = useMemo(() => ({
    total: records.length,
    present: records.filter(r => r.status === 'Active' || r.status === 'In Office').length,
    absent: records.filter(r => r.status === 'Absent').length,
    inOffice: records.filter(r => r.status === 'In Office').length,
  }), [records]);

  // --- Filtered Data --------------------
  const filteredData = useMemo(() => {
    let data = records;
    if (statusFilter !== 'All') data = data.filter(r => r.status === statusFilter);
    if (globalFilter) {
      const term = globalFilter.toLowerCase();
      data = data.filter(row =>
        Object.values(row).some(v => String(v).toLowerCase().includes(term))
      );
    }
    return data;
  }, [records, statusFilter, globalFilter]);

  // --- Table ---------------------------
  const columns = useCheckInColumns();
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  // --- Filter Handlers (reset to page 1) ------------------
  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
    table.setPageIndex(0);
  };
  const handleStatusFilterChange = (value: StatusFilter) => {
    setStatusFilter(value);
    table.setPageIndex(0);
  };

  // --- CSV Export ---------------------------
  const exportToCSV = () => {
    if (!filteredData.length) return;
    const headers = ['Emp Code', 'Name', 'Department', 'Check-in', 'Check-out', 'Location', 'Status'];
    const rows = filteredData.map(r => [
      r.code, `"${r.name.replace(/"/g, '""')}"`,
      r.department, r.checkin, r.checkout, r.location, r.status,
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checkin-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // --- PDF Export -------------------
  const exportToPDF = () => {
    if (!filteredData.length) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Check-in / Check-out Report', 14, 20);
    doc.setFontSize(11);
    doc.text(`Date: ${new Date().toLocaleDateString()} | Filter: ${statusFilter}`, 14, 28);
    autoTable(doc, {
      startY: 38,
      head: [['Emp Code', 'Name', 'Dept', 'Check-in', 'Check-out', 'Location', 'Status']],
      body: filteredData.map(r => [r.code, r.name, r.department, r.checkin, r.checkout, r.location, r.status]),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 9 },
    });
    doc.save(`checkin-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // --- Loading ---------------------------
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // --- Render --------------------------
  return (
  <div className="space-y-6 p-2">

    <div className="mb-8">
            <h1 className="text-lg font-bold text-gray-900">Workforce Activity Monitor</h1>
            <p className="text-gray-400 mt-1 text-sm">
              {today.toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          </div>

    {/* KPI CARDS */}
    <KPICards
      total={stats.total}
      present={stats.present}
      inOffice={stats.inOffice}
      absent={stats.absent}
      late={Math.floor(stats.present * 0.2)} // mock late logic
    />

    {/* FILTER + EXPORT */}
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border p-4 rounded-xl">
      <Filters
        globalFilter={globalFilter}
        onGlobalFilterChange={handleGlobalFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
      />

      <ExportButtons
        onExportCSV={exportToCSV}
        onExportPDF={exportToPDF}
        hasData={filteredData.length > 0}
      />
    </div>

    {/* TABLE */}
    <div className="border border-primary rounded-xl overflow-hidden">
      <EmployeeTable table={table} columnCount={columns.length} />
    </div>

    {/* PAGINATION */}
    <div className="border border-[#6BCC22]/20 rounded-xl p-2">
      <PaginationControls
        table={table}
        totalFiltered={filteredData.length}
      />
    </div>
  </div>
);
}