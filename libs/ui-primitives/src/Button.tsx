import * as React from 'react';
import { GestureResponderEvent, View, Pressable, Text } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = React.ComponentProps<typeof Pressable> & {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  textClassName?: string;
};

const cx = (...xs: Array<string | false | null | undefined>) =>
  xs.filter(Boolean).join(' ');

const base = 'flex-row items-center justify-center rounded-md active:opacity-90';
const sizeCls: Record<Size, { container: string; text: string }> = {
  sm: { container: 'h-9 px-3',  text: 'text-sm' },
  md: { container: 'h-10 px-4', text: 'text-base' },
  lg: { container: 'h-11 px-5', text: 'text-lg' },
};

const variantCls: Record<Variant, { container: string; text: string }> = {
  primary:   { container: 'bg-brand-500 active:bg-brand-600', text: 'text-white' },
  secondary: { container: 'bg-gray-100 active:bg-gray-300',   text: 'text-gray-900' },
  outline:   { container: 'border border-gray-300 bg-transparent', text: 'text-gray-900' },
  ghost:     { container: 'bg-transparent',                    text: 'text-gray-900' },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  className,
  textClassName,
  left,
  right,
  onPress,
  ...rest
}: ButtonProps) {
  const handlePress = (e: GestureResponderEvent) => {
    if (disabled || loading) return;
    onPress?.(e);
  };

  const c = sizeCls[size];
  const v = variantCls[variant];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      className={cx(
        base,
        c.container,
        v.container,
        (disabled || loading) && 'opacity-50',
        className
      )}
      onPress={handlePress}
      {...rest}
    >
      {left ? <View className="mr-2">{left}</View> : null}
      <Text className={cx(c.text, v.text, textClassName)}>
        {loading ? '…' : children}
      </Text>
      {right ? <View className="ml-2">{right}</View> : null}
    </Pressable>
  );
}
