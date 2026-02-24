import React from 'react';
import { BaseProfileScreen, BaseProfileScreenProps, ProfileSection } from '../base/BaseProfileScreen';

// Default profile sections
const defaultProfileSections: ProfileSection[] = [
  {
    title: 'Account Information',
    fields: [
      {
        id: 'name',
        label: 'Name',
        value: 'John Doe',
        placeholder: 'Enter your name',
        autoCapitalize: 'words',
      },
      {
        id: 'email',
        label: 'Email',
        value: 'john.doe@example.com',
        placeholder: 'Enter your email',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
      },
      {
        id: 'phone',
        label: 'Phone',
        value: '+1 (555) 123-4567',
        placeholder: 'Enter your phone number',
        keyboardType: 'phone-pad',
      },
      {
        id: 'zipCode',
        label: 'Zip Code',
        value: '45202',
        placeholder: 'Enter your zip code',
        keyboardType: 'numeric',
        maxLength: 10,
      },
    ],
  },
];

/**
 * ProfileScreen - Pre-configured profile editing screen
 *
 * Includes standard profile fields (name, email, phone, zip code).
 * Ready to use out of the box.
 *
 * @example
 * ```tsx
 * // In your app/profile.tsx
 * import { ProfileScreen } from 'bot-sdk/screens';
 * import { router } from 'expo-router';
 *
 * export default function Profile() {
 *   return (
 *     <ProfileScreen
 *       onBack={() => router.back()}
 *       onSave={(values) => saveToAPI(values)}
 *     />
 *   );
 * }
 * ```
 */
export function ProfileScreen(props: Partial<BaseProfileScreenProps>) {
  return (
    <BaseProfileScreen
      title="Edit Profile"
      sections={defaultProfileSections}
      {...props}
    />
  );
}

export default ProfileScreen;
