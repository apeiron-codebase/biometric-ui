'use client';

import { AttendanceKPICards } from '@/components/attendance/kpi-card';
import { AttendanceDonut } from '@/components/attendance/attendance-donut';
import { AttendanceTrendBar } from '@/components/attendance/attendance-trend-bar';
import { AttendanceRegistryTable } from '@/components/attendance/attendance-registry-table';
import { RightPanel } from '@/components/attendance/right-panel';

const today = new Date(2026, 2, 24);

export default function AttendancePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Main Content Area - Takes remaining space and stays stable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6 lg:p-4">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-lg font-bold text-gray-900">Attendance Insights</h1>
            <p className="text-gray-400 mt-1 text-sm">
              {today.toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          </div>

          {/* KPI Cards */}
          <AttendanceKPICards />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols- gap-6 mt-10">
            <AttendanceDonut />
            <AttendanceTrendBar />
          </div>

          {/* Table */}
          <div className="mt-12">
            <AttendanceRegistryTable />
          </div>
        </div>
      </div>

      {/* Right Panel - Fixed position, independent of left sidebar */}
      <RightPanel />
    </div>
  );
}