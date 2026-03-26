// components/employee-profile/profile-modal.tsx
'use client';

import { useEffect, useState } from 'react';
import { ProfileHeader } from './profile-header';
import { IdentityCard } from './identity-card';
import { DetailsCard } from './details-card';
import { MetricsGrid } from './metrics-grid';
import { HistoryTable } from './histtory-table';

interface ProfileModalProps {
  employeeId: string;
  onClose: () => void;
}

export function ProfileModal({ employeeId, onClose }: ProfileModalProps) {
  // Mock fetch based on employeeId
  const [isLoading, setIsLoading] = useState(true);
  
  const mockEmployeeData = {
    name: "Alexander Sterling",
    initials: "AS",
    role: "Senior Operations Strategist",
    id: employeeId,
    level: "L5 Senior",
    department: "Strategic Logistics",
    reportsTo: "Elena Vance",
    joinDate: "March 14, 2021",
    location: "Main Campus, Wing A",
    status: "Active",
    totalLeaves: "04",
    avgCheckIn: "08:42 AM",
    attendanceRate: "98.4%",
    history: [
      { date: 'Oct 24, 2023', in: '08:30 AM', out: '05:45 PM', hours: '9h 15m', loc: 'HQ - Floor 4', status: 'ON TIME', color: 'bg-[#e5f5da] text-[#5ab81e]' },
      { date: 'Oct 23, 2023', in: '09:15 AM', out: '06:00 PM', hours: '8h 45m', loc: 'Remote - Home', status: 'LATE (15M)', color: 'bg-red-100 text-red-600' },
      { date: 'Oct 22, 2023', in: '08:45 AM', out: '05:30 PM', hours: '8h 45m', loc: 'HQ - Floor 4', status: 'ON TIME', color: 'bg-[#e5f5da] text-[#5ab81e]' },
    ]
  };

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [employeeId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      {/* Modal Container */}
      <div 
        className="bg-white rounded-4xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6BCC22]"></div>
          </div>
        ) : (
          <div className="p-8 sm:p-10">
            <ProfileHeader onClose={onClose} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <IdentityCard 
                name={mockEmployeeData.name}
                initials={mockEmployeeData.initials}
                role={mockEmployeeData.role}
                id={mockEmployeeData.id}
                level={mockEmployeeData.level}
              />
              
              <DetailsCard 
                department={mockEmployeeData.department}
                reportsTo={mockEmployeeData.reportsTo}
                joinDate={mockEmployeeData.joinDate}
                location={mockEmployeeData.location}
              />
            </div>

            <MetricsGrid 
              status={mockEmployeeData.status}
              totalLeaves={mockEmployeeData.totalLeaves}
              avgCheckIn={mockEmployeeData.avgCheckIn}
              attendanceRate={mockEmployeeData.attendanceRate}
            />

            <HistoryTable records={mockEmployeeData.history} />
          </div>
        )}
      </div>
    </div>
  );
}