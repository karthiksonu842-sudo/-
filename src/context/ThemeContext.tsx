import React, {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = 'sai_datta_theme_preference';

/**
 * Reads the current theme directly from documentElement attributes or localStorage.
 * SSR safe: defaults to 'dark' if document is undefined.
 */
function getInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    if (document.documentElement.classList.contains('light-theme')) return 'light';
  }
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // Storage restricted
    }
  }
  return 'dark';
}

// In-memory module-level singleton state for zero-latency sync access
let currentTheme: Theme = getInitialTheme();
const listeners = new Set<() => void>();

// Track pending animation frame to cancel debounce if needed
let rafDisableTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Temporarily disables all CSS transitions across the entire DOM during the theme switch.
 * This guarantees zero layout thrashing, prevents intermediate color calculations,
 * and makes the theme switch feel completely instantaneous without jank.
 */
export function disableTransitionsTemporarily() {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // Add the zero-transition modifier
  root.classList.add('theme-switching');

  if (rafDisableTimer) {
    clearTimeout(rafDisableTimer);
  }

  // Double-RAF ensures the style recalculation and repaint complete in the current frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove('theme-switching');
    });
  });
}

/**
 * Instantly applies theme classes to document element and updates localStorage synchronously.
 * Does NOT cause layout thrashing because it modifies classes and attributes directly on root.
 */
export function applyThemeToDOM(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // Temporarily disable transitions during theme change to eliminate lag and paint thrashing
  disableTransitionsTemporarily();

  if (theme === 'light') {
    root.classList.add('light-theme', 'light');
    root.setAttribute('data-theme', 'light');
  } else {
    root.classList.remove('light-theme', 'light');
    root.setAttribute('data-theme', 'dark');
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage restricted
  }
}

/**
 * Subscribes a listener callback to theme changes.
 */
function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Returns the current synchronous theme snapshot.
 */
function getSnapshot(): Theme {
  return currentTheme;
}

/**
 * Returns the SSR theme snapshot.
 */
function getServerSnapshot(): Theme {
  return 'dark';
}

/**
 * Emits theme change immediately to all subscribers and updates DOM and storage.
 */
function emitThemeChange(nextTheme: Theme) {
  if (currentTheme === nextTheme) return;
  currentTheme = nextTheme;
  // Apply synchronously to DOM first so styles switch in 0ms
  applyThemeToDOM(nextTheme);
  // Notify all subscribed React components
  listeners.forEach((listener) => listener());
}

// Immediately ensure DOM matches stored theme before initial paint
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      currentTheme = saved;
      applyThemeToDOM(saved);
    }
  } catch {
    // Ignore
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // useSyncExternalStore guarantees tear-free, synchronous theme updates
  // with zero microtask queue or state-batching delay
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    emitThemeChange(nextTheme);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    emitThemeChange(newTheme);
  }, []);

  // Sync DOM once on mount
  useEffect(() => {
    applyThemeToDOM(currentTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
