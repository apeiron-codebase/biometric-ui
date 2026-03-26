'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartFilter } from './chart-filter';

const COLORS = ['#6BCC22', '#ef4444', '#f59e0b', '#8b5cf6'];

const todayBreakdown = [
  { name: 'Present', value: 21, percent: 70 },
  { name: 'Absent', value: 9, percent: 30 },
  { name: 'Late', value: 0, percent: 0 },
  { name: 'Half Day', value: 2, percent: 6 },
];

const monthBreakdown = [
  { name: 'Present', value: 642, percent: 68 },
  { name: 'Absent', value: 218, percent: 23 },
  { name: 'Late', value: 45, percent: 5 },
  { name: 'Half Day', value: 35, percent: 4 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-lg text-xs">
      <span style={{ color: p.payload.fill }} className="font-semibold">{p.name}</span>
      <span className="text-gray-600 ml-1.5">{p.value} employees</span>
    </div>
  );
};

export function AttendanceDonut() {
  const [filter, setFilter] = useState<'7days' | 'month'>('7days');
  const data = filter === '7days' ? todayBreakdown : monthBreakdown;

  return (
    <div className="bg-white p-6 border border-primary  hover:border-emerald-300 transition-shadow rounded-2xl">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Attendance Breakdown</h3>
          <p className="text-sm text-gray-400 mt-0.5">Current office location data</p>
        </div>
        <ChartFilter value={filter} onChange={setFilter} />
      </div>

      <div className="flex items-center gap-6">

        {/* Donut */}
        <div className="relative shrink-0 w-52 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={62} outerRadius={82}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                startAngle={90} endAngle={-270}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold text-gray-900">{data[0].percent}%</span>
            <span className="text-sm text-gray-400 mt-0.5">Present</span>
          </div>
        </div>

        {/* Legend with progress bars */}
        <div className="flex-1 space-y-3.5">
          {data.map((entry, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ background: COLORS[i] }}
                  />
                  {entry.name}
                </span>
                <span className="text-sm font-bold text-gray-800">
                  {entry.value}
                  <span className="text-xs font-normal text-gray-400 ml-1">({entry.percent}%)</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${entry.percent}%`, background: COLORS[i] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}