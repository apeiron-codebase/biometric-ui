'use client';

import { MapPin } from 'lucide-react';

interface DetailsCardProps {
  department: string;
  reportsTo: string;
  joinDate: string;
  location: string;
}

export function DetailsCard({ department, reportsTo, joinDate, location }: DetailsCardProps) {
  return (
    <div className="lg:col-span-8 bg-[#f1f7ec] rounded-4xl p-8 flex flex-col justify-between">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Employment Details</h3>
      
      <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8">
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">DEPARTMENT</p>
          <p className="font-medium text-gray-900">{department}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">REPORTS TO</p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center text-white text-[10px]">EV</div>
            <p className="font-medium text-gray-900">{reportsTo}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">DATE OF JOINING</p>
          <p className="font-medium text-gray-900">{joinDate}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">WORK LOCATION</p>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#6BCC22]" />
            <p className="font-medium text-gray-900">{location}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#e5f0df] rounded-2xl p-5">
        <div className="flex justify-between items-end mb-3">
          <p className="text-sm font-semibold text-gray-800">Probation Progress</p>
          <p className="text-sm font-bold text-[#5ab81e]">Completed</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-[#6BCC22] h-2.5 rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}