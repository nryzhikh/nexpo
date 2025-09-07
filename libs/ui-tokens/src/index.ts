export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const font = {
  size: { sm: 13, md: 15, lg: 17 } as const,
  weight: { reg: '400', med: '500', bold: '700' },
} as const;

export const color = {
  background: { light: '#ffffff', dark: '#0b0b0c' },
  foreground: { light: '#111827', dark: '#f3f4f6' },
  muted:      { light: '#6b7280', dark: '#9ca3af' },
  border:     { light: '#e5e7eb', dark: '#26272b' },
  primary:    { light: '#274fe6', dark: '#a8bdff' },
  destructive:{ light: '#ef4444', dark: '#f87171' },
  accent:     { light: '#f3f4f6', dark: '#26272b' },
  secondary:  { light: '#f3f4f6', dark: '#1f2937' },
} as const;

export type Radius = keyof typeof radius;
export type Space = keyof typeof space;
export type FontSize = keyof typeof font.size;
export type FontWeight = keyof typeof font.weight;
export type ColorName = keyof typeof color;
export type Theme = 'light' | 'dark';
