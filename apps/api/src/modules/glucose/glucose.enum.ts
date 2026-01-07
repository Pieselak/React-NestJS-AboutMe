export enum GlucoseProviders {
  LIBRE = 'libre',
  DEXCOM = 'dexcom',
}

export enum GlucoseSensors {
  LIBRE_2 = 'Freestyle Libre 2',
  LIBRE_3 = 'Freestyle Libre 3',
  DEXCOM_G7 = 'Dexcom G7',
  DEXCOM_ONE = 'Dexcom One',
  DEXCOM_ONE_PLUS = 'Dexcom One Plus',
}

export enum GlucoseUnits {
  MMOL_L = 'mmol/L',
  MG_DL = 'mg/dL',
}

export enum GlucoseStatus {
  HIGH = 'high',
  COMPUTABLE = 'computable',
  LOW = 'low',
}

export enum GlucoseColors {
  NONE = 'none',
  GREEN = 'green',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  RED = 'red',
}

export enum GlucoseTrends {
  RISING_RAPIDLY = 'risingRapidly',
  RISING = 'rising',
  RISING_SLOWLY = 'risingSlowly',
  FLAT = 'flat',
  DECREASING_SLOWLY = 'decreasingSlowly',
  DECREASING = 'decreasing',
  DECREASING_RAPIDLY = 'decreasingRapidly',
  NONE = 'none',
}
