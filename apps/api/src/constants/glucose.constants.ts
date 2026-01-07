export const GLUCOSE_CONSTANTS = {
  SEC_TO_MS: 1000,
  LIBRE: {
    FETCH_TIMEOUT_MS: 65000,
    RETRY_MS: 15000,
    BUFFER_SEC: 300,
    SENSOR_LIFETIME_SEC: 1296000,
    CACHE_KEYS: {
      RATELIMIT_FETCH_GLUCOSE: 'libre_ratelimit_fetch_glucose',
      RATELIMIT_FETCH_TOKEN: 'libre_ratelimit_fetch_token',
      AUTH_TOKEN: 'libre_auth_token',
    },
  },
  DEXCOM: {
    BUFFER_SEC: 300,
    CACHE_KEYS: {
      AUTH_TOKEN: 'dexcom_auth_token',
    },
  },
  IMAGES: {
    LIBRE: 'assets/sensor/libre.png',
    LIBRE_NEW: 'assets/sensor/libre_new.png',
    DEXCOM: 'assets/sensor/dexcom.png',
  },

  // LEGACY CONSTANTS

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
