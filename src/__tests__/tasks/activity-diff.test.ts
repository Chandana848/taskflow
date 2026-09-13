import { generateFieldDiffs } from '@/lib/tasks/activity-diff';

describe('Activity Field Diffs', () => {
  it('generates diffs only for modified fields', () => {
    const original = { title: 'Old Title', priority: 'LOW', desc: 'Same' };
    const updated = { title: 'New Title', priority: 'HIGH', desc: 'Same' };
    const diffs = generateFieldDiffs(original, updated, ['title', 'priority', 'desc']);
    expect(diffs).toHaveLength(2);
    expect(diffs[0].field).toBe('title');
    expect(diffs[0].oldValue).toBe('Old Title');
    expect(diffs[0].newValue).toBe('New Title');
  });
});
