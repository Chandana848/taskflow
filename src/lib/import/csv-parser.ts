export interface ParsedCsvRow {
  title: string;
  description?: string;
  priority?: string;
  status?: string;
}

export function parseTaskCsv(csvContent: string): ParsedCsvRow[] {
  if (!csvContent || !csvContent.trim()) return [];
  const lines = csvContent.trim().split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const rows: ParsedCsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    const row: any = {};
    headers.forEach((h, idx) => {
      if (h === 'title') row.title = cols[idx];
      else if (h === 'description') row.description = cols[idx];
      else if (h === 'priority') row.priority = cols[idx];
      else if (h === 'status') row.status = cols[idx];
    });
    if (row.title) rows.push(row);
  }
  return rows;
}
