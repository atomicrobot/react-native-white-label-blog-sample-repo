/**
 * Border radius design tokens - consistent corner radii
 */
export const BorderRadius = {
  /** 4px - Subtle rounding */
  xs: 4,
  /** 8px - Small rounding */
  sm: 8,
  /** 12px - Default rounding (cards, sections) */
  md: 12,
  /** 16px - Medium rounding */
  lg: 16,
  /** 22px - Large rounding (buttons, inputs) */
  xl: 22,
  /** 30px - Extra large rounding (avatars) */
  xxl: 30,
  /** Full circle */
  full: 9999,
};

export type BorderRadiusType = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  full: number;
};
