export type EmployeeRecord = {
  code: string;
  name: string;
  avatar?: string;
  department: string;
  checkin: string;
  checkout: string;
  location: string;
  status: string;
};

export const STATUS_OPTIONS = ["All", "Active", "In Office", "Absent", "Deactive"] as const;
export type StatusFilter = typeof STATUS_OPTIONS[number];

export type Stats = {
  total: number;
  present: number;
  inOffice: number;
  absent: number;
};