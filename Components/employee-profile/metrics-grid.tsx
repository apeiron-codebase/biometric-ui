'use client';

import { Activity, Umbrella, Clock, TrendingUp } from 'lucide-react';

interface MetricsGridProps {
  status: string;
  totalLeaves: string;
  avgCheckIn: string;
  attendanceRate: string;
}

export function MetricsGrid({ status, totalLeaves, avgCheckIn, attendanceRate }: MetricsGridProps) {
  const [time, period] = avgCheckIn.split(' ');

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <div className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
        <Activity className="w-6 h-6 text-[#6BCC22]" />
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">CURRENT STATUS</p>
          <p className="text-3xl font-bold text-gray-900">{status}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
        <Umbrella className="w-6 h-6 text-[#6BCC22]" />
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">TOTAL LEAVES</p>
          <p className="text-3xl font-bold text-gray-900">{totalLeaves} <span className="text-sm text-gray-400 font-medium">Days</span></p>
        </div>
      </div>

      <div className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
        <Clock className="w-6 h-6 text-[#6BCC22]" />
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">AVG. CHECK-IN</p>
          <p className="text-3xl font-bold text-gray-900">{time} <span className="text-sm text-gray-400 font-medium">{period}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
        <TrendingUp className="w-6 h-6 text-gray-400" />
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">ATTENDANCE %</p>
          <p className="text-3xl font-bold text-gray-900">{attendanceRate}</p>
        </div>
      </div>
    </div>
  );
}