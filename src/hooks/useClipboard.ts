'use client';

import { useState } from 'react';

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = async (text: string) => {
    if (!navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), timeout);
      return true;
    } catch {
      return false;
    }
  };

  return { copy, hasCopied };
}
