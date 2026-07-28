const COMMON_PASSWORDS = ['password', '12345678', 'qwerty', 'taskflow', 'admin123'];

export function validatePasswordStrength(password: string): { valid: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (password.length < 8) reasons.push('Must be at least 8 characters');
  if (!/[A-Z]/.test(password)) reasons.push('Must include at least one uppercase letter');
  if (!/[a-z]/.test(password)) reasons.push('Must include at least one lowercase letter');
  if (!/[0-9]/.test(password)) reasons.push('Must include at least one digit');
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) reasons.push('Cannot be a common password');

  return { valid: reasons.length === 0, reasons };
}
