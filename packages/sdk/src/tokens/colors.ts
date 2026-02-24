/**
 * Default brand colors - can be overridden via BotConfig
 */
export const BrandColors = {
  /** Primary brand color - used for main actions, links, active states */
  primary: '#007AFF',
  /** Secondary brand color - used for secondary actions */
  secondary: '#5856D6',
  /** Accent color - used for highlights and emphasis */
  accent: '#34C759',
  /** Destructive/danger color - used for delete, logout, errors */
  destructive: '#FF3B30',
  /** Warning color - used for alerts and warnings */
  warning: '#FF9500',
  /** Success color - used for success states */
  success: '#34C759',
};

export type BrandColorsType = {
  primary: string;
  secondary: string;
  accent: string;
  destructive: string;
  warning: string;
  success: string;
};

/**
 * Semantic colors for light and dark modes
 */
export const Colors = {
  light: {
    // Text colors
    text: '#11181C',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textInverse: '#FFFFFF',

    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    backgroundTertiary: '#E8E8E8',

    // Surface colors (cards, modals, etc.)
    surface: '#FFFFFF',
    surfaceSecondary: '#F5F5F5',

    // Border colors
    border: '#E0E0E0',
    borderSecondary: '#CCCCCC',

    // Icon colors
    icon: '#687076',
    iconSecondary: '#666666',

    // Tab bar
    tabIconDefault: '#687076',
    tabIconSelected: BrandColors.primary,

    // Legacy support
    tint: BrandColors.primary,

    // Input fields
    inputBackground: '#FFFFFF',
    inputBorder: '#E0E0E0',
    placeholder: '#999999',

    // Disabled states
    disabled: '#CCCCCC',
    disabledText: '#999999',
  },
  dark: {
    // Text colors
    text: '#ECEDEE',
    textSecondary: '#888888',
    textTertiary: '#666666',
    textInverse: '#000000',

    // Background colors
    background: '#151718',
    backgroundSecondary: '#1A1A1A',
    backgroundTertiary: '#2D2D2D',

    // Surface colors (cards, modals, etc.)
    surface: '#2D2D2D',
    surfaceSecondary: '#1A1A1A',

    // Border colors
    border: '#404040',
    borderSecondary: '#333333',

    // Icon colors
    icon: '#9BA1A6',
    iconSecondary: '#888888',

    // Tab bar
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FFFFFF',

    // Legacy support
    tint: '#FFFFFF',

    // Input fields
    inputBackground: '#1A1A1A',
    inputBorder: '#404040',
    placeholder: '#888888',

    // Disabled states
    disabled: '#404040',
    disabledText: '#666666',
  },
};

export type SemanticColors = {
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  surface: string;
  surfaceSecondary: string;
  border: string;
  borderSecondary: string;
  icon: string;
  iconSecondary: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tint: string;
  inputBackground: string;
  inputBorder: string;
  placeholder: string;
  disabled: string;
  disabledText: string;
};

export type ColorsType = {
  light: SemanticColors;
  dark: SemanticColors;
};
export type ColorScheme = 'light' | 'dark';
