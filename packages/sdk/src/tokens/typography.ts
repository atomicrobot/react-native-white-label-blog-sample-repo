import { Platform } from 'react-native';

/**
 * Typography design tokens - font sizes and weights
 */
export const Typography = {
  size: {
    /** 10px - Tiny text */
    xs: 10,
    /** 12px - Small text, captions */
    sm: 12,
    /** 14px - Secondary text */
    md: 14,
    /** 16px - Body text */
    base: 16,
    /** 18px - Large body text */
    lg: 18,
    /** 20px - Subtitle */
    xl: 20,
    /** 24px - Small title */
    xxl: 24,
    /** 28px - Medium title */
    xxxl: 28,
    /** 32px - Large title */
    title: 32,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  weight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export type TypographyType = typeof Typography;

/**
 * Platform-specific font families
 */
export const Fonts = Platform.select({
  ios: {
    /** iOS system font */
    sans: 'system-ui',
    /** iOS serif font */
    serif: 'ui-serif',
    /** iOS rounded font */
    rounded: 'ui-rounded',
    /** iOS monospace font */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export type FontsType = typeof Fonts;
