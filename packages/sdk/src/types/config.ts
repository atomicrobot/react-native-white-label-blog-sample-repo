import { ReactNode } from 'react';

/**
 * Brand color overrides for white-labeling
 */
export interface BrandColorConfig {
  /** Primary brand color - used for main actions, links, active states */
  primary?: string;
  /** Secondary brand color - used for secondary actions */
  secondary?: string;
  /** Accent color - used for highlights and emphasis */
  accent?: string;
  /** Destructive/danger color - used for delete, logout, errors */
  destructive?: string;
  /** Warning color - used for alerts and warnings */
  warning?: string;
  /** Success color - used for success states */
  success?: string;
}

/**
 * Semantic color configuration for light/dark modes
 */
export interface SemanticColorConfig {
  // Text colors
  text?: string;
  textSecondary?: string;
  textTertiary?: string;
  textInverse?: string;

  // Background colors
  background?: string;
  backgroundSecondary?: string;
  backgroundTertiary?: string;

  // Surface colors (cards, modals, etc.)
  surface?: string;
  surfaceSecondary?: string;

  // Border colors
  border?: string;
  borderSecondary?: string;

  // Icon colors
  icon?: string;
  iconSecondary?: string;

  // Tab bar
  tabIconDefault?: string;
  tabIconSelected?: string;

  // Legacy support
  tint?: string;

  // Input fields
  inputBackground?: string;
  inputBorder?: string;
  placeholder?: string;

  // Disabled states
  disabled?: string;
  disabledText?: string;
}

/**
 * Theme color configuration with light/dark mode variants
 */
export interface ThemeColorsConfig {
  light?: Partial<SemanticColorConfig>;
  dark?: Partial<SemanticColorConfig>;
}

/**
 * URL configuration for the app
 */
export interface UrlConfig {
  /** Base URLs for the organization */
  base?: {
    website?: string;
    api?: string;
  };
  /** URLs for WebView screens */
  webView?: {
    donations?: string;
    volunteer?: string;
  };
  /** Legal document URLs */
  legal?: {
    privacyPolicy?: string;
    termsAndConditions?: string;
  };
  /** Media asset URLs */
  media?: {
    defaultVideoStream?: string;
  };
  /** Social media links */
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  /** Support resources */
  support?: {
    helpCenter?: string;
    contactUs?: string;
    supportEmail?: string;
  };
  /** App store links */
  appStore?: {
    appStore?: string;
    playStore?: string;
  };
}

/**
 * Feature flags for enabling/disabling SDK features
 */
export interface FeatureFlagsConfig {
  /** Enable haptic feedback on tab presses */
  enableHaptics?: boolean;
  /** Enable the chat/Q&A screen */
  enableChat?: boolean;
  /** Enable the donations screen */
  enableDonations?: boolean;
  /** Enable the volunteer screen */
  enableVolunteer?: boolean;
  /** Enable the feed screen */
  enableFeed?: boolean;
  /** Enable the profile screen */
  enableProfile?: boolean;
  /** Custom feature flags */
  [key: string]: boolean | undefined;
}

/**
 * Spacing token overrides
 */
export interface SpacingConfig {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  xxxl?: number;
  huge?: number;
}

/**
 * Border radius token overrides
 */
export interface BorderRadiusConfig {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  full?: number;
}

/**
 * Theme configuration combining all visual customizations
 */
export interface ThemeConfig {
  /** Brand color overrides */
  brandColors?: BrandColorConfig;
  /** Semantic color overrides for light/dark modes */
  colors?: ThemeColorsConfig;
  /** Spacing token overrides */
  spacing?: Partial<SpacingConfig>;
  /** Border radius overrides */
  borderRadius?: Partial<BorderRadiusConfig>;
}

/**
 * Auth configuration options
 */
export interface AuthConfig {
  /** Prefix for AsyncStorage keys (default: '@bot') */
  storageKeyPrefix?: string;
}

/**
 * Screen-specific configuration options
 */
export interface ScreensConfig {
  /** Onboarding screen customization */
  onboarding?: {
    loginTitle?: string;
    loginSubtitle?: string;
    signupTitle?: string;
    signupSubtitle?: string;
  };
  /** Settings screen customization */
  settings?: {
    showProfile?: boolean;
    showLegal?: boolean;
    showLogout?: boolean;
  };
  /** Chat screen customization */
  chat?: {
    placeholder?: string;
    enableVoiceInput?: boolean;
  };
  /** Feed screen customization */
  feed?: {
    enablePolls?: boolean;
    enableComments?: boolean;
    enableSharing?: boolean;
  };
}

/**
 * Main BotConfig interface - the primary configuration for the SDK
 */
export interface BotConfig {
  /** Required: App name displayed in the UI */
  appName: string;

  /** Theme customization (colors, spacing, etc.) */
  theme?: ThemeConfig;

  /** URL configuration */
  urls?: UrlConfig;

  /** Feature flags */
  features?: FeatureFlagsConfig;

  /** Auth configuration */
  auth?: AuthConfig;

  /** Screen-specific configuration */
  screens?: ScreensConfig;
}

/**
 * Default configuration values
 */
export const defaultBotConfig: Required<Omit<BotConfig, 'appName'>> & { appName: string } = {
  appName: 'Bot App',
  theme: {},
  urls: {},
  features: {
    enableHaptics: true,
    enableChat: true,
    enableDonations: true,
    enableVolunteer: true,
    enableFeed: true,
    enableProfile: true,
  },
  auth: {
    storageKeyPrefix: '@bot',
  },
  screens: {},
};
