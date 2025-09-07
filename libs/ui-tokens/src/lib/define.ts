import { ColorName } from './colors';

// Base shape of a color variant (bg/text/border for example)
export type VariantShape = Record<string, ColorName>;

/**
 * Define a typed set of variants.
 * - `TKeys` = variant names ("default" | "destructive" | ...)
 * - `TShape` = structure of each variant (bg/text/border, or other fields)
 */
export function defineVariants<
  TKeys extends string,
  TShape extends VariantShape
>(variants: Record<TKeys, TShape>) {
  return variants;
}