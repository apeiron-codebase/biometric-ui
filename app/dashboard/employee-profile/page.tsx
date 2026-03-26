// app/dashboard/employee-profile/page.tsx
'use client';

import { useState } from 'react';
import { Search, Download, ChevronDown } from 'lucide-react';
import { ProfileModal } from '@/components/employee-profile/profile-modal';

interface Employee {
  id: string;
  name: string;
  avatarColor: string;
  initials: string;
  code: string;
  department: string;
  checkIn: string;
  checkOut: string;
  location: string;
  status: 'Active' | 'In Office' | 'Absent' | 'Deactive';
}

const mockEmployees: Employee[] = [
  { id: '1', name: 'Rajesh Kumar', avatarColor: 'bg-orange-600', initials: 'RK', code: 'E001', department: 'Engineering', checkIn: '09:12', checkOut: '18:45', location: 'Chennai HQ', status: 'Active' },
  { id: '2', name: 'Priya Sharma', avatarColor: 'bg-emerald-600', initials: 'PS', code: 'E042', department: 'HR', checkIn: '08:55', checkOut: '-', location: 'Remote', status: 'In Office' },
  { id: '3', name: 'Arjun Menon', avatarColor: 'bg-blue-600', initials: 'AM', code: 'E117', department: 'Sales', checkIn: '10:05', checkOut: '17:30', location: 'Coimbatore', status: 'Active' },
  { id: '4', name: 'Sneha R', avatarColor: 'bg-gray-600', initials: 'SR', code: 'E089', department: 'Marketing', checkIn: '-', checkOut: '-', location: 'Leave', status: 'Absent' },
  { id: '5', name: 'Vikram Singh', avatarColor: 'bg-slate-700', initials: 'VS', code: 'E256', department: 'Engineering', checkIn: '09:30', checkOut: '-', location: 'Bangalore', status: 'In Office' },
  { id: '6', name: 'Employee 6', avatarColor: 'bg-purple-600', initials: 'E6', code: 'E300', department: 'Engineering', checkIn: '09:00', checkOut: '18:00', location: 'Chennai', status: 'Active' },
  { id: '7', name: 'Employee 7', avatarColor: 'bg-pink-600', initials: 'E7', code: 'E301', department: 'Sales', checkIn: '09:00', checkOut: '18:00', location: 'Chennai', status: 'In Office' },
  { id: '8', name: 'Employee 8', avatarColor: 'bg-yellow-600', initials: 'E8', code: 'E302', department: 'HR', checkIn: '09:00', checkOut: '18:00', location: 'Chennai', status: 'Absent' },
  { id: '9', name: 'Employee 9', avatarColor: 'bg-teal-600', initials: 'E9', code: 'E303', department: 'Marketing', checkIn: '09:00', checkOut: '18:00', location: 'Chennai', status: 'Deactive' },
  { id: '10', name: 'Employee 10', avatarColor: 'bg-indigo-600', initials: 'E1', code: 'E304', department: 'Finance', checkIn: '09:00', checkOut: '18:00', location: 'Chennai', status: 'Active' },
];

export default function EmployeeProfileDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const filteredEmployees = mockEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'border-emerald-200 bg-emerald-50 text-emerald-600';
      case 'In Office': return 'border-blue-200 bg-blue-50 text-blue-600';
      case 'Absent': return 'border-red-200 bg-red-50 text-red-600';
      case 'Deactive': return 'border-orange-200 bg-orange-50 text-orange-600';
      default: return 'border-gray-200 bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
    <h1 className="text-lg font-bold text-gray-900">Employees</h1>
      {/* Top Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 gap-6 items-center">
          <div className="space-y-1 w-full max-w-xs">
            <label className="text-sm font-semibold text-gray-700">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Name, code, department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#6BCC22]/20 focus:border-[#6BCC22] outline-none"
              />
            </div>
          </div>

          <div className="space-y-1 w-48">
            <label className="text-sm font-semibold text-gray-700">Status</label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#6BCC22]/20 focus:border-[#6BCC22] outline-none cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="In Office">In Office</option>
                <option value="Absent">Absent</option>
                <option value="Deactive">Deactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#6BCC22] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 font-semibold text-gray-900">Employee</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Emp Code</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Department</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Check-in</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Check-out</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Location</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((emp) => (
                <tr 
                  key={emp.id} 
                  onClick={() => setSelectedEmployeeId(emp.code)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${emp.avatarColor}`}>
                        {emp.initials}
                      </div>
                      <span className="font-semibold text-gray-900">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{emp.code}</td>
                  <td className="px-6 py-3 text-gray-600">{emp.department}</td>
                  <td className="px-6 py-3 text-gray-600">{emp.checkIn}</td>
                  <td className="px-6 py-3 text-gray-600">{emp.checkOut}</td>
                  <td className="px-6 py-3 text-gray-600">{emp.location}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded border ${getStatusBadge(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedEmployeeId && (
        <ProfileModal 
          employeeId={selectedEmployeeId} 
          onClose={() => setSelectedEmployeeId(null)} 
        />
      )}
    </div>
  );
}