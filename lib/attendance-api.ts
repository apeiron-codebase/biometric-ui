// ─────────────────────────────────────────────────────────────────
// lib/attendance-api.ts
//
// Matches EXACT backend API response shapes:
//   GET /present-employees  → PresentResponse
//   GET /absent-employees   → AbsentResponse
//   GET /total-employees    → TotalResponse
//
// TO SWITCH TO REAL API:
//   1. Set API_BASE_URL to your ngrok / production URL
//   2. In each fetch function, comment out the "── MOCK ──" block
//      and uncomment the "── REAL API ──" block
// ─────────────────────────────────────────────────────────────────

export const API_BASE_URL = "https://your-ngrok-url.ngrok.io"; // ← change this one line

// ── Exact shapes from backend ─────────────────────────────────────

/** Shape of each employee in /present-employees */
export interface PresentEmployee {
  employee_code: string;
  employee_name: string;
  employee_photo: string;
  punch_in: string;
  punch_out: string;
  status: "Present";
}

/** Shape of each employee in /absent-employees */
export interface AbsentEmployee {
  employee_code: string;
  employee_name: string;
  employee_photo: string;
  status: "Absent";
}

/** Full /present-employees response */
export interface PresentResponse {
  date: string;
  day: string;
  present_count: number;
  employees: PresentEmployee[];
}

/** Full /absent-employees response */
export interface AbsentResponse {
  date: string;
  day: string;
  absent_count: number;
  employees: AbsentEmployee[];
}

/** Full /total-employees response */
export interface TotalResponse {
  total_employees: number;
}

// ── Unified types used by UI components ──────────────────────────

/** Status values — "Late" is frontend-derived (punch_in after 9:30 AM) */
export type AttendanceStatus = "Present" | "Absent" | "Late" | "On Leave";

/**
 * Unified employee shape used across all UI components.
 * Fields not in the API (department, leave) are derived/mocked
 * until the backend adds them.
 */
export interface Employee {
  employee_code: string;
  employee_name: string;
  employee_photo: string;
  department: string;        // NOT in API yet — mocked by employee_code
  punch_in?: string;
  punch_out?: string;
  status: AttendanceStatus;  // "Late" derived from punch_in time
  leave_used?: number;       // Calculated quarterly (frontend)
  leave_total?: number;
  leave_balance?: number;
}

/** Merged day summary used by charts and stat cards */
export interface AttendanceDay {
  date: string;
  day: string;
  total_employees: number;
  present_count: number;
  absent_count: number;
  late_count: number;        // Derived: present employees who punched in after 9:30 AM
  on_leave_count: number;    // 0 until backend adds this
  employees: Employee[];
}

/** Per-day summary used by trend chart and calendar */
export interface DaySummary {
  date: string;
  day: string;               // "Mon", "Tue" etc.
  total: number;
  present: number;
  absent: number;
  late: number;
  on_leave: number;
}

// ── Config ────────────────────────────────────────────────────────

/** Quarterly leave allotment per employee — adjust to match HR policy */
export const QUARTERLY_LEAVE_ALLOTMENT = 6;

/** Late arrival threshold — punch_in after this time = "Late" */
const LATE_THRESHOLD_HOUR = 9;
const LATE_THRESHOLD_MIN  = 30;

export function getCurrentQuarter(): "Q1" | "Q2" | "Q3" | "Q4" {
  const m = new Date().getMonth();
  if (m < 3) return "Q1";
  if (m < 6) return "Q2";
  if (m < 9) return "Q3";
  return "Q4";
}

// ── Helpers ───────────────────────────────────────────────────────

/**
 * Derive department from employee_code since the API doesn't return it.
 * Replace this with a real department lookup once backend adds the field.
 */
const DEPARTMENTS = [
  "Engineering", "Sales", "HR",
  "Marketing", "Finance", "Operations",
];
function deriveDepartment(code: string): string {
  const n = parseInt(code, 10);
  return DEPARTMENTS[isNaN(n) ? 0 : n % DEPARTMENTS.length];
}

/** Returns true if punch_in time is after the late threshold */
function isLate(punchIn?: string): boolean {
  if (!punchIn) return false;
  const d = new Date(punchIn);
  const h = d.getHours();
  const m = d.getMinutes();
  return h > LATE_THRESHOLD_HOUR || (h === LATE_THRESHOLD_HOUR && m > LATE_THRESHOLD_MIN);
}

/** Calculate leave balance for this quarter based on absence count */
function calcLeave(code: string, absentThisQuarter: number) {
  const leave_total   = QUARTERLY_LEAVE_ALLOTMENT;
  const leave_used    = Math.min(absentThisQuarter, leave_total);
  const leave_balance = leave_total - leave_used;
  return { leave_total, leave_used, leave_balance };
}

/**
 * Merge present + absent API responses into a unified AttendanceDay.
 * This is the single place where we normalise the backend shape.
 */
function mergeResponses(
  present: PresentResponse,
  absent: AbsentResponse,
  total: number,
): AttendanceDay {
  const presentEmployees: Employee[] = present.employees.map(e => {
    const late = isLate(e.punch_in);
    return {
      employee_code:  e.employee_code,
      employee_name:  e.employee_name,
      employee_photo: e.employee_photo,
      department:     deriveDepartment(e.employee_code),
      punch_in:       e.punch_in,
      punch_out:      e.punch_out,
      status:         late ? "Late" : "Present",
      ...calcLeave(e.employee_code, 0), // 0 absences for present employees today
    };
  });

  const absentEmployees: Employee[] = absent.employees.map(e => ({
    employee_code:  e.employee_code,
    employee_name:  e.employee_name,
    employee_photo: e.employee_photo,
    department:     deriveDepartment(e.employee_code),
    status:         "Absent" as AttendanceStatus,
    ...calcLeave(e.employee_code, 1),
  }));

  const allEmployees = [...presentEmployees, ...absentEmployees];
  const lateCount    = presentEmployees.filter(e => e.status === "Late").length;

  return {
    date:            present.date,
    day:             present.day,
    total_employees: total,
    present_count:   present.present_count,
    absent_count:    absent.absent_count,
    late_count:      lateCount,
    on_leave_count:  0,       // backend doesn't have this yet
    employees:       allEmployees,
  };
}

// ── Mock data generators (matches exact API response shape) ───────

const MOCK_NAMES = [
  "Rajesh Kumar",  "Priya Sharma",  "Arjun Menon",  "Sneha R",
  "Vikram Singh",  "Divya Nair",    "Karthik S",    "Meera Pillai",
  "Suresh Babu",   "Anitha K",      "Ramesh T",      "Lakshmi V",
  "Gopal R",       "Pooja M",       "Sanjay P",      "Kavitha A",
  "Murali D",      "Deepa C",       "Venkat N",      "Asha B",
  "Prasad J",      "Rekha G",       "Mohan L",       "Usha F",
  "Naresh H",      "Geetha I",      "Balaji E",      "Selvi W",
  "Ravi Q",        "Janaki Z",
];

function pad2(n: number) { return String(n).padStart(2, "0"); }

function mockPresentResponse(date: Date): PresentResponse {
  const dateStr = date.toISOString().split("T")[0];
  const dow     = date.getDay();

  const employees: PresentEmployee[] = MOCK_NAMES
    .map((name, i) => {
      // Weekends → nobody present
      if (dow === 0 || dow === 6) return null;
      // ~70% of employees present on weekdays
      if ((i * 7 + date.getDate()) % 10 >= 7) return null;

      const h   = 8 + (i % 2);                             // 08 or 09
      const min = pad2(i % 60);
      const sec = pad2((i * 3) % 60);
      const outH  = pad2(17 + (i % 3));
      const outMin = pad2((i * 7) % 60);
      return {
        employee_code:  String(i + 1),
        employee_name:  name,
        employee_photo: `faces/employees/${i + 1}_1.jpg`,
        punch_in:       `${dateStr}T${pad2(h)}:${min}:${sec}`,
        punch_out:      `${dateStr}T${outH}:${outMin}:00`,
        status:         "Present" as const,
      };
    })
    .filter(Boolean) as PresentEmployee[];

  return {
    date:          dateStr,
    day:           date.toLocaleDateString("en-US", { weekday: "long" }),
    present_count: employees.length,
    employees,
  };
}

function mockAbsentResponse(date: Date, presentCodes: string[]): AbsentResponse {
  const dateStr = date.toISOString().split("T")[0];
  const presentSet = new Set(presentCodes);

  const employees: AbsentEmployee[] = MOCK_NAMES
    .map((name, i) => {
      const code = String(i + 1);
      if (presentSet.has(code)) return null;
      return {
        employee_code:  code,
        employee_name:  name,
        employee_photo: `faces/employees/${i + 1}_1.jpg`,
        status:         "Absent" as const,
      };
    })
    .filter(Boolean) as AbsentEmployee[];

  return {
    date:         dateStr,
    day:          date.toLocaleDateString("en-US", { weekday: "long" }),
    absent_count: employees.length,
    employees,
  };
}

function mockTotalResponse(): TotalResponse {
  return { total_employees: MOCK_NAMES.length };
}

// ── Public API functions ──────────────────────────────────────────

export async function fetchAttendanceForDate(date: Date): Promise<AttendanceDay> {
  // ── REAL API (uncomment when backend is ready) ──────────────────
  // const dateStr = date.toISOString().split("T")[0];
  // const [presentRes, absentRes, totalRes] = await Promise.all([
  //   fetch(`${API_BASE_URL}/present-employees?date=${dateStr}`).then(r => r.json()) as Promise<PresentResponse>,
  //   fetch(`${API_BASE_URL}/absent-employees?date=${dateStr}`).then(r => r.json())  as Promise<AbsentResponse>,
  //   fetch(`${API_BASE_URL}/total-employees`).then(r => r.json())                   as Promise<TotalResponse>,
  // ]);
  // return mergeResponses(presentRes, absentRes, totalRes.total_employees);

  // ── MOCK ────────────────────────────────────────────────────────
  const presentRes = mockPresentResponse(date);
  const absentRes  = mockAbsentResponse(date, presentRes.employees.map(e => e.employee_code));
  const totalRes   = mockTotalResponse();
  return mergeResponses(presentRes, absentRes, totalRes.total_employees);
}

export async function fetchWeeklyTrend(anchor: Date): Promise<DaySummary[]> {
  const days = await Promise.all(
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(anchor);
      d.setDate(d.getDate() - (6 - i));
      return fetchAttendanceForDate(d);
    })
  );

  return days.map(r => ({
    date:     r.date,
    day:      new Date(r.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" }),
    total:    r.total_employees,
    present:  r.present_count,
    absent:   r.absent_count,
    late:     r.late_count,
    on_leave: r.on_leave_count,
  }));
}

export async function fetchMonthCalendar(year: number, month: number): Promise<DaySummary[]> {
  const today        = new Date();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const results: DaySummary[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    if (date > today) break;
    const r = await fetchAttendanceForDate(date);
    results.push({
      date:     r.date,
      day:      date.toLocaleDateString("en-US", { weekday: "short" }),
      total:    r.total_employees,
      present:  r.present_count,
      absent:   r.absent_count,
      late:     r.late_count,
      on_leave: r.on_leave_count,
    });
  }
  return results;
}