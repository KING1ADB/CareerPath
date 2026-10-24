import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

// Isolate unit tests from live database calls so tests remain fast and deterministic
import.meta.env.VITE_SUPABASE_URL = 'https://placeholder-project.supabase.co';
import.meta.env.VITE_SUPABASE_ANON_KEY = 'mock-anon-key-for-development';

// Mock matchMedia for responsive UI tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
