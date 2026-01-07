export function requireEnv(key: string): string {
  const env = process.env[key];
  if (env === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return env;
}
