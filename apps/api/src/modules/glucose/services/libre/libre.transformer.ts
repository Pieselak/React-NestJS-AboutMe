import { GlucoseData, LibreAPIResponse } from './libre.service';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';
import {
  GlucoseColors,
  GlucoseSensors,
  GlucoseStatus,
  GlucoseTrends,
  GlucoseUnits,
} from '../../glucose.enum';

export class GlucoseLibreTransformer {
  private transformTimestamp(timestamp: string): number {
    return new Date(`${timestamp} UTC`).getTime();
  }

  transform(data: LibreAPIResponse): GlucoseData {
    const currentTimestamp = Date.now();
    const glucoseTimestamp = this.transformTimestamp(
      data.connection.glucoseMeasurement.FactoryTimestamp,
    );

    const sensorIsActive = data.activeSensors.length > 0;
    const sensorName: GlucoseSensors = GlucoseSensors.LIBRE_2; // HARD-CODED (Can not get Libre sensor generation from API)
    const sensorImage: string = GLUCOSE_CONSTANTS.IMAGES.LIBRE;
    let sensorExpireAt: number = 0;
    let sensorExpireIn: number = 0;
    if (sensorIsActive) {
      sensorExpireAt =
        currentTimestamp +
        data.activeSensors[0].sensor.a * GLUCOSE_CONSTANTS.SEC_TO_MS;
      sensorExpireIn = sensorExpireAt - currentTimestamp;
    }

    const glucoseIsCurrent =
      sensorIsActive &&
      currentTimestamp - glucoseTimestamp >
        GLUCOSE_CONSTANTS.LIBRE.FETCH_TIMEOUT_MS;
    let glucoseUnit: GlucoseUnits;
    switch (data.connection.glucoseMeasurement.GlucoseUnits) {
      case 0:
        glucoseUnit = GlucoseUnits.MMOL_L;
        break;
      case 1:
      default:
        glucoseUnit = GlucoseUnits.MG_DL;
        break;
    }

    let glucoseColor: GlucoseColors;
    switch (data.connection.glucoseMeasurement.MeasurementColor) {
      case 1:
        glucoseColor = GlucoseColors.GREEN;
        break;
      case 2:
        glucoseColor = GlucoseColors.YELLOW;
        break;
      case 3:
        glucoseColor = GlucoseColors.ORANGE;
        break;
      case 4:
        glucoseColor = GlucoseColors.RED;
        break;
      case 0:
      default:
        glucoseColor = GlucoseColors.NONE;
        break;
    }
    if (!glucoseIsCurrent) glucoseColor = GlucoseColors.NONE;

    let glucoseTrend: GlucoseTrends;
    switch (data.connection.glucoseMeasurement.TrendArrow) {
      case 1:
        glucoseTrend = GlucoseTrends.DECREASING;
        break;
      case 2:
        glucoseTrend = GlucoseTrends.DECREASING_SLOWLY;
        break;
      case 3:
        glucoseTrend = GlucoseTrends.FLAT;
        break;
      case 4:
        glucoseTrend = GlucoseTrends.RISING_SLOWLY;
        break;
      case 5:
        glucoseTrend = GlucoseTrends.RISING;
        break;
      default:
        glucoseTrend = GlucoseTrends.NONE;
    }
    if (!glucoseIsCurrent) glucoseTrend = GlucoseTrends.NONE;

    let glucoseStatus: GlucoseStatus = GlucoseStatus.COMPUTABLE;
    if (data.connection.glucoseMeasurement.isHigh) {
      glucoseStatus = GlucoseStatus.HIGH;
    } else if (data.connection.glucoseMeasurement.isLow) {
      glucoseStatus = GlucoseStatus.LOW;
    }

    return {
      timestamp: glucoseTimestamp,
      unit: glucoseUnit,
      currentGlucose: {
        isCurrent: glucoseIsCurrent,
        value: data.connection.glucoseMeasurement.Value,
        unit: glucoseUnit,
        trend: glucoseTrend,
        color: glucoseColor,
        status: glucoseStatus,
        timestamp: glucoseTimestamp,
        refreshAt: 0,
        refreshIn: 0,
      },
      graphData: {
        data: data.graphData.map((reading) => {
          let graphUnit: GlucoseUnits;
          switch (reading.GlucoseUnits) {
            case 0:
              graphUnit = GlucoseUnits.MMOL_L;
              break;
            case 1:
            default:
              graphUnit = GlucoseUnits.MG_DL;
              break;
          }

          let graphColor: GlucoseColors;
          switch (reading.MeasurementColor) {
            case 1:
              graphColor = GlucoseColors.GREEN;
              break;
            case 2:
              graphColor = GlucoseColors.YELLOW;
              break;
            case 3:
              graphColor = GlucoseColors.ORANGE;
              break;
            case 4:
              graphColor = GlucoseColors.RED;
              break;
            case 0:
            default:
              graphColor = GlucoseColors.NONE;
              break;
          }

          let graphStatus: GlucoseStatus = GlucoseStatus.COMPUTABLE;
          if (reading.isHigh) {
            graphStatus = GlucoseStatus.HIGH;
          } else if (reading.isLow) {
            graphStatus = GlucoseStatus.LOW;
          }

          return {
            value: reading.Value,
            unit: graphUnit,
            color: graphColor,
            status: graphStatus,
            timestamp: this.transformTimestamp(reading.FactoryTimestamp),
          };
        }),
        targetLow: data.connection.targetLow,
        targetHigh: data.connection.targetHigh,
        levelLow: data.connection.patientDevice.ll,
        levelHigh: data.connection.patientDevice.hl,
        refreshAt: 0,
        refreshIn: 0,
      },
      sensorData: {
        isActive: sensorIsActive,
        name: sensorIsActive ? sensorName : null,
        image: sensorIsActive ? sensorImage : null,
        lastUploadAt: sensorIsActive ? glucoseTimestamp : null,
        expireAt: sensorIsActive ? sensorExpireAt : null,
        expireIn: sensorIsActive ? sensorExpireIn : null,
      },
    };
  }
}
