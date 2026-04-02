import { GetCurrentGlucoseResponse } from './dto/response/getCurrentGlucose.dto';
import { GetGraphDataResponse } from './dto/response/getGraphData.dto';
import { GetSensorDataResponse } from './dto/response/getSensorData.dto';

export interface IGlucoseService {
  initialize(): void;
  isSensorActive(): Promise<boolean>;
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
