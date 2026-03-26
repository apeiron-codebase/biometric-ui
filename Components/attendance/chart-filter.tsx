// components/attendance/chart-filter.tsx
'use client';

type FilterType = '7days' | 'month';

interface ChartFilterProps {
  value: FilterType;
  onChange: (value: FilterType) => void;
}

export function ChartFilter({ value, onChange }: ChartFilterProps) {
  return (
    <div className="flex bg-gray-100 rounded-2xl p-1 gap-0.5 flex-shrink-0">
      {(['7days', 'month'] as FilterType[]).map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
            value === opt
              ? 'bg-white shadow-sm text-gray-900'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {opt === '7days' ? 'Last 7 Days' : 'This Month'}
        </button>
      ))}
    </div>
  );
}