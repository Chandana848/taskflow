/**
 * cn — merge Tailwind class names with conflict resolution.
 * Uses clsx for conditionals and tailwind-merge for deduplication.
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
