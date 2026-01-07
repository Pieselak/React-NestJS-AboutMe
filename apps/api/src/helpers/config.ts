export function validateConfig(
  value: string | undefined,
  envName: string,
): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${envName}`);
  }
  return value;
}
