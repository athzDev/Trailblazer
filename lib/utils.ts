import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function toStringArray(value: unknown, fallback: string[] = []) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string');
      }
    } catch (error) {
      void error;
      if (value.length > 0) {
        return [value];
      }
    }
  }
  return fallback;
}
