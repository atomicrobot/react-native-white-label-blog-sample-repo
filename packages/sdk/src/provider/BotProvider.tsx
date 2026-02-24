import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { BotConfig, defaultBotConfig, UrlConfig } from '../types/config';
import { BrandColors, Colors, BrandColorsType, SemanticColors } from '../tokens/colors';
import { Spacing, SpacingType } from '../tokens/spacing';
import { BorderRadius, BorderRadiusType } from '../tokens/borders';
import { deepMerge } from '../utils/mergeConfig';
import { AuthProvider, AuthProviderProps } from '../contexts/auth-context';

/**
 * Resolved URL configuration with all defaults applied
 */
export interface ResolvedUrls {
  base: Required<NonNullable<UrlConfig['base']>>;
  webView: Required<NonNullable<UrlConfig['webView']>>;
  legal: Required<NonNullable<UrlConfig['legal']>>;
  media: Required<NonNullable<UrlConfig['media']>>;
  social: Required<NonNullable<UrlConfig['social']>>;
  support: Required<NonNullable<UrlConfig['support']>>;
  appStore: Required<NonNullable<UrlConfig['appStore']>>;
}

/**
 * Resolved theme with brand colors and semantic colors merged
 */
export interface ResolvedTheme {
  brandColors: BrandColorsType;
  colors: {
    light: SemanticColors;
    dark: SemanticColors;
  };
  spacing: SpacingType;
  borderRadius: BorderRadiusType;
}

/**
 * Resolved feature flags
 */
export interface ResolvedFeatures {
  enableHaptics: boolean;
  enableChat: boolean;
  enableDonations: boolean;
  enableVolunteer: boolean;
  enableFeed: boolean;
  enableProfile: boolean;
  [key: string]: boolean;
}

/**
 * Fully resolved BotConfig with all defaults applied
 */
export interface ResolvedBotConfig {
  appName: string;
  theme: ResolvedTheme;
  urls: ResolvedUrls;
  features: ResolvedFeatures;
  auth: Required<NonNullable<BotConfig['auth']>>;
  screens: NonNullable<BotConfig['screens']>;
}

const BotContext = createContext<ResolvedBotConfig | null>(null);

export interface BotProviderProps {
  /** Configuration for the SDK */
  config: BotConfig;
  /** Child components */
  children: ReactNode;
  /** Custom auth handlers (optional) */
  authHandlers?: Pick<AuthProviderProps, 'onLogin' | 'onSignup' | 'onLogout'>;
}

/**
 * BotProvider - Main provider component for the Bot SDK
 *
 * Wraps your app to provide theme, URLs, and configuration to all SDK components.
 *
 * @example
 * ```tsx
 * import { BotProvider } from 'bot-sdk';
 *
 * const config = {
 *   appName: 'My App',
 *   theme: { brandColors: { primary: '#007AFF' } },
 *   urls: { base: { website: 'https://example.com' } },
 * };
 *
 * export default function App() {
 *   return (
 *     <BotProvider config={config}>
 *       <YourApp />
 *     </BotProvider>
 *   );
 * }
 * ```
 */
export function BotProvider({ config, children, authHandlers }: BotProviderProps) {
  const resolvedConfig = useMemo((): ResolvedBotConfig => {
    // Merge brand colors
    const resolvedBrandColors: BrandColorsType = {
      ...BrandColors,
      ...config.theme?.brandColors,
    };

    // Merge semantic colors for light mode
    const resolvedLightColors: SemanticColors = {
      ...Colors.light,
      ...config.theme?.colors?.light,
      // Apply brand colors to semantic colors
      tabIconSelected: config.theme?.brandColors?.primary ?? BrandColors.primary,
      tint: config.theme?.brandColors?.primary ?? BrandColors.primary,
    };

    // Merge semantic colors for dark mode
    const resolvedDarkColors: SemanticColors = {
      ...Colors.dark,
      ...config.theme?.colors?.dark,
    };

    // Merge spacing
    const resolvedSpacing: SpacingType = {
      ...Spacing,
      ...config.theme?.spacing,
    };

    // Merge border radius
    const resolvedBorderRadius: BorderRadiusType = {
      ...BorderRadius,
      ...config.theme?.borderRadius,
    };

    // Resolve URLs with defaults
    const resolvedUrls: ResolvedUrls = {
      base: {
        website: config.urls?.base?.website ?? '',
        api: config.urls?.base?.api ?? '',
      },
      webView: {
        donations: config.urls?.webView?.donations ?? '',
        volunteer: config.urls?.webView?.volunteer ?? '',
      },
      legal: {
        privacyPolicy: config.urls?.legal?.privacyPolicy ?? '',
        termsAndConditions: config.urls?.legal?.termsAndConditions ?? '',
      },
      media: {
        defaultVideoStream: config.urls?.media?.defaultVideoStream ?? '',
      },
      social: {
        facebook: config.urls?.social?.facebook ?? '',
        twitter: config.urls?.social?.twitter ?? '',
        instagram: config.urls?.social?.instagram ?? '',
        linkedin: config.urls?.social?.linkedin ?? '',
        youtube: config.urls?.social?.youtube ?? '',
      },
      support: {
        helpCenter: config.urls?.support?.helpCenter ?? '',
        contactUs: config.urls?.support?.contactUs ?? '',
        supportEmail: config.urls?.support?.supportEmail ?? '',
      },
      appStore: {
        appStore: config.urls?.appStore?.appStore ?? '',
        playStore: config.urls?.appStore?.playStore ?? '',
      },
    };

    // Resolve features with defaults
    const resolvedFeatures: ResolvedFeatures = {
      enableHaptics: config.features?.enableHaptics ?? defaultBotConfig.features.enableHaptics!,
      enableChat: config.features?.enableChat ?? defaultBotConfig.features.enableChat!,
      enableDonations: config.features?.enableDonations ?? defaultBotConfig.features.enableDonations!,
      enableVolunteer: config.features?.enableVolunteer ?? defaultBotConfig.features.enableVolunteer!,
      enableFeed: config.features?.enableFeed ?? defaultBotConfig.features.enableFeed!,
      enableProfile: config.features?.enableProfile ?? defaultBotConfig.features.enableProfile!,
      // Include any custom feature flags
      ...Object.fromEntries(
        Object.entries(config.features ?? {}).filter(
          ([key]) => !['enableHaptics', 'enableChat', 'enableDonations', 'enableVolunteer', 'enableFeed', 'enableProfile'].includes(key)
        )
      ),
    };

    return {
      appName: config.appName,
      theme: {
        brandColors: resolvedBrandColors,
        colors: {
          light: resolvedLightColors,
          dark: resolvedDarkColors,
        },
        spacing: resolvedSpacing,
        borderRadius: resolvedBorderRadius,
      },
      urls: resolvedUrls,
      features: resolvedFeatures,
      auth: {
        storageKeyPrefix: config.auth?.storageKeyPrefix ?? defaultBotConfig.auth.storageKeyPrefix!,
      },
      screens: config.screens ?? {},
    };
  }, [config]);

  return (
    <BotContext.Provider value={resolvedConfig}>
      <AuthProvider
        storageKeyPrefix={resolvedConfig.auth.storageKeyPrefix}
        {...authHandlers}
      >
        {children}
      </AuthProvider>
    </BotContext.Provider>
  );
}

/**
 * Hook to access the full resolved Bot configuration
 *
 * @throws Error if used outside of BotProvider
 */
export function useBotConfig(): ResolvedBotConfig {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error('useBotConfig must be used within an BotProvider');
  }
  return context;
}

/**
 * Hook to access the resolved theme (colors, spacing, etc.)
 */
export function useBotTheme(): ResolvedTheme {
  const config = useBotConfig();
  return config.theme;
}

/**
 * Hook to access the resolved URLs
 */
export function useBotUrls(): ResolvedUrls {
  const config = useBotConfig();
  return config.urls;
}

/**
 * Hook to access the resolved feature flags
 */
export function useBotFeatures(): ResolvedFeatures {
  const config = useBotConfig();
  return config.features;
}

/**
 * Hook to access the app name
 */
export function useBotAppName(): string {
  const config = useBotConfig();
  return config.appName;
}

/**
 * Hook to access screen-specific configuration
 */
export function useBotScreenConfig<K extends keyof NonNullable<BotConfig['screens']>>(
  screen: K
): NonNullable<BotConfig['screens']>[K] | undefined {
  const config = useBotConfig();
  return config.screens[screen];
}
