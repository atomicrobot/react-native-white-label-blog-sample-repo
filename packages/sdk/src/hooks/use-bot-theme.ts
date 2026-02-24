/**
 * Enhanced theme hook that uses BotProvider configuration
 */
import { useBotTheme } from '../provider/BotProvider';
import { useColorScheme } from './use-color-scheme';
import { SemanticColors } from '../tokens/colors';

/**
 * Returns the current theme colors based on color scheme and BotProvider config
 *
 * @example
 * ```tsx
 * const { colors, brandColors, spacing, borderRadius, isDark } = useTheme();
 *
 * <View style={{
 *   backgroundColor: colors.surface,
 *   padding: spacing.lg,
 *   borderRadius: borderRadius.md,
 * }}>
 *   <Text style={{ color: colors.text }}>Hello</Text>
 *   <Button color={brandColors.primary} />
 * </View>
 * ```
 */
export function useTheme() {
  const botTheme = useBotTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    /** Whether dark mode is active */
    isDark,
    /** Current color scheme ('light' or 'dark') */
    colorScheme: colorScheme ?? 'light',
    /** Semantic colors for the current color scheme */
    colors: botTheme.colors[isDark ? 'dark' : 'light'] as SemanticColors,
    /** Brand colors (primary, secondary, etc.) */
    brandColors: botTheme.brandColors,
    /** Spacing tokens */
    spacing: botTheme.spacing,
    /** Border radius tokens */
    borderRadius: botTheme.borderRadius,
    /** Full theme object */
    theme: botTheme,
  };
}

/**
 * Returns a specific color from the theme
 *
 * @param colorName - The semantic color name
 * @param overrides - Optional light/dark color overrides
 */
export function useThemedColor(
  colorName: keyof SemanticColors,
  overrides?: { light?: string; dark?: string }
): string {
  const { colors, isDark } = useTheme();

  if (overrides) {
    const override = isDark ? overrides.dark : overrides.light;
    if (override) return override;
  }

  return colors[colorName];
}
