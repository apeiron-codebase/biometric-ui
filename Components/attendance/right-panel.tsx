'use client';

import { useState } from 'react';
import {
  Calendar, ChevronLeft, ChevronRight,
  Plus, Check, Trash2, X, ExternalLink,
} from 'lucide-react';

interface Holiday {
  date: string;
  name: string;
  day: string;
  remarks?: string;
}

const HOLIDAYS_2026: Holiday[] = [
  { date: '2026-01-01', name: "New Year's Day", day: 'Thursday' },
  { date: '2026-01-15', name: 'Pongal', day: 'Thursday' },
  { date: '2026-01-16', name: 'Thiruvalluvar Day', day: 'Friday' },
  { date: '2026-01-17', name: 'Uzhavar Thirunal', day: 'Saturday' },
  { date: '2026-01-26', name: 'Republic Day', day: 'Monday' },
  { date: '2026-03-20', name: "Ramzan (Idu'l Fitr)", day: 'Friday' },
  { date: '2026-04-14', name: "Tamil New Year's Day", day: 'Tuesday' },
  { date: '2026-05-01', name: 'May Day', day: 'Friday' },
  { date: '2026-05-28', name: 'Bakrid (Idul Azha)', day: 'Thursday' },
  { date: '2026-08-15', name: 'Independence Day', day: 'Saturday' },
  { date: '2026-10-19', name: 'Ayutha Pooja', day: 'Monday' },
  { date: '2026-11-08', name: 'Deepavali', day: 'Sunday', remarks: 'Falls on Sunday' },
  { date: '2026-11-09', name: 'Deepavali', day: 'Monday' },
  { date: '2026-12-25', name: 'Christmas', day: 'Friday' },
];

const TODAY_STR = '2026-03-24';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, text: 'Review March attendance report', done: false },
  { id: 2, text: 'Send leave approval to Arjun Menon', done: false },
  { id: 3, text: 'Update holiday calendar for Q2', done: true },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const HOLIDAY_DATES = new Set(HOLIDAYS_2026.map(h => h.date));

// Panel Content Component
function PanelContent({
  month,
  setMonth,
  year,
  currentMonthHolidays,
  onViewAllHolidays,
}: {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  currentMonthHolidays: Holiday[];
  onViewAllHolidays: () => void;
}) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [input, setInput] = useState('');

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks(prev => [...prev, { id: Date.now(), text, done: false }]);
    setInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const firstDow = new Date(year, month, 1).getDay();
  const shifted = firstDow;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(shifted).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const pending = tasks.filter(t => !t.done);
  const completed = tasks.filter(t => t.done);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-background">
      
      {/* Calendar Section */}
      <div className="px-5 pt-2 pb-4 border  bg-primary/10 rounded-3xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Calendar
          </h3>
        </div>

        <div className="flex items-center justify-between mb-3 ">
          <button 
            onClick={() => setMonth(prev => Math.max(0, prev - 1))} 
            className="p-1.5 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-gray-800">
            {MONTH_NAMES[month]} {year}
          </span>
          <button 
            onClick={() => setMonth(prev => Math.min(11, prev + 1))} 
            className="p-1.5 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-3 mb-2.5">
          {[
            { dot: 'bg-[#6BCC22]', label: 'Today' },
            { dot: 'bg-red-400', label: 'Holiday' },
          ].map(l => (
            <span key={l.label} className="flex items-center gap-1 text-[9px] text-gray-400">
              <span className={`w-1.5 h-1.5 rounded-full ${l.dot}`} />
              {l.label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center text-[10px] font-bold text-gray-400">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateStr === TODAY_STR;
            const isHoliday = HOLIDAY_DATES.has(dateStr);
            const isWeekend = [0, 6].includes(new Date(year, month, day).getDay());

            return (
              <div
                key={i}
                className={`relative flex items-center justify-center h-7 w-full rounded-lg text-[11px] font-medium transition-all
                  ${isToday ? 'bg-[#6BCC22] text-white font-bold' : ''}
                  ${isHoliday && !isToday ? 'text-red-500 font-bold' : ''}
                  ${isWeekend && !isToday && !isHoliday ? 'text-gray-300' : ''}
                  ${!isToday && !isHoliday && !isWeekend ? 'text-gray-600 hover:bg-gray-100 cursor-pointer' : ''}
                `}
              >
                {day}
                {isHoliday && !isToday && (
                  <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-red-500 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Public Holidays - Present Month Only */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Public Holidays</h4>
          <div className="flex items-center gap-3">
            <span className="text-[9px] bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full">
              {currentMonthHolidays.length} in {new Date(year, month).toLocaleString('default', { month: 'long' })}
            </span>
            <button
              onClick={onViewAllHolidays}
              className="text-[#6BCC22] text-xs font-medium flex items-center gap-1 hover:underline"
            >
              View all <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {currentMonthHolidays.length > 0 ? (
          <div className="space-y-0.5">
            {currentMonthHolidays.map((h) => {
              const d = new Date(h.date);
              return (
                <div key={h.date} className="flex items-center gap-3 py-2 px-2 rounded-xl bg-primary/10">
                  <div className="w-8 text-center">
                    <div className="text-sm font-bold text-gray-800">{d.getDate()}</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm   text-gray-700">{h.name}</p>
                    <p className="text-xs text-gray-400">{h.day}</p>
                    {h.remarks && <p className="text-[10px] text-amber-600">{h.remarks}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-400 py-4 text-center">No public holidays in this month</p>
        )}
      </div>

      {/* Tasks & Events */}
      <div className="px-5 py-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Tasks & Events</h4>
        </div>

        <div className="flex gap-1.5 mb-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Add a task…"
            className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#6BCC22]/30"
          />
          <button
            onClick={addTask}
            className="p-1.5 bg-[#6BCC22] text-white rounded-xl hover:bg-[#5ab81e] transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          {pending.map(t => (
            <div key={t.id} className="flex items-start gap-2 group py-1.5 px-2 rounded-xl hover:bg-gray-50 transition-colors">
              <button 
                onClick={() => toggleTask(t.id)} 
                className="mt-0.5 w-4 h-4 rounded-full border-2 border-gray-300 hover:border-[#6BCC22] shrink-0 transition-colors"
              />
              <span className="text-xs text-gray-700 flex-1 leading-snug">{t.text}</span>
              <button
                onClick={() => deleteTask(t.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 shrink-0 transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {completed.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1.5">Done</p>
            <div className="space-y-1">
              {completed.map(t => (
                <div key={t.id} className="flex items-start gap-2 group py-1.5 px-2 rounded-xl">
                  <button 
                    onClick={() => toggleTask(t.id)} 
                    className="mt-0.5 w-4 h-4 rounded-full bg-[#6BCC22] border-2 border-[#6BCC22] flex items-center justify-center shrink-0"
                  >
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </button>
                  <span className="text-xs text-gray-400 flex-1 line-through leading-snug">{t.text}</span>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 shrink-0 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tasks.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">No tasks yet</p>
        )}
      </div>
    </div>
  );
}

// Main Right Panel
export function RightPanel() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [month, setMonth] = useState(2);
  const [year] = useState(2026);
  const [showAllHolidays, setShowAllHolidays] = useState(false);

  const currentMonthHolidays = HOLIDAYS_2026.filter(h => {
    const d = new Date(h.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  return (
    <>
      {/* Desktop Right Panel - No Toggle */}
      <aside className="hidden lg:flex flex-col w-80 shrink-0 bg-white border-l border-gray-100 h-screen sticky top-0 overflow-hidden">
        <div className="px-5 pt-0 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#6BCC22]" />
            <h4 className="text-sm font-bold text-gray-600 uppercase tracking-widest">ATTENDANCE PANEL</h4>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <PanelContent
            month={month}
            setMonth={setMonth}
            year={year}
            currentMonthHolidays={currentMonthHolidays}
            onViewAllHolidays={() => setShowAllHolidays(true)}
          />
        </div>
      </aside>

      {/* Mobile FAB + Drawer */}
      <div className="lg:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#6BCC22] text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-[#5ab81e] transition-all active:scale-95"
        >
          <Calendar className="w-6 h-6" />
        </button>

        {drawerOpen && <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setDrawerOpen(false)} />}

        <div className={`fixed top-0 right-0 h-full w-[320px] bg-white z-50 shadow-2xl transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6BCC22]" />
              <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">ATTENDANCE PANEL</span>
            </div>
            <button onClick={() => setDrawerOpen(false)} className="p-1.5 text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <PanelContent
              month={month}
              setMonth={setMonth}
              year={year}
              currentMonthHolidays={currentMonthHolidays}
              onViewAllHolidays={() => setShowAllHolidays(true)}
            />
          </div>
        </div>
      </div>

      {/* Full Holidays Modal */}
      {showAllHolidays && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-80 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="px-8 py-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">All Public Holidays 2026</h3>
              <button onClick={() => setShowAllHolidays(false)} className="text-3xl text-gray-400">×</button>
            </div>
            <div className="flex-1 overflow-auto p-8 space-y-4">
              {HOLIDAYS_2026.map(h => {
                const d = new Date(h.date);
                return (
                  <div key={h.date} className="flex gap-4 items-center">
                    <div className="w-14 text-right">
                      <div className="text-xs text-gray-400">{d.toLocaleString('default', { month: 'short' })}</div>
                      <div className="text-3xl font-bold text-gray-800">{d.getDate()}</div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{h.name}</p>
                      <p className="text-xs text-gray-500">{h.day}</p>
                      {h.remarks && <p className="text-[10px] text-amber-600">{h.remarks}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-8 py-6 border-t flex justify-end">
              <button
                onClick={() => setShowAllHolidays(false)}
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}