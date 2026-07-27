const DANGEROUS_SQL_PATTERNS = [
  /--/,
  /\/\*/,
  /;/i,
  /\bUNION\b/i,
  /\bSELECT\b.*\bFROM\b/i,
  /\bDROP\b/i,
  /\bDELETE\b/i,
];

export function hasSqlInjectionThreat(input: string): boolean {
  if (!input) return false;
  return DANGEROUS_SQL_PATTERNS.some((pattern) => pattern.test(input));
}
