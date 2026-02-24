import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  /** Light mode background color override */
  lightColor?: string;
  /** Dark mode background color override */
  darkColor?: string;
};

/**
 * A View component that automatically uses theme-aware background colors.
 *
 * @example
 * ```tsx
 * <ThemedView style={styles.container}>
 *   <ThemedText>Content here</ThemedText>
 * </ThemedView>
 * ```
 */
export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
