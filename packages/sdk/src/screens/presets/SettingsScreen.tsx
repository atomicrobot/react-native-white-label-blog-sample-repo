import { BaseSettingsScreen, BaseSettingsScreenProps } from '../base/BaseSettingsScreen';
import { useAuth } from '../../contexts/auth-context';

export type SettingsScreenProps = Omit<BaseSettingsScreenProps, 'profileName' | 'profileEmail'> & {
  /** Override profile name (defaults to auth user name) */
  profileName?: string;
  /** Override profile email (defaults to auth user email) */
  profileEmail?: string;
};

/**
 * Pre-configured settings screen that uses auth context for user data.
 *
 * @example
 * ```tsx
 * // In your app/(tabs)/settings.tsx
 * import { SettingsScreen } from 'bot-sdk/screens';
 * export default SettingsScreen;
 *
 * // Or with custom sections
 * export default function Settings() {
 *   return (
 *     <SettingsScreen
 *       additionalSections={[
 *         { id: 'prefs', title: 'Preferences', render: () => <Preferences /> }
 *       ]}
 *     />
 *   );
 * }
 * ```
 */
export function SettingsScreen({ profileName, profileEmail, ...props }: SettingsScreenProps) {
  const { user } = useAuth();

  return (
    <BaseSettingsScreen
      profileName={profileName ?? user?.name ?? 'User'}
      profileEmail={profileEmail ?? user?.email ?? 'user@example.com'}
      {...props}
    />
  );
}
