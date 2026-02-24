/**
 * Icon size design tokens
 */
export const IconSize = {
  /** 16px - Small icons */
  sm: 16,
  /** 20px - Default icons */
  md: 20,
  /** 24px - Large icons */
  lg: 24,
  /** 28px - Extra large icons */
  xl: 28,
  /** 32px - Huge icons */
  xxl: 32,
} as const;

export type IconSizeType = typeof IconSize;

/**
 * Common component dimension tokens
 */
export const ComponentSize = {
  /** Button and input heights */
  buttonHeight: 44,
  inputHeight: 44,
  /** Tab bar height */
  tabBarHeight: 80,
  /** Header height */
  headerHeight: 56,
  /** Avatar sizes */
  avatarSm: 32,
  avatarMd: 48,
  avatarLg: 60,
  avatarXl: 80,
} as const;

export type ComponentSizeType = typeof ComponentSize;
