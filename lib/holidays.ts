// lib/holidays.ts
// Apeiron Automation Solutions Pvt Ltd — Holiday List 2026
// Document No: APL/GN/002 | Revision: 0 | Date: 25.12.2024

export interface Holiday {
  sno: number;
  name: string;
  date: string;   // YYYY-MM-DD
  day: string;
  remarks?: string;
}

export const COMPANY_HOLIDAYS_2026: Holiday[] = [
  { sno: 1,  name: "New Year's Day",        date: "2026-01-01", day: "Thursday" },
  { sno: 2,  name: "Pongal",                date: "2026-01-15", day: "Thursday" },
  { sno: 3,  name: "Thiruvalluvar Day",      date: "2026-01-16", day: "Friday"   },
  { sno: 4,  name: "Uzhavar Thirunal",       date: "2026-01-17", day: "Saturday" },
  { sno: 5,  name: "Republic Day",           date: "2026-01-26", day: "Monday"   },
  { sno: 6,  name: "Ramzan (Idu'l Fitr)",    date: "2026-03-20", day: "Friday"   },
  { sno: 7,  name: "Tamil New Year's Day",   date: "2026-04-14", day: "Tuesday"  },
  { sno: 8,  name: "May Day",                date: "2026-05-01", day: "Friday"   },
  { sno: 9,  name: "Bakrid (Idul Azha)",     date: "2026-05-28", day: "Thursday" },
  { sno: 10, name: "Independence Day",       date: "2026-08-15", day: "Saturday" },
  { sno: 11, name: "Ayutha Pooja",           date: "2026-10-19", day: "Monday"   },
  { sno: 12, name: "Deepavali",              date: "2026-11-08", day: "Sunday",  remarks: "Holiday falls on Sunday" },
  { sno: 13, name: "Deepavali",              date: "2026-11-09", day: "Monday"   },
  { sno: 14, name: "Christmas",              date: "2026-12-25", day: "Friday"   },
];

/** Returns true if a given date string is a company holiday */
export function isHoliday(dateStr: string): Holiday | undefined {
  return COMPANY_HOLIDAYS_2026.find(h => h.date === dateStr);
}

/** Returns upcoming holidays from today */
export function getUpcomingHolidays(limit = 5): Holiday[] {
  const today = new Date().toISOString().split("T")[0];
  return COMPANY_HOLIDAYS_2026
    .filter(h => h.date >= today)
    .slice(0, limit);
}