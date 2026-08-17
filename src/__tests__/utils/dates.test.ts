import { formatRelativeTime, isOverdue } from '@/lib/utils/dates';

describe('Date Utilities', () => {
  it('formats recent timestamps as just now', () => {
    expect(formatRelativeTime(new Date())).toBe('just now');
  });

  it('accurately identifies past overdue dates', () => {
    const past = new Date(Date.now() - 1000000);
    const future = new Date(Date.now() + 1000000);
    expect(isOverdue(past)).toBe(true);
    expect(isOverdue(future)).toBe(false);
  });
});
