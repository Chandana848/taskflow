export interface FieldDiff {
  field: string;
  oldValue: any;
  newValue: any;
}

export function generateFieldDiffs(original: Record<string, any>, updated: Record<string, any>, trackFields: string[]): FieldDiff[] {
  const diffs: FieldDiff[] = [];
  for (const field of trackFields) {
    if (original[field] !== updated[field] && (original[field] !== undefined || updated[field] !== undefined)) {
      diffs.push({
        field,
        oldValue: original[field] ?? null,
        newValue: updated[field] ?? null
      });
    }
  }
  return diffs;
}
