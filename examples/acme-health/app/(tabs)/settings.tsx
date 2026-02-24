/**
 * Settings Screen - Preset Mode
 *
 * Uses the SDK's SettingsScreen preset with zero configuration.
 * Includes profile section, legal links, and logout button.
 *
 * For customization with render slots:
 *
 * import { BaseSettingsScreen } from 'bot-sdk/screens';
 *
 * export default function CustomSettingsScreen() {
 *   return (
 *     <BaseSettingsScreen
 *       showDeleteAccount={true}
 *       beforeLogout={<DangerZone />}
 *       additionalSections={[
 *         {
 *           id: 'notifications',
 *           title: 'Notifications',
 *           render: () => <NotificationPreferences />,
 *         },
 *       ]}
 *     />
 *   );
 * }
 */
export { SettingsScreen as default } from 'bot-sdk/screens';
