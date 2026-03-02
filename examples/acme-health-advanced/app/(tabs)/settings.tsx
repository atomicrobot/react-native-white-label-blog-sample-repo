/**
 * Settings Screen - Using Base Screen with Render Slots
 *
 * Demonstrates the render slots pattern:
 * - beforeProfile: Content before profile section
 * - afterProfile: Content after profile section
 * - beforeLegal: Content before legal section
 * - afterLegal: Content after legal section
 * - beforeLogout: Content before logout (danger zone)
 * - afterLogout: Content after logout
 * - additionalSections: Custom sections to add
 */
import React, { useState } from 'react';
import { Switch, StyleSheet, View } from 'react-native';
import { BaseSettingsScreen } from 'bot-sdk/screens';
import { ThemedText, ThemedView, useTheme, useBotFeatures } from 'bot-sdk';

// Custom notification preferences component
function NotificationPreferences() {
  const { colors, spacing, brandColors } = useTheme();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const NotificationRow = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <View
      style={[
        styles.row,
        { borderBottomColor: colors.border, paddingVertical: spacing.md },
      ]}
    >
      <ThemedText>{label}</ThemedText>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.disabled, true: brandColors.primary }}
      />
    </View>
  );

  return (
    <ThemedView style={{ padding: spacing.md }}>
      <NotificationRow label="Push Notifications" value={pushEnabled} onChange={setPushEnabled} />
      <NotificationRow label="Email Notifications" value={emailEnabled} onChange={setEmailEnabled} />
      <NotificationRow label="SMS Notifications" value={smsEnabled} onChange={setSmsEnabled} />
    </ThemedView>
  );
}

// Health data export component
function HealthDataExport() {
  const { colors, spacing, brandColors } = useTheme();

  return (
    <ThemedView style={{ padding: spacing.md }}>
      <ThemedText style={{ color: colors.textSecondary, marginBottom: spacing.sm }}>
        Export your health data in various formats for your records or to share
        with healthcare providers.
      </ThemedText>
      <View style={styles.buttonRow}>
        <ThemedView
          style={[styles.exportButton, { backgroundColor: brandColors.primary }]}
        >
          <ThemedText style={{ color: '#FFFFFF' }}>Export PDF</ThemedText>
        </ThemedView>
        <ThemedView
          style={[styles.exportButton, { backgroundColor: colors.border }]}
        >
          <ThemedText>Export CSV</ThemedText>
        </ThemedView>
      </View>
    </ThemedView>
  );
}

// Account deletion warning
function DangerZone() {
  const { brandColors, spacing, borderRadius, colors } = useTheme();

  return (
    <ThemedView
      style={[
        styles.dangerZone,
        {
          margin: spacing.md,
          padding: spacing.md,
          borderRadius: borderRadius.md,
          borderColor: brandColors.destructive,
          backgroundColor: colors.backgroundSecondary,
        },
      ]}
    >
      <ThemedText
        style={[styles.dangerTitle, { color: brandColors.destructive }]}
      >
        Danger Zone
      </ThemedText>
      <ThemedText style={{ color: colors.textSecondary }}>
        Deleting your account will permanently remove all your health data.
        This action cannot be undone.
      </ThemedText>
    </ThemedView>
  );
}

export default function SettingsScreen() {
  const features = useBotFeatures();

  return (
    <BaseSettingsScreen
      // Show logout button
      showLogout={true}
      // Inject custom content using render slots
      beforeLogout={<DangerZone />}
      // Add custom sections
      additionalSections={[
        {
          id: 'notifications',
          title: 'Notification Preferences',
          render: () => <NotificationPreferences />,
        },
        {
          id: 'data-export',
          title: 'Health Data Export',
          render: () => <HealthDataExport />,
        },
        // Conditionally add sections based on feature flags
        ...(features.enableTelemedicine
          ? [
              {
                id: 'telemedicine',
                title: 'Telemedicine Settings',
                render: () => (
                  <ThemedView style={{ padding: 16 }}>
                    <ThemedText>Configure your telemedicine preferences...</ThemedText>
                  </ThemedView>
                ),
              },
            ]
          : []),
      ]}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  exportButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  dangerZone: {
    borderWidth: 1,
  },
  dangerTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
