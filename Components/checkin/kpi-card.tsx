'use client';

import { Users, UserCheck, Building2, UserX, Clock } from 'lucide-react';

type Props = {
  total: number;
  present: number;
  inOffice: number;
  absent: number;
  late: number;
};

export default function KPICards({
  total,
  present,
  inOffice,
  absent,
  late,
}: Props) {
  const DATA = [
    {
      label: 'TOTAL EMPLOYEES',
      value: total,
      sub: 'All employees',
      icon: Users,
      color: 'text-gray-700',
      bg: 'bg-gray-100',
    },
    {
      label: 'IN OFFICE',
      value: inOffice,
      sub: 'Currently active',
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'ABSENT',
      value: absent,
      sub: 'Not checked in',
      icon: UserX,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'LATE CHECK-INS',
      value: late,
      sub: 'After shift start',
      icon: Clock,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {DATA.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 border border-primary hover:border-emerald-300 hover:shadow-md transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                {card.label}
              </p>

              <div
                className={`p-2.5 rounded-xl ${card.bg} group-hover:scale-110 transition-transform`}
              >
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>

            {/* Value */}
            <p
              className={`text-4xl font-semibold ${card.color} leading-none mb-1`}
            >
              {card.value}
            </p>

            {/* Subtext */}
            <p className="text-xs text-gray-500">{card.sub}</p>
          </div>
        );
      })}
    </div>
  );
}