// components/employee-profile/profile-header.tsx
'use client';

import { Download, FileText, X } from 'lucide-react';

interface ProfileHeaderProps {
  onClose: () => void;
}

export function ProfileHeader({ onClose }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employee Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Monitoring attendance and performance metrics for the current cycle.</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#6BCC22] hover:bg-[#5ab81e] text-white text-sm font-semibold rounded-2xl transition-colors shadow-sm">
          <FileText className="w-4 h-4" /> Export to PDF
        </button>
        <div className="w-px h-8 bg-gray-200 mx-2 hidden sm:block"></div>
        <button 
          onClick={onClose}
          className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}