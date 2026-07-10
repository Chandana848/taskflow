import { exportTasksToCsv } from '@/lib/export/csv';

describe('CSV Export', () => {
  it('formats tasks properly into comma separated rows', () => {
    const sample = [
      { id: 'tsk_1', title: 'Task with, comma', priority: 'HIGH', column: { name: 'To Do' } },
    ];
    const csv = exportTasksToCsv(sample);
    expect(csv).toContain('ID,Title,Priority,Status,Assignee,DueDate');
    expect(csv).toContain('"Task with, comma"');
  });
});
