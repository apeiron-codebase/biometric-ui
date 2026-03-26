'use client';

import { ArrowUpRight } from 'lucide-react';

interface HistoryRecord {
  date: string;
  in: string;
  out: string;
  hours: string;
  loc: string;
  status: string;
  color: string;
}

interface HistoryTableProps {
  records: HistoryRecord[];
}

export function HistoryTable({ records }: HistoryTableProps) {
  return (
    <div className="bg-[#f1f7ec] rounded-4xl p-8 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Attendance History</h3>
        <button className="text-sm font-semibold text-[#5ab81e] flex items-center gap-1 hover:underline">
          View Monthly Map <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-150">
          <thead>
            <tr className="border-b border-gray-200/50">
              <th className="text-left pb-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase">DATE</th>
              <th className="text-left pb-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase">CHECK-IN</th>
              <th className="text-left pb-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase">CHECK-OUT</th>
              <th className="text-left pb-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase">TOTAL HOURS</th>
              <th className="text-left pb-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase">LOCATION</th>
              <th className="text-right pb-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/30">
            {records.map((record, i) => (
              <tr key={i}>
                <td className="py-5 font-medium text-gray-900">{record.date}</td>
                <td className="py-5 text-gray-700">{record.in}</td>
                <td className="py-5 text-gray-700">{record.out}</td>
                <td className="py-5 font-semibold text-gray-900">{record.hours}</td>
                <td className="py-5 text-gray-700">{record.loc}</td>
                <td className="py-5 text-right">
                  <span className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${record.color}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="text-sm font-semibold text-gray-600 hover:text-gray-900">
          Show All Records (32)
        </button>
      </div>
    </div>
  );
}