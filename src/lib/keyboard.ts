export interface KeyCombo {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
}

export function matchesKeyCombo(e: KeyboardEvent, combo: KeyCombo): boolean {
  const keyMatches = e.key.toLowerCase() === combo.key.toLowerCase();
  const ctrlMatches = combo.ctrl ? e.ctrlKey : true;
  const metaMatches = combo.meta ? e.metaKey : true;
  const shiftMatches = combo.shift ? e.shiftKey : !e.shiftKey;
  const altMatches = combo.alt ? e.altKey : !e.altKey;

  return keyMatches && ctrlMatches && metaMatches && shiftMatches && altMatches;
}
