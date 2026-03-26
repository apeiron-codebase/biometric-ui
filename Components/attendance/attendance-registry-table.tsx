'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Columns, Download, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  avatarColor: string;
  initials: string;
  code: string;
  department: string;
  checkIn: string;
  checkOut: string | null;
  location: string;
  status: 'Present' | 'Late' | 'Absent' | 'Half Day' | 'On Leave';
  leavesTaken: number;
  recordDate: string;
}

const LOCATIONS = [
  'Chennai HQ', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Coimbatore', 'Trichy',
];

const STATUSES = ['Present', 'Late', 'Absent', 'Half Day', 'On Leave'] as const;

const mockEmployees: Employee[] = [
  { id: '1', name: 'Alex Morgan', avatarColor: 'bg-emerald-500', initials: 'AM', code: 'STR-1042', department: 'Engineering', checkIn: '08:45 AM', checkOut: '05:30 PM', location: 'Chennai HQ', status: 'Present', leavesTaken: 3, recordDate: '2026-03-24' },
  { id: '2', name: 'Sarah Chen', avatarColor: 'bg-blue-500', initials: 'SC', code: 'STR-2210', department: 'Design', checkIn: '09:12 AM', checkOut: '05:00 PM', location: 'Bangalore', status: 'Present', leavesTaken: 1, recordDate: '2026-03-24' },
  { id: '3', name: 'Jordan Walker', avatarColor: 'bg-purple-500', initials: 'JW', code: 'STR-0988', department: 'Marketing', checkIn: '--', checkOut: '--', location: 'Mumbai', status: 'Absent', leavesTaken: 5, recordDate: '2026-03-24' },
  { id: '4', name: 'David Park', avatarColor: 'bg-amber-500', initials: 'DP', code: 'STR-1156', department: 'Engineering', checkIn: '08:58 AM', checkOut: '06:00 PM', location: 'Hyderabad', status: 'Present', leavesTaken: 0, recordDate: '2026-03-24' },
  { id: '5', name: 'Priya Sharma', avatarColor: 'bg-pink-500', initials: 'PS', code: 'STR-3341', department: 'HR', checkIn: '09:35 AM', checkOut: '05:15 PM', location: 'Chennai HQ', status: 'Late', leavesTaken: 2, recordDate: '2026-03-24' },
  { id: '6', name: 'Michael Rao', avatarColor: 'bg-teal-500', initials: 'MR', code: 'STR-7729', department: 'Finance', checkIn: '--', checkOut: '--', location: 'Delhi', status: 'On Leave', leavesTaken: 8, recordDate: '2026-03-24' },
  { id: '3', name: 'Jordan Walker', avatarColor: 'bg-purple-500', initials: 'JW', code: 'STR-0988', department: 'Marketing', checkIn: '--', checkOut: '--', location: 'Mumbai', status: 'Absent', leavesTaken: 5, recordDate: '2026-03-24' },
  { id: '4', name: 'David Park', avatarColor: 'bg-amber-500', initials: 'DP', code: 'STR-1156', department: 'Engineering', checkIn: '08:58 AM', checkOut: '06:00 PM', location: 'Hyderabad', status: 'Present', leavesTaken: 0, recordDate: '2026-03-24' },
  { id: '5', name: 'Priya Sharma', avatarColor: 'bg-pink-500', initials: 'PS', code: 'STR-3341', department: 'HR', checkIn: '09:35 AM', checkOut: '05:15 PM', location: 'Chennai HQ', status: 'Late', leavesTaken: 2, recordDate: '2026-03-24' },
  { id: '6', name: 'Michael Rao', avatarColor: 'bg-teal-500', initials: 'MR', code: 'STR-7729', department: 'Finance', checkIn: '--', checkOut: '--', location: 'Delhi', status: 'On Leave', leavesTaken: 8, recordDate: '2026-03-24' },
  { id: '4', name: 'David Park', avatarColor: 'bg-amber-500', initials: 'DP', code: 'STR-1156', department: 'Engineering', checkIn: '08:58 AM', checkOut: '06:00 PM', location: 'Hyderabad', status: 'Present', leavesTaken: 0, recordDate: '2026-03-24' },
  { id: '5', name: 'Priya Sharma', avatarColor: 'bg-pink-500', initials: 'PS', code: 'STR-3341', department: 'HR', checkIn: '09:35 AM', checkOut: '05:15 PM', location: 'Chennai HQ', status: 'Late', leavesTaken: 2, recordDate: '2026-03-24' },
  { id: '6', name: 'Michael Rao', avatarColor: 'bg-teal-500', initials: 'MR', code: 'STR-7729', department: 'Finance', checkIn: '--', checkOut: '--', location: 'Delhi', status: 'On Leave', leavesTaken: 8, recordDate: '2026-03-24' },

];

export function AttendanceRegistryTable() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'employee', 'code', 'department', 'checkIn', 'checkOut', 'location', 'status', 'leavesTaken',
  ]);

  // Filtering states
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [periodType, setPeriodType] = useState<'all' | 'specific' | 'month' | 'quarter' | 'year' | 'custom'>('all');
  const [specificDate, setSpecificDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Checking if any filter is active
  const hasActiveFilters =
    selectedLocations.length > 0 ||
    selectedStatuses.length > 0 ||
    periodType !== 'all' ||
    specificDate ||
    selectedMonth ||
    selectedQuarter ||
    customFrom ||
    customTo;

  const filteredEmployees = useMemo(() => {
    let result = mockEmployees;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(emp => emp.name.toLowerCase().includes(term));
    }

    if (selectedLocations.length > 0) {
      result = result.filter(emp => selectedLocations.includes(emp.location));
    }

    if (selectedStatuses.length > 0) {
      result = result.filter(emp => selectedStatuses.includes(emp.status));
    }

    if (periodType !== 'all') {
      if (periodType === 'specific' && specificDate) {
        result = result.filter(emp => emp.recordDate === specificDate);
      }
      if (periodType === 'month' && selectedMonth) {
        result = result.filter(emp => emp.recordDate.startsWith(selectedMonth));
      }
      if (periodType === 'quarter' && selectedQuarter) {
        const quarterMonths: Record<string, string[]> = { Q1: ['01', '02', '03'], Q2: ['04', '05', '06'], Q3: ['07', '08', '09'], Q4: ['10', '11', '12'] };
        result = result.filter(emp => quarterMonths[selectedQuarter]?.includes(emp.recordDate.split('-')[1]));
      }
      if (periodType === 'year' && selectedYear) {
        result = result.filter(emp => emp.recordDate.startsWith(selectedYear));
      }
      if (periodType === 'custom' && customFrom && customTo) {
        result = result.filter(emp => emp.recordDate >= customFrom && emp.recordDate <= customTo);
      }
    }

    return result;
  }, [searchTerm, selectedLocations, selectedStatuses, periodType, specificDate, selectedMonth, selectedQuarter, selectedYear, customFrom, customTo]);

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const statusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-emerald-100 text-emerald-700';
      case 'Late': return 'bg-amber-100 text-amber-700';
      case 'Absent': return 'bg-red-100 text-red-700';
      case 'Half Day': return 'bg-purple-100 text-purple-700';
      case 'On Leave': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Code', 'Department', 'Check-In', 'Check-Out', 'Location', 'Status', 'Leaves Taken'];
    const csvRows = [
      headers.join(','),
      ...filteredEmployees.map(emp => [
        `"${emp.name}"`, emp.code, emp.department, emp.checkIn, emp.checkOut || '', emp.location, emp.status, emp.leavesTaken
      ].join(',')),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const toggleColumn = (column: string) => {
    setVisibleColumns(prev =>
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    );
  };

  const clearAllFilters = () => {
    setSelectedLocations([]);
    setSelectedStatuses([]);
    setPeriodType('all');
    setSpecificDate('');
    setSelectedMonth('');
    setSelectedQuarter('');
    setCustomFrom('');
    setCustomTo('');
  };

  const handleRowClick = (code: string) => {
    router.push(`/dashboard/attendance/employee/${code}`);
  };

  return (
    <div className="bg-white border hover:border-emerald-300 border-primary rounded-2xl">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-md font-bold text-gray-900">Attendance Registry</h2>
            <p className="text-[12px] text-gray-500 mt-0.5">
              Showing {filteredEmployees.length} of {mockEmployees.length} employees
            </p>
          </div>

          {/* Export Button - stays on top right */}
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[15px] font-medium rounded-3xl transition-colors"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Unified Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, code, department, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white rounded-2xl text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-2xl text-sm font-medium transition-colors whitespace-nowrap"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <button
              onClick={() => setColumnsOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-2xl text-sm font-medium transition-colors whitespace-nowrap"
            >
              <Columns className="w-4 h-4" />
              Columns
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 px-4 py-2 text-red-600 hover:text-red-700 text-sm font-medium border border-red-200 hover:border-red-300 rounded-2xl transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-245 text-[13px]">
          <thead>
            <tr className="hover:bg-gray-50 cursor-pointer h-10">
              {visibleColumns.includes('employee') && (
                <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 tracking-wider">EMPLOYEE</th>
              )}
              {visibleColumns.includes('code') && (
                <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 tracking-wider">CODE</th>
              )}
              {visibleColumns.includes('department') && (
                <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 tracking-wider">DEPARTMENT</th>
              )}
              {visibleColumns.includes('checkIn') && (
                <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 tracking-wider">CHECK-IN</th>
              )}
              {visibleColumns.includes('checkOut') && (
                <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 tracking-wider">CHECK-OUT</th>
              )}
              {visibleColumns.includes('location') && (
                <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 tracking-wider">LOCATION</th>
              )}
              {visibleColumns.includes('status') && (
                <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 tracking-wider">STATUS</th>
              )}
              {visibleColumns.includes('leavesTaken') && (
                <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 tracking-wider">LEAVES</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedEmployees.map((emp) => (
              <tr
                key={emp.id}
                onClick={() => handleRowClick(emp.code)}
                className="hover:bg-gray-50 cursor-pointer transition-colors h-12" >
                {visibleColumns.includes('employee') && (
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-2xl flex items-center justify-center text-white text-xs font-medium ${emp.avatarColor}`}>
                        {emp.initials}
                      </div>
                      <div className="font-medium text-sm leading-tight">{emp.name}</div>
                    </div>
                  </td>
                )}
                {visibleColumns.includes('code') && (
                  <td className="px-3 py-3 font-mono text-xs text-gray-600">{emp.code}</td>
                )}
                {visibleColumns.includes('department') && (
                  <td className="px-3 py-3 text-xs text-gray-600">{emp.department}</td>
                )}
                {visibleColumns.includes('checkIn') && (
                  <td className="px-3 py-3 text-xs font-medium text-gray-700">{emp.checkIn}</td>
                )}
                {visibleColumns.includes('checkOut') && (
                  <td className="px-3 py-3 text-xs font-medium text-gray-700">{emp.checkOut || '—'}</td>
                )}
                {visibleColumns.includes('location') && (
                  <td className="px-3 py-3 text-xs text-gray-600">{emp.location}</td>
                )}
                {visibleColumns.includes('status') && (
                  <td className="px-3 py-3">
                    <span className={`inline-flex px-3 py-0.5 text-[10px] font-medium rounded-full ${statusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                )}
                {visibleColumns.includes('leavesTaken') && (
                  <td className="px-3 py-3 text-xs font-medium text-gray-600">{emp.leavesTaken}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-gray-500">Page {currentPage} of {totalPages}</p>
          <div className="flex gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 text-sm disabled:opacity-40">Prev</button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 text-sm disabled:opacity-40">Next</button>
          </div>
        </div>
      )}

      {/* FILTERS MODAL */}
      {filtersOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-70 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="px-8 py-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Customize Filters</h3>
              <button onClick={() => setFiltersOpen(false)} className="text-3xl text-gray-400">×</button>
            </div>

            <div className="p-8 space-y-10">
              {/* Period Filter */}
              <div>
                <h4 className="font-semibold mb-4">Period</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Period Type</label>
                    <select
                      value={periodType}
                      onChange={(e) => setPeriodType(e.target.value as any)}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3">
                      <option value="all">All Time</option>
                      <option value="specific">Specific Date</option>
                      <option value="month">Monthly</option>
                      <option value="quarter">Quarterly</option>
                      <option value="year">Yearly</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>

                  {periodType === 'specific' && (
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Date</label>
                      <input
                        type="date"
                        value={specificDate}
                        onChange={(e) => setSpecificDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                      />
                    </div>
                  )}

                  {periodType === 'month' && (
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Month</label>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                      >
                        <option value="">Select month</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = String(i + 1).padStart(2, '0');
                          return (
                            <option key={i} value={`2026-${month}`}>
                              {new Date(2026, i).toLocaleString('default', { month: 'long' })} 2026
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  {periodType === 'quarter' && (
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Quarter</label>
                      <select
                        value={selectedQuarter}
                        onChange={(e) => setSelectedQuarter(e.target.value)}
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                      >
                        <option value="">Select quarter</option>
                        <option value="Q1">Q1 (Jan–Mar)</option>
                        <option value="Q2">Q2 (Apr–Jun)</option>
                        <option value="Q3">Q3 (Jul–Sep)</option>
                        <option value="Q4">Q4 (Oct–Dec)</option>
                      </select>
                    </div>
                  )}

                  {periodType === 'year' && (
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Year</label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3">
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                      </select>
                    </div>
                  )}

                  {periodType === 'custom' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500 mb-2">From</label>
                        <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="w-full border border-gray-200 rounded-2xl px-4 py-3" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-2">To</label>
                        <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="w-full border border-gray-200 rounded-2xl px-4 py-3" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h4 className="font-semibold mb-3">Location ({selectedLocations.length} selected)</h4>
                <div className="grid grid-cols-3 gap-2">
                  {LOCATIONS.map(loc => (
                    <label key={loc} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc)}
                        onChange={() => {
                          setSelectedLocations(prev =>
                            prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
                          );
                        }}
                        className="w-4 h-4 accent-emerald-600"
                      />
                      {loc}
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h4 className="font-semibold mb-3">Status ({selectedStatuses.length} selected)</h4>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatuses(prev =>
                          prev.includes(status)
                            ? prev.filter(s => s !== status)
                            : [...prev, status]
                        );
                      }}
                      className={`px-4 py-2 text-xs font-medium rounded-2xl transition-all ${selectedStatuses.includes(status)
                        ? statusColor(status)
                        : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-8 py-6 border-t flex justify-between">
              <button
                onClick={() => {
                  // Reset all filters
                  setSelectedLocations([]);
                  setSelectedStatuses([]);
                  setPeriodType('all');
                  setSpecificDate('');
                  setSelectedMonth('');
                  setSelectedQuarter('');
                  setCustomFrom('');
                  setCustomTo('');
                }}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Reset All
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="px-8 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Columns Customization Modal */}
      {columnsOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-70 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md">
            <div className="px-8 py-6 border-b">
              <h3 className="text-2xl font-semibold">Customize Columns</h3>
            </div>
            <div className="p-8 space-y-4">
              {[
                { key: 'employee', label: 'Employee (name + avatar)' },
                { key: 'code', label: 'Code' },
                { key: 'department', label: 'Department' },
                { key: 'checkIn', label: 'Check-in Time' },
                { key: 'checkOut', label: 'Check-out Time' },
                { key: 'location', label: 'Location' },
                { key: 'status', label: 'Status' },
                { key: 'leavesTaken', label: 'Leaves Taken' },
              ].map(col => (
                <label key={col.key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">{col.label}</span>
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => toggleColumn(col.key)}
                    className="w-5 h-5 accent-emerald-600"
                  />
                </label>
              ))}
            </div>
            <div className="px-8 py-6 border-t flex justify-end">
              <button
                onClick={() => setColumnsOpen(false)}
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl text-sm font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}