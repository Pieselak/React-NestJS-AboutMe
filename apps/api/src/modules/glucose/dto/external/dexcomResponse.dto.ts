export interface DexcomApiEvgsRecord {
  recordId: string;
  systemTime: string;
  displayTime: string;
  transmitterId: string | null;
  transmitterTicks: number;
  value: number | null;
  status: string | null;
  trend: string | null;
  trendRate: number | null;
  unit: string;
  rateUnit: string;
  displayDevice: string;
  transmitterGeneration: string;
  displayApp: string | null;
}

export interface DexcomApiEvgsResponse {
  recordType: string;
  recordVersion: string;
  userId: string;
  records: DexcomApiEvgsRecord[];
}
