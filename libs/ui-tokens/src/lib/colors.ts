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

  export type ColorName = keyof typeof color;