'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ChartFilter } from './chart-filter';

const INDIA_LOCATIONS = ['Chennai', 'Madurai'];
const GLOBAL_LOCATIONS = [
  'Singapore HQ', 'Europe', 'Tradehub SG', 'Chennai', 'Madurai',
  'Brasil', 'Iraq', 'USA', 'Dubai', 'Guyana', 'Oman',
];

export function AttendanceTrendBar() {
  const [filter, setFilter] = useState<'7days' | 'month'>('7days');
  const [scope, setScope] = useState<'india' | 'global'>('india');

  const locations = scope === 'india' ? INDIA_LOCATIONS : GLOBAL_LOCATIONS;

  // mock data generation 
  const data = locations.map((loc, index) => {
    const base = scope === 'india' ? 25 : 12;
    return {
      location: loc.length > 13 ? loc.slice(0, 13) + '…' : loc,
      present: Math.floor(base + Math.random() * 18) + 8,
      late: Math.floor(Math.random() * 7),
      absent: Math.floor(Math.random() * 9),
    };
  });

  return (
    <div className="bg-white p-6 border border-primary h-full flex flex-col  hover:border-emerald-300 rounded-2xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Attendance Trend by Location</h3>
          <p className="text-sm text-gray-400 mt-0.5">
            {scope === 'india' ? 'India offices' : 'Global offices'}
          </p>
        </div>

        {/* Scope Toggle */}
        <div className="flex bg-gray-100 rounded-2xl p-1 text-xs font-medium">
          <button
            onClick={() => setScope('india')}
            className={`px-5 py-2 rounded-xl transition-all ${scope === 'india' ? 'bg-white shadow-sm' : 'text-gray-500'
              }`}
          >
            India
          </button>
          <button
            onClick={() => setScope('global')}
            className={`px-5 py-2 rounded-xl transition-all ${scope === 'global' ? 'bg-white shadow-sm' : 'text-gray-500'
              }`}
          >
            Global
          </button>
        </div>

        <ChartFilter value={filter} onChange={setFilter} />
      </div>

      <div className="flex-1 min-h-85">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6} barCategoryGap="28%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
            <XAxis
              dataKey="location"
              angle={-35}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 11, fill: '#6b7280' }}
            />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
            <Tooltip />
            <Bar dataKey="present" fill="#6BCC22" name="Present" radius={[4, 4, 0, 0]} />
            <Bar dataKey="late" fill="#f59e0b" name="Late" radius={[4, 4, 0, 0]} />
            <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}