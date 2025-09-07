import { defineVariants } from './define';

export const button = {
  variants: defineVariants({
    default: {
      bg: 'primary',
      text: 'background',
      border: 'primary',
    },
    destructive: {
      bg: 'destructive',
      text: 'background',
      border: 'destructive',
    },
    outline: {
      bg: 'background',
      text: 'foreground',
      border: 'border',
    },
    ghost: {
      bg: 'background',
      text: 'foreground',
      border: 'border',
    },
    link: {
      bg: 'background',
      text: 'primary',
      border: 'background',
    },
  }),
  sizes: {
    default: {
      height: 36,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    sm: {
      height: 32,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    lg: {
      height: 40,
      paddingHorizontal: 24,
      paddingVertical: 10,
    },
    icon: {
      width: 36,
      height: 36,
      padding: 0,
    },
  },
};

export type ButtonVariant = keyof typeof button.variants;
export type ButtonSize = keyof typeof button.sizes;
