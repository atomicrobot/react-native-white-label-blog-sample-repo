/**
 * Health Disclaimer Component
 *
 * Demonstrates using theme hooks for custom styling.
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText, ThemedView, useTheme } from 'bot-sdk';

export function HealthDisclaimer() {
  const { colors, spacing, borderRadius, brandColors } = useTheme();

  return (
    <ThemedView
      lightColor={colors.backgroundSecondary}
      darkColor={colors.backgroundSecondary}
      style={[
        styles.container,
        {
          margin: spacing.md,
          padding: spacing.md,
          borderRadius: borderRadius.md,
          borderLeftWidth: 4,
          borderLeftColor: brandColors.warning,
        },
      ]}
    >
      <ThemedText
        style={[styles.title, { color: brandColors.warning, marginBottom: spacing.xs }]}
      >
        Health Information Disclaimer
      </ThemedText>
      <ThemedText style={[styles.text, { color: colors.textSecondary }]}>
        This AI assistant provides general information only and is not a
        substitute for professional medical advice, diagnosis, or treatment.
        Always consult a qualified healthcare provider.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
  },
});
