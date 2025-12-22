export const GLUCOSE_CONSTANTS = {
  UNITS: ['mmol/L', 'mg/dL'] as const,
  COLORS: ['none', 'green', 'yellow', 'orange', 'red'] as const,
  TRENDS: [
    'risingRapidly',
    'rising',
    'risingSlowly',
    'flat',
    'decreasingSlowly',
    'decreasing',
    'decreasingRapidly',
    'none',
  ] as const,
  STATUS: ['high', 'normal', 'low'] as const,
  LIBRE: {
    SENSOR_LIFETIME_SEC: 1296000,
    REFRESH_BUFFER_MS: 60000,
    RETRY_MS: 15000,
    UNITS: {
      0: 'mmol/L',
      1: 'mg/dL',
    },
    AUTH: {
      CACHE_KEY: 'libreview_libre_auth_token',
      BUFFER_TIME_SEC: 300,
    },
  },
  SEC_TO_MS: 1000,
  GLUCOSE: {
    SENSOR_LIFETIME_SEC: 1209600,
    REFRESH_BUFFER_MS: 65000,
    DEFAULT_RETRY_MS: 15000,
    UNITS: {
      1: 'mg/dL',
      0: 'mmo/L',
    },
  },
  AUTH: {
    CACHE_KEY: 'libreview_auth_token',
    BUFFER_TIME_SEC: 300,
  },
} as const;
