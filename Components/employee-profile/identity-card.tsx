'use client';

interface IdentityCardProps {
  name: string;
  role: string;
  id: string;
  level: string;
  initials: string;
}

export function IdentityCard({ name, role, id, level, initials }: IdentityCardProps) {
  return (
    <div className="lg:col-span-4 bg-[#f1f7ec] rounded-4xl p-8 flex flex-col items-center text-center">
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full bg-[#1b3b4b] overflow-hidden border-4 border-white shadow-md flex items-center justify-center text-white text-3xl font-bold">
           {initials}
        </div>
        <div className="absolute bottom-0 right-0 bg-[#6BCC22] text-white text-[10px] font-bold px-3 py-1 rounded-full border-2 border-white flex items-center gap-1 shadow-sm">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          In Office
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
      <p className="text-[#5ab81e] font-semibold text-sm mt-1">{role}</p>
      
      <div className="flex w-full mt-8 pt-6 border-t border-gray-200/50 justify-center gap-12">
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">EMP ID</p>
          <p className="font-semibold text-gray-900">{id}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">LEVEL</p>
          <p className="font-semibold text-gray-900">{level}</p>
        </div>
      </div>
    </div>
  );
}