import React, { ReactNode } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { ExternalLink } from '../../components/ExternalLink';
import { useAuth } from '../../contexts/auth-context';
import { useTheme } from '../../hooks/use-bot-theme';
import { useBotUrls } from '../../provider/BotProvider';

export interface SettingsSection {
  id: string;
  title?: string;
  render: () => ReactNode;
}

export interface BaseSettingsScreenProps {
  /** Override the header */
  renderHeader?: () => ReactNode;
  /** Content after header, before sections */
  headerContent?: ReactNode;
  /** Content before profile section */
  beforeProfile?: ReactNode;
  /** Content after profile section */
  afterProfile?: ReactNode;
  /** Content before legal section */
  beforeLegal?: ReactNode;
  /** Content after legal section */
  afterLegal?: ReactNode;
  /** Content before logout button */
  beforeLogout?: ReactNode;
  /** Content at the bottom */
  footerContent?: ReactNode;
  /** Additional custom sections */
  additionalSections?: SettingsSection[];
  /** Show profile section (default: true) */
  showProfile?: boolean;
  /** Show legal section (default: true) */
  showLegal?: boolean;
  /** Show logout button (default: true) */
  showLogout?: boolean;
  /** Custom profile press handler */
  onProfilePress?: () => void;
  /** Custom logout handler */
  onLogout?: () => Promise<void>;
  /** Profile name to display */
  profileName?: string;
  /** Profile email to display */
  profileEmail?: string;
  /** Route to navigate after logout */
  logoutRoute?: string;
  /** Route for profile screen */
  profileRoute?: string;
}

/**
 * Base settings screen with customizable sections.
 *
 * @example
 * ```tsx
 * // Basic usage with defaults
 * <BaseSettingsScreen
 *   profileName={user?.name}
 *   profileEmail={user?.email}
 * />
 *
 * // With custom sections
 * <BaseSettingsScreen
 *   additionalSections={[
 *     {
 *       id: 'notifications',
 *       title: 'Notifications',
 *       render: () => <NotificationSettings />,
 *     },
 *   ]}
 *   beforeLogout={<DangerZone />}
 * />
 * ```
 */
export function BaseSettingsScreen({
  renderHeader,
  headerContent,
  beforeProfile,
  afterProfile,
  beforeLegal,
  afterLegal,
  beforeLogout,
  footerContent,
  additionalSections = [],
  showProfile = true,
  showLegal = true,
  showLogout = true,
  onProfilePress,
  onLogout,
  profileName = 'User',
  profileEmail = 'user@example.com',
  logoutRoute = '/onboarding',
  profileRoute = '/profile',
}: BaseSettingsScreenProps) {
  const { colors, brandColors } = useTheme();
  const urls = useBotUrls();
  const { logout } = useAuth();

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push(profileRoute as any);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          if (onLogout) {
            await onLogout();
          } else {
            await logout();
            router.replace(logoutRoute as any);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader ? (
        renderHeader()
      ) : (
        <ThemedView style={[styles.header, { borderBottomColor: colors.border }]}>
          <ThemedText type="title" style={styles.headerTitle}>
            Settings
          </ThemedText>
        </ThemedView>
      )}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {headerContent}
        {beforeProfile}

        {showProfile && (
          <View style={styles.sectionContainer}>
            <View
              style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <TouchableOpacity
                style={styles.profileRow}
                onPress={handleProfilePress}
                activeOpacity={0.7}
              >
                <View style={styles.profileInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.profileName}>
                    {profileName}
                  </ThemedText>
                  <ThemedText style={styles.profileEmail}>{profileEmail}</ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.iconSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {afterProfile}
        {beforeLegal}

        {showLegal && (urls.legal.privacyPolicy || urls.legal.termsAndConditions) && (
          <View style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              Legal
            </ThemedText>
            <View
              style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              {urls.legal.privacyPolicy && (
                <ExternalLink href={urls.legal.privacyPolicy} asChild>
                  <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
                    <View style={styles.linkContent}>
                      <IconSymbol name="info.circle.fill" size={20} color={colors.iconSecondary} />
                      <ThemedText style={styles.linkText}>Privacy Policy</ThemedText>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color={colors.iconSecondary} />
                  </TouchableOpacity>
                </ExternalLink>
              )}

              {urls.legal.privacyPolicy && urls.legal.termsAndConditions && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}

              {urls.legal.termsAndConditions && (
                <ExternalLink href={urls.legal.termsAndConditions} asChild>
                  <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
                    <View style={styles.linkContent}>
                      <IconSymbol name="info.circle.fill" size={20} color={colors.iconSecondary} />
                      <ThemedText style={styles.linkText}>Terms & Conditions</ThemedText>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color={colors.iconSecondary} />
                  </TouchableOpacity>
                </ExternalLink>
              )}
            </View>
          </View>
        )}

        {afterLegal}

        {/* Custom sections */}
        {additionalSections.map((section) => (
          <View key={section.id} style={styles.sectionContainer}>
            {section.title && (
              <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                {section.title}
              </ThemedText>
            )}
            {section.render()}
          </View>
        ))}

        {beforeLogout}

        {showLogout && (
          <View style={styles.sectionContainer}>
            <TouchableOpacity
              style={[styles.logoutButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <ThemedText style={[styles.logoutText, { color: brandColors.destructive }]}>
                Logout
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {footerContent}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.6,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  linkText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    marginLeft: 48,
  },
  logoutButton: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
