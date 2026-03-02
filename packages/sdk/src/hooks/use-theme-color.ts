/**
 * Hook for getting theme-aware colors
 */
import { SemanticColors } from '../tokens/colors';
import { useColorScheme } from './use-color-scheme';
import { useBotTheme } from '../provider/BotProvider';

type ColorName = keyof SemanticColors;

/**
 * Returns a color value based on the current color scheme and resolved BotProvider config.
 *
 * @param props - Optional light/dark color overrides
 * @param colorName - The semantic color name from the theme
 * @returns The resolved color value
 *
 * @example
 * ```tsx
 * const backgroundColor = useThemeColor({}, 'background');
 * const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
 * ```
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
): string {
  const theme = useColorScheme() ?? 'light';
  const botTheme = useBotTheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return botTheme.colors[theme][colorName];
}
