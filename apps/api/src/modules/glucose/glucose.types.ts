import { GetCurrentGlucoseResponse } from './dto/response/getCurrentGlucose';
import { GetGraphDataResponse } from './dto/response/getGraphData';
import { GetSensorDataResponse } from './dto/response/getSensorData';

export interface IGlucoseService {
  init(): Promise<void>;
  getUnit(): Promise<string>;
  getCurrentGlucose(): Promise<GetCurrentGlucoseResponse>;
  getGraphData(): Promise<GetGraphDataResponse>;
  getSensorData(): Promise<GetSensorDataResponse>;
}

export interface GlucoseData {
  timestamp: number;
  unit: string;
  currentGlucose: GetCurrentGlucoseResponse;
  graphData: GetGraphDataResponse;
  sensorData: GetSensorDataResponse;
}
