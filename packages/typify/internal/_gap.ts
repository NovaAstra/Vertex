/** 
 * A unique symbol used as a type-level placeholder or "gap" 
 * to indicate missing or unfilled positions within a type.
 * 
 * @internal
 */
const GapSymbol = Symbol('gap');

/**
 * `Gap` represents a type-level placeholder for unfilled or missing positions.
 * 
 * @internal
 */
export type Gap = typeof GapSymbol & {};