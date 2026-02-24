/**
 * Hook for getting theme-aware colors
 */
import { Colors, SemanticColors } from '../tokens/colors';
import { useColorScheme } from './use-color-scheme';

type ColorName = keyof SemanticColors;

/**
 * Returns a color value based on the current color scheme
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
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
