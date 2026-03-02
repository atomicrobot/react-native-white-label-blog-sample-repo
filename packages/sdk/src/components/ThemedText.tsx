import { StyleSheet, Text, type TextProps } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';
import { useTheme } from '../hooks/use-bot-theme';

export type ThemedTextProps = TextProps & {
  /** Light mode text color override */
  lightColor?: string;
  /** Dark mode text color override */
  darkColor?: string;
  /** Text style variant */
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

/**
 * A Text component that automatically uses theme-aware colors.
 *
 * @example
 * ```tsx
 * <ThemedText>Default text</ThemedText>
 * <ThemedText type="title">Page Title</ThemedText>
 * <ThemedText type="link">Click here</ThemedText>
 * ```
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const { brandColors } = useTheme();

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? [styles.link, { color: brandColors.primary }] : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});
