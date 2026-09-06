import { parseTaskCsv } from '@/lib/import/csv-parser';

describe('CSV Import Parser', () => {
  it('parses csv rows into typed task structures', () => {
    const csv = 'title,description,priority\nDeploy App,Deploy to production,HIGH';
    const rows = parseTaskCsv(csv);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe('Deploy App');
    expect(rows[0].priority).toBe('HIGH');
  });

  it('returns empty array on empty input', () => {
    expect(parseTaskCsv('')).toHaveLength(0);
  });
});
