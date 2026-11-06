
export interface AttendanceRecord {
  dateTime: string;
  date: string;
  time: string;
  direction1: number;
  direction2: number;
  total: number;
}

export interface AttendanceResponse {
  success: boolean;
  locationId: number;
  lastUpdated: string | null;
  summary: {
    direction1: number;
    direction2: number;
    total: number;
  };
  records: AttendanceRecord[];
}
