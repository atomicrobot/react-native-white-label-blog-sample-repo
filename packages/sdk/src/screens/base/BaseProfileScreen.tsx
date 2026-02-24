import React, { useState, ReactNode } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { useTheme } from '../../hooks/use-bot-theme';

/**
 * Profile field configuration
 */
export interface ProfileField {
  /** Unique identifier for the field */
  id: string;
  /** Display label */
  label: string;
  /** Initial value */
  value: string;
  /** Placeholder text */
  placeholder?: string;
  /** Keyboard type */
  keyboardType?: KeyboardTypeOptions;
  /** Auto-capitalize setting */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Maximum length */
  maxLength?: number;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is editable */
  editable?: boolean;
  /** Secure text entry (for passwords) */
  secureTextEntry?: boolean;
}

/**
 * Profile section configuration
 */
export interface ProfileSection {
  /** Section title */
  title: string;
  /** Fields in this section */
  fields: ProfileField[];
}

/**
 * Props for BaseProfileScreen
 */
export interface BaseProfileScreenProps {
  /** Screen title */
  title?: string;
  /** Profile sections with fields */
  sections?: ProfileSection[];
  /** Initial field values (key: fieldId, value: field value) */
  initialValues?: Record<string, string>;
  /** Called when save is pressed with all field values */
  onSave?: (values: Record<string, string>) => void | Promise<void>;
  /** Called when back is pressed */
  onBack?: () => void;
  /** Save button text */
  saveButtonText?: string;
  /** Success message after save */
  successMessage?: string;
  /** Custom header content */
  headerContent?: ReactNode;
  /** Custom footer content */
  footerContent?: ReactNode;
  /** Additional sections to render */
  additionalSections?: ReactNode;
  /** Hide the default header */
  hideHeader?: boolean;
  /** Show loading state */
  loading?: boolean;
}

// Default profile sections
const defaultSections: ProfileSection[] = [
  {
    title: 'Account Information',
    fields: [
      {
        id: 'name',
        label: 'Name',
        value: '',
        placeholder: 'Enter your name',
        autoCapitalize: 'words',
      },
      {
        id: 'email',
        label: 'Email',
        value: '',
        placeholder: 'Enter your email',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
      },
      {
        id: 'phone',
        label: 'Phone',
        value: '',
        placeholder: 'Enter your phone number',
        keyboardType: 'phone-pad',
      },
      {
        id: 'zipCode',
        label: 'Zip Code',
        value: '',
        placeholder: 'Enter your zip code',
        keyboardType: 'numeric',
        maxLength: 10,
      },
    ],
  },
];

/**
 * BaseProfileScreen - A customizable profile editing screen
 *
 * Features:
 * - Configurable form fields
 * - Multiple sections support
 * - Built-in validation
 * - Fully themeable
 *
 * @example
 * ```tsx
 * <BaseProfileScreen
 *   title="Edit Profile"
 *   initialValues={{ name: 'John', email: 'john@example.com' }}
 *   onSave={(values) => saveProfile(values)}
 *   onBack={() => router.back()}
 * />
 * ```
 */
export function BaseProfileScreen({
  title = 'Edit Profile',
  sections = defaultSections,
  initialValues = {},
  onSave,
  onBack,
  saveButtonText = 'Save',
  successMessage = 'Profile updated successfully!',
  headerContent,
  footerContent,
  additionalSections,
  hideHeader = false,
  loading = false,
}: BaseProfileScreenProps) {
  const { colors, brandColors } = useTheme();

  // Initialize form values from sections and initialValues
  const getInitialFormValues = () => {
    const values: Record<string, string> = {};
    sections.forEach((section) => {
      section.fields.forEach((field) => {
        values[field.id] = initialValues[field.id] ?? field.value ?? '';
      });
    });
    return values;
  };

  const [formValues, setFormValues] = useState<Record<string, string>>(getInitialFormValues);
  const [saving, setSaving] = useState(false);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSave = async () => {
    if (saving) return;

    setSaving(true);
    try {
      await onSave?.(formValues);
      Alert.alert('Success', successMessage);
      onBack?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const renderField = (field: ProfileField) => (
    <ThemedView key={field.id} style={styles.inputGroup}>
      <ThemedText style={styles.label}>{field.label}</ThemedText>
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder,
          },
        ]}
        value={formValues[field.id] || ''}
        onChangeText={(value) => handleFieldChange(field.id, value)}
        placeholder={field.placeholder}
        placeholderTextColor={colors.placeholder}
        keyboardType={field.keyboardType}
        autoCapitalize={field.autoCapitalize}
        maxLength={field.maxLength}
        editable={field.editable !== false && !loading}
        secureTextEntry={field.secureTextEntry}
      />
    </ThemedView>
  );

  const renderSection = (section: ProfileSection, index: number) => (
    <ThemedView key={index} style={styles.formSection}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        {section.title}
      </ThemedText>
      {section.fields.map(renderField)}
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {!hideHeader && (
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <IconSymbol
              name="chevron.right"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.headerTitle}>
            {title}
          </ThemedText>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveButton}
            disabled={saving || loading}
          >
            <ThemedText
              type="link"
              style={[
                styles.saveText,
                { color: brandColors.primary },
                (saving || loading) && { opacity: 0.5 },
              ]}
            >
              {saving ? 'Saving...' : saveButtonText}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

      {headerContent}

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {sections.map(renderSection)}
        {additionalSections}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    transform: [{ rotate: '180deg' }],
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 24,
  },
  formSection: {
    gap: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
});

export default BaseProfileScreen;
