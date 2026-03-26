'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Users, UserCheck, UserX, Clock, Clock3, X } from 'lucide-react';

const todayData = {
  total: 30,
  present: 21,
  absent: 9,
  late: 0,
  halfDay: 2,
};

const last30DaysData = {
  present: 642,
  absent: 218,
  rate: '70%',
};

const weekTrend = [
  { day: 'Wed', present: 24, absent: 6, late: 2 },
  { day: 'Thu', present: 22, absent: 8, late: 3 },
  { day: 'Fri', present: 23, absent: 7, late: 1 },
  { day: 'Sat', present: 18, absent: 12, late: 0 },
  { day: 'Sun', present: 0,  absent: 30, late: 0 },
  { day: 'Mon', present: 25, absent: 5,  late: 4 },
  { day: 'Tue', present: 21, absent: 9,  late: 0 },
];

type CardId = 'total' | 'present' | 'absent' | 'late' | 'halfday';

const CARD_CONFIG = [
  {
    id: 'total' as CardId,
    label: 'TOTAL EMPLOYEES',
    value: todayData.total,
    sub: 'All departments',
    icon: Users,
    color: 'text-gray-700',
    bg: 'bg-gray-100',
    barKey: 'present',
    barColor: '#6BCC22',
  },
  {
    id: 'present' as CardId,
    label: 'PRESENT',
    value: todayData.present,
    sub: `${last30DaysData.rate} last 30 days`,
    icon: UserCheck,
    color: 'text-[#5ab81e]',
    bg: 'bg-[#f0fce4]',
    barKey: 'present',
    barColor: '#6BCC22',
  },
  {
    id: 'absent' as CardId,
    label: 'ABSENT',
    value: todayData.absent,
    sub: `${last30DaysData.absent} last 30 days`,
    icon: UserX,
    color: 'text-red-600',
    bg: 'bg-red-50',
    barKey: 'absent',
    barColor: '#ef4444',
  },
  {
    id: 'late' as CardId,
    label: 'LATE ARRIVALS',
    value: todayData.late,
    sub: 'After 9:30 AM',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    barKey: 'late',
    barColor: '#f59e0b',
  },
  {
    id: 'halfday' as CardId,
    label: 'HALF DAY',
    value: todayData.halfDay,
    sub: 'This month',
    icon: Clock3,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    barKey: 'present',
    barColor: '#8b5cf6',
  },
];

interface PopoutProps {
  card: (typeof CARD_CONFIG)[number];
  onClose: () => void;
}

function CardPopout({ card, onClose }: PopoutProps) {
  const Icon = card.icon;
  const avg = Math.round(weekTrend.reduce((s, d) => s + (d[card.barKey as keyof typeof d] as number), 0) / weekTrend.length);
  const peak = Math.max(...weekTrend.map(d => d[card.barKey as keyof typeof d] as number));

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${card.bg}`}>
              <Icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div>
              <h2 className="font-bold text-md text-gray-900">{card.label}</h2>
              <p className="text-xs text-gray-500">Last 7 days trend</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 px-6 py-5 border-b">
          {[
            { label: 'Today', value: card.value },
            { label: '7-day Avg', value: avg },
            { label: 'Peak', value: peak },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-[10px] text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="px-6 pb-6">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekTrend} barSize={26}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 12, 
                  border: 'none', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }} 
              />
              <Bar
                dataKey={card.barKey}
                fill={card.barColor}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-2xl transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function AttendanceKPICards() {
  const [activeCard, setActiveCard] = useState<CardId | null>(null);
  const active = CARD_CONFIG.find(c => c.id === activeCard);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {CARD_CONFIG.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className="bg-white rounded-2xl p-5 border hover:border-emerald-300 border-primary hover:shadow transition-all text-left group active:scale-[0.985]"
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                  {card.label}
                </p>
                <div className={`p-2.5 rounded-xl ${card.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>

              <p className={`text-4xl font-semibold ${card.color} leading-none mb-1`}>
                {card.value}
              </p>
              <p className="text-xs text-gray-500">{card.sub}</p>

              <div className="mt-4 text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                View weekly trend →
              </div>
            </button>
          );
        })}
      </div>

      {active && <CardPopout card={active} onClose={() => setActiveCard(null)} />}
    </>
  );
}