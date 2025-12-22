import { FetchDataResponse } from './responses/getData';
import { GLUCOSE_CONSTANTS } from '../../constants/glucose.constants';

export class GlucoseTransformer {
  static toFetchDataResponse(data: any): FetchDataResponse {
    const connection = data?.connection;
    const measurement = connection?.glucoseMeasurement;

    const glucoseData = {
      value: measurement.Value,
      unit: GLUCOSE_CONSTANTS.GLUCOSE.UNITS[measurement.GlucoseUnits],
      trendArrow: measurement.TrendArrow,
      trendColor: measurement.MeasurementColor,
      timestamp: Number(new Date(`${measurement.FactoryTimestamp} UTC`)),
      sensorActive: data?.activeSensors?.length > 0,
      sensorExpires:
        (data?.activeSensors[0]?.sensor?.a +
          GLUCOSE_CONSTANTS.GLUCOSE.SENSOR_LIFETIME_SEC) *
          1000 || 0,
    };

    const graphData = {
      readings: data?.graphData.map((reading) => ({
        value: reading.Value,
        unit: GLUCOSE_CONSTANTS.GLUCOSE.UNITS[reading.GlucoseUnits],
        trendColor: reading.MeasurementColor,
        timestamp: Number(new Date(`${reading.FactoryTimestamp} UTC`)),
      })),
      targetHigh: connection.targetHigh,
      targetLow: connection.targetLow,
      fixedHigh: connection.alarmRules?.h?.th,
      fixedLow: connection.alarmRules?.l?.th,
      alarmHigh: connection.patientDevice?.hl,
      alarmLow: connection.patientDevice?.ll,
    };

    const nextRefresh =
      Number(new Date(`${measurement.FactoryTimestamp} UTC`)) +
      GLUCOSE_CONSTANTS.GLUCOSE.REFRESH_BUFFER_MS;

    return {
      glucoseData,
      graphData,
      nextRefresh,
    } as FetchDataResponse;
  }
}
