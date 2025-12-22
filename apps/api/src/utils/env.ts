export function requireEnv(key: string, allowEmpty: boolean = false): string {
  const env = process.env[key];
  if (env === undefined || (!allowEmpty && env === '')) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return env;
}
