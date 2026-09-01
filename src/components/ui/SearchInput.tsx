'use client';
import { useState, useEffect } from 'react';

interface SearchInputProps {
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function SearchInput({ value = '', onChange, placeholder = 'Search...', debounceMs = 300 }: SearchInputProps) {
  const [innerVal, setInnerVal] = useState(value);

  useEffect(() => {
    setInnerVal(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(innerVal);
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [innerVal, debounceMs, onChange]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={innerVal}
        onChange={e => setInnerVal(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 pl-8 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <span className="absolute left-2.5 top-2 text-muted-foreground text-xs">🔍</span>
      {innerVal && (
        <button
          type="button"
          onClick={() => setInnerVal('')}
          className="absolute right-2.5 top-2 text-muted-foreground hover:text-foreground text-xs"
        >
          ✕
        </button>
      )}
    </div>
  );
}
