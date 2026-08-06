export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  if (!name || !domain) return '***@***.***';
  const visible = name.substring(0, 2);
  return `${visible}***@${domain}`;
}

export function maskSecret(secret: string): string {
  if (!secret || secret.length < 8) return '********';
  return `${secret.substring(0, 4)}****${secret.substring(secret.length - 4)}`;
}
