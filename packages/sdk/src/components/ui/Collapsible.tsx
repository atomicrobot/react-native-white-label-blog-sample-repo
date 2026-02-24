import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { IconSymbol } from './IconSymbol';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { Colors } from '../../tokens/colors';

export interface CollapsibleProps extends PropsWithChildren {
  /** The title shown in the header */
  title: string;
  /** Whether the collapsible starts open (default: false) */
  defaultOpen?: boolean;
}

/**
 * A collapsible/accordion component with animated chevron.
 *
 * @example
 * ```tsx
 * <Collapsible title="More Info">
 *   <ThemedText>Hidden content here...</ThemedText>
 * </Collapsible>
 * ```
 */
export function Collapsible({
  children,
  title,
  defaultOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
