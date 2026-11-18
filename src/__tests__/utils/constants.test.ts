import { DEFAULT_PAGE_SIZE, DEFAULT_COLUMN_NAMES } from '@/lib/constants';

describe('Application Constants', () => {
  it('defines default page size and columns', () => {
    expect(DEFAULT_PAGE_SIZE).toBe(25);
    expect(DEFAULT_COLUMN_NAMES).toContain('To Do');
    expect(DEFAULT_COLUMN_NAMES).toContain('Done');
  });
});
