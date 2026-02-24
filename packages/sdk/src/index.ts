/**
 * bot-sdk
 *
 * A white-label SDK for React Native/Expo apps.
 * Provides customizable components, hooks, and screens.
 */

// Provider
export {
  BotProvider,
  useBotConfig,
  useBotTheme,
  useBotUrls,
  useBotFeatures,
  useBotAppName,
  useBotScreenConfig,
  type BotProviderProps,
  type ResolvedBotConfig,
  type ResolvedTheme,
  type ResolvedUrls,
  type ResolvedFeatures,
} from './provider';

// Types
export type {
  BotConfig,
  BrandColorConfig,
  SemanticColorConfig,
  ThemeColorsConfig,
  UrlConfig,
  FeatureFlagsConfig,
  ThemeConfig,
  AuthConfig,
  ScreensConfig,
} from './types';

// Contexts
export {
  AuthProvider,
  useAuth,
  type AuthContextType,
  type AuthProviderProps,
  type AuthUser,
} from './contexts';

// Hooks
export {
  useColorScheme,
  useThemeColor,
  useTheme,
  useThemedColor,
} from './hooks';

// Components
export {
  ThemedText,
  ThemedView,
  ExternalLink,
  HapticTab,
  IconSymbol,
  Collapsible,
  type ThemedTextProps,
  type ThemedViewProps,
  type ExternalLinkProps,
  type HapticTabProps,
  type IconSymbolProps,
  type IconSymbolName,
  type CollapsibleProps,
} from './components';

// Design Tokens
export {
  BrandColors,
  Colors,
  Spacing,
  BorderRadius,
  Typography,
  Fonts,
  Shadows,
  IconSize,
  ComponentSize,
  type BrandColorsType,
  type ColorsType,
  type ColorScheme,
  type SemanticColors,
  type SpacingType,
  type BorderRadiusType,
  type TypographyType,
  type FontsType,
  type ShadowsType,
  type IconSizeType,
  type ComponentSizeType,
} from './tokens';

// Screens (to be added)
export * from './screens';
