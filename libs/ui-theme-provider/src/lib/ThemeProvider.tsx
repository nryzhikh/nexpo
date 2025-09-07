// packages/ui-theme/src/ThemeProvider.tsx
import * as React from 'react';
import { Appearance, Platform } from 'react-native';
import {
  asyncStorageAdapter,
  localStorageAdapter,
  createStorage,
} from '@nexpo/utils-storage';
import { color, type Theme } from '@nexpo/ui-tokens';

export const themeStorage =
  Platform.OS === 'web' ? localStorageAdapter : asyncStorageAdapter;

const adapter =
  Platform.OS === 'web'
    ? localStorageAdapter // web → store in localStorage
    : asyncStorageAdapter; // mobile → store in SecureStore

export const authStorage = createStorage(adapter, 'auth');

type ThemeMode = Theme | 'system';

type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeCtx = React.createContext<ThemeContextValue | undefined>(undefined);

export function resolveTheme(scheme: ThemeMode) {
  const resolved = {} as Record<string, string>;
  for (const [name, value] of Object.entries(color)) {
    resolved[name] = (value as Record<string, string>)[scheme];
  }
  return resolved;
}


function detectSystemScheme(): Theme {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  }
  const sys = Appearance.getColorScheme();
  return sys === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({
  defaultMode = 'system',
  persist = true,
  children,
}: {
  defaultMode?: ThemeMode;
  persist?: boolean;
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<ThemeMode>(defaultMode);
  const [systemScheme, setSystemScheme] = React.useState<ThemeMode>(
    detectSystemScheme()
  );

  // Load persisted mode on mount
  React.useEffect(() => {
    if (!persist) return;
    authStorage.getItem('mode').then((saved) => {
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setMode(saved);
      }
    });
  }, [persist]);

  // Save mode when changed
  React.useEffect(() => {
    if (persist) authStorage.setItem('mode', mode);
  }, [mode, persist]);

  // Listen for system scheme changes
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      const sub = Appearance.addChangeListener(({ colorScheme }) => {
        setSystemScheme(colorScheme === 'dark' ? 'dark' : 'light');
      });
      return () => sub.remove();
    } else if (typeof window !== 'undefined' && window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) =>
        setSystemScheme(e.matches ? 'dark' : 'light');
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
  }, []);

  const effectiveScheme: ThemeMode = mode === 'system' ? systemScheme : mode;
  const theme = React.useMemo(
    () => resolveTheme(effectiveScheme),
    [effectiveScheme]
  );

  // Sync <html class="dark"> on web
  React.useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(effectiveScheme);
    }
  }, [effectiveScheme]);

  const value: ThemeContextValue = {
    theme,
    scheme: effectiveScheme,
    mode,
    setMode,
  };

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
