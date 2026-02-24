/**
 * Theme Showcase - displays all theming colors, tokens, and components
 *
 * Useful for screenshots demonstrating how a single brand color change
 * updates the entire app.
 */
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import { ThemedText, ThemedView, useTheme } from 'bot-sdk';

function ColorSwatch({ color, label }: { color: string; label: string }) {
  const { colors, spacing, borderRadius } = useTheme();
  const isLight = isLightColor(color);
  return (
    <View style={[styles.swatch, { backgroundColor: color, borderRadius: borderRadius.sm, borderColor: colors.border, borderWidth: 1 }]}>
      <View style={{ padding: spacing.xs }}>
        <ThemedText style={[styles.swatchLabel, { color: isLight ? '#000' : '#FFF', fontSize: 11 }]}>
          {label}
        </ThemedText>
        <ThemedText style={[styles.swatchHex, { color: isLight ? '#333' : '#DDD', fontSize: 10 }]}>
          {color}
        </ThemedText>
      </View>
    </View>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors, spacing } = useTheme();
  return (
    <View style={{ marginBottom: spacing.xxl }}>
      <ThemedText type="subtitle" style={{ marginBottom: spacing.md }}>{title}</ThemedText>
      <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md }}>
        {children}
      </View>
    </View>
  );
}

export default function ShowcaseScreen() {
  const { colors, brandColors, spacing, borderRadius, isDark } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { padding: spacing.lg }]}>
        <ThemedText type="title" style={{ marginBottom: spacing.xs }}>Theme Showcase</ThemedText>
        <ThemedText style={{ color: colors.textSecondary, marginBottom: spacing.xxxl }}>
          {isDark ? 'Dark' : 'Light'} mode active
        </ThemedText>

        {/* Brand Colors */}
        <Section title="Brand Colors">
          <View style={styles.swatchRow}>
            <ColorSwatch color={brandColors.primary} label="primary" />
            <ColorSwatch color={brandColors.secondary} label="secondary" />
            <ColorSwatch color={brandColors.accent} label="accent" />
          </View>
          <View style={styles.swatchRow}>
            <ColorSwatch color={brandColors.destructive} label="destructive" />
            <ColorSwatch color={brandColors.warning} label="warning" />
            <ColorSwatch color={brandColors.success} label="success" />
          </View>
        </Section>

        {/* Semantic Colors - Text */}
        <Section title="Text Colors">
          <View style={styles.swatchRow}>
            <ColorSwatch color={colors.text} label="text" />
            <ColorSwatch color={colors.textSecondary} label="textSecondary" />
            <ColorSwatch color={colors.textTertiary} label="textTertiary" />
          </View>
        </Section>

        {/* Semantic Colors - Backgrounds & Surfaces */}
        <Section title="Backgrounds & Surfaces">
          <View style={styles.swatchRow}>
            <ColorSwatch color={colors.background} label="background" />
            <ColorSwatch color={colors.backgroundSecondary} label="bgSecondary" />
            <ColorSwatch color={colors.backgroundTertiary} label="bgTertiary" />
          </View>
          <View style={styles.swatchRow}>
            <ColorSwatch color={colors.surface} label="surface" />
            <ColorSwatch color={colors.surfaceSecondary} label="surfaceSecondary" />
            <ColorSwatch color={colors.tint} label="tint" />
          </View>
        </Section>

        {/* Semantic Colors - Borders & Icons */}
        <Section title="Borders, Icons & Inputs">
          <View style={styles.swatchRow}>
            <ColorSwatch color={colors.border} label="border" />
            <ColorSwatch color={colors.icon} label="icon" />
            <ColorSwatch color={colors.inputBackground} label="inputBg" />
          </View>
          <View style={styles.swatchRow}>
            <ColorSwatch color={colors.disabled} label="disabled" />
            <ColorSwatch color={colors.disabledText} label="disabledText" />
            <ColorSwatch color={colors.placeholder} label="placeholder" />
          </View>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <ThemedText type="title">Title</ThemedText>
          <ThemedText type="subtitle">Subtitle</ThemedText>
          <ThemedText type="defaultSemiBold">Default Semibold</ThemedText>
          <ThemedText>Default body text</ThemedText>
          <ThemedText type="link">Link text</ThemedText>
          <ThemedText style={{ color: colors.textSecondary, marginTop: spacing.xs }}>
            Secondary text color
          </ThemedText>
          <ThemedText style={{ color: colors.textTertiary }}>
            Tertiary text color
          </ThemedText>
        </Section>

        {/* Buttons */}
        <Section title="Button Variants">
          <Pressable
            style={[styles.button, {
              backgroundColor: brandColors.primary,
              borderRadius: borderRadius.xl,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xxl,
              marginBottom: spacing.sm,
            }]}>
            <ThemedText style={[styles.buttonText, { color: '#FFFFFF' }]}>Primary Button</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.button, {
              backgroundColor: colors.surface,
              borderRadius: borderRadius.xl,
              borderWidth: 1,
              borderColor: brandColors.primary,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xxl,
              marginBottom: spacing.sm,
            }]}>
            <ThemedText style={[styles.buttonText, { color: brandColors.primary }]}>Secondary Button</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.button, {
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xxl,
              marginBottom: spacing.sm,
            }]}>
            <ThemedText style={[styles.buttonText, { color: brandColors.primary }]}>Ghost Button</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.button, {
              backgroundColor: brandColors.destructive,
              borderRadius: borderRadius.xl,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xxl,
              marginBottom: spacing.sm,
            }]}>
            <ThemedText style={[styles.buttonText, { color: '#FFFFFF' }]}>Destructive Button</ThemedText>
          </Pressable>
          <Pressable
            disabled
            style={[styles.button, {
              backgroundColor: colors.disabled,
              borderRadius: borderRadius.xl,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xxl,
            }]}>
            <ThemedText style={[styles.buttonText, { color: colors.disabledText }]}>Disabled Button</ThemedText>
          </Pressable>
        </Section>

        {/* Cards */}
        <Section title="Card Variants">
          <View style={[styles.card, {
            backgroundColor: colors.surface,
            borderRadius: borderRadius.md,
            padding: spacing.lg,
            marginBottom: spacing.md,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDark ? 0.4 : 0.1,
            shadowRadius: 8,
            elevation: 4,
          }]}>
            <ThemedText type="defaultSemiBold">Elevated Card</ThemedText>
            <ThemedText style={{ color: colors.textSecondary, marginTop: spacing.xs }}>
              Uses shadow for depth. Shadow adapts to light/dark mode.
            </ThemedText>
          </View>
          <View style={[styles.card, {
            backgroundColor: colors.surface,
            borderRadius: borderRadius.md,
            padding: spacing.lg,
            marginBottom: spacing.md,
            borderWidth: 1,
            borderColor: colors.border,
          }]}>
            <ThemedText type="defaultSemiBold">Outlined Card</ThemedText>
            <ThemedText style={{ color: colors.textSecondary, marginTop: spacing.xs }}>
              Border instead of shadow. Works well in both modes.
            </ThemedText>
          </View>
          <View style={[styles.card, {
            backgroundColor: colors.surfaceSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.lg,
          }]}>
            <ThemedText type="defaultSemiBold">Filled Card</ThemedText>
            <ThemedText style={{ color: colors.textSecondary, marginTop: spacing.xs }}>
              Different background color. Simplest variant.
            </ThemedText>
          </View>
        </Section>

        {/* Input Fields */}
        <Section title="Input Fields">
          <TextInput
            placeholder="Default input"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, {
              backgroundColor: colors.inputBackground,
              borderColor: colors.inputBorder,
              color: colors.text,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              paddingHorizontal: spacing.lg,
              marginBottom: spacing.sm,
            }]}
          />
          <TextInput
            placeholder="Focused input"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, {
              backgroundColor: colors.inputBackground,
              borderColor: brandColors.primary,
              borderWidth: 2,
              color: colors.text,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              paddingHorizontal: spacing.lg,
              marginBottom: spacing.sm,
            }]}
          />
          <TextInput
            placeholder="Disabled input"
            placeholderTextColor={colors.disabledText}
            editable={false}
            style={[styles.input, {
              backgroundColor: colors.disabled,
              borderColor: colors.disabled,
              color: colors.disabledText,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              paddingHorizontal: spacing.lg,
            }]}
          />
        </Section>

        {/* Status Badges */}
        <Section title="Status Badges">
          <View style={[styles.swatchRow, { flexWrap: 'wrap' }]}>
            {[
              { label: 'Success', color: brandColors.success },
              { label: 'Warning', color: brandColors.warning },
              { label: 'Error', color: brandColors.destructive },
              { label: 'Info', color: brandColors.primary },
            ].map(({ label, color }) => (
              <View
                key={label}
                style={{
                  backgroundColor: color + '20',
                  borderRadius: borderRadius.full,
                  paddingVertical: spacing.xs,
                  paddingHorizontal: spacing.md,
                  marginRight: spacing.sm,
                  marginBottom: spacing.sm,
                }}>
                <ThemedText style={{ color, fontSize: 13, fontWeight: '600' }}>{label}</ThemedText>
              </View>
            ))}
          </View>
        </Section>

        <View style={{ height: spacing.huge }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  swatch: {
    width: 100,
    height: 64,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  swatchLabel: {
    fontWeight: '600',
  },
  swatchHex: {
    fontFamily: 'monospace',
  },
  spacingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacingLabel: {
    width: 100,
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  card: {},
  input: {
    borderWidth: 1,
    fontSize: 16,
  },
});
