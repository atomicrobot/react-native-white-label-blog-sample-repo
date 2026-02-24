/**
 * Custom Header Component
 *
 * Demonstrates building custom components using SDK themed primitives.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText, ThemedView, useTheme, useBotAppName } from 'bot-sdk';

interface HealthHeaderProps {
  subtitle?: string;
}

export function HealthHeader({ subtitle }: HealthHeaderProps) {
  const { colors, brandColors, spacing, borderRadius } = useTheme();
  const appName = useBotAppName();

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.titleRow}>
        <View
          style={[
            styles.logo,
            {
              backgroundColor: brandColors.primary,
              borderRadius: borderRadius.sm,
            },
          ]}
        >
          <ThemedText style={styles.logoText}>AH</ThemedText>
        </View>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle">{appName}</ThemedText>
          {subtitle && (
            <ThemedText style={{ color: colors.textSecondary }}>
              {subtitle}
            </ThemedText>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
  },
});
