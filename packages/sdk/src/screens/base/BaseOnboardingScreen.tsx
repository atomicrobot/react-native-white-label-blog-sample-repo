import { useState, ReactNode } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAuth } from '../../contexts/auth-context';
import { useTheme } from '../../hooks/use-bot-theme';

export interface BaseOnboardingScreenProps {
  /** Custom header/branding content */
  headerContent?: ReactNode;
  /** Custom footer content */
  footerContent?: ReactNode;
  /** Title for login mode */
  loginTitle?: string;
  /** Subtitle for login mode */
  loginSubtitle?: string;
  /** Title for signup mode */
  signupTitle?: string;
  /** Subtitle for signup mode */
  signupSubtitle?: string;
  /** Text for the submit button in login mode */
  loginButtonText?: string;
  /** Text for the submit button in signup mode */
  signupButtonText?: string;
  /** Text for switching to signup */
  switchToSignupText?: string;
  /** Text for switching to login */
  switchToLoginText?: string;
  /** Route to navigate to after successful auth */
  successRoute?: string;
  /** Custom login handler */
  onLogin?: (email: string, password: string) => Promise<boolean>;
  /** Custom signup handler */
  onSignup?: (email: string, password: string, name: string) => Promise<boolean>;
  /** Start in signup mode instead of login */
  startWithSignup?: boolean;
  /** Show name field in signup mode (default: true) */
  showNameField?: boolean;
}

/**
 * Base onboarding screen with login/signup forms.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <BaseOnboardingScreen successRoute="/(tabs)/home" />
 *
 * // With custom branding
 * <BaseOnboardingScreen
 *   headerContent={<Logo />}
 *   loginTitle="Welcome to MyApp"
 *   successRoute="/(tabs)/chat"
 * />
 * ```
 */
export function BaseOnboardingScreen({
  headerContent,
  footerContent,
  loginTitle = 'Welcome Back',
  loginSubtitle = 'Sign in to continue',
  signupTitle = 'Create Account',
  signupSubtitle = 'Sign up to get started',
  loginButtonText = 'Sign In',
  signupButtonText = 'Sign Up',
  switchToSignupText = "Don't have an account? Sign Up",
  switchToLoginText = 'Already have an account? Sign In',
  successRoute = '/(tabs)/chat',
  onLogin,
  onSignup,
  startWithSignup = false,
  showNameField = true,
}: BaseOnboardingScreenProps) {
  const [isLogin, setIsLogin] = useState(!startWithSignup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const { colors, brandColors } = useTheme();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let success = false;
      if (isLogin) {
        success = onLogin ? await onLogin(email, password) : await login(email, password);
      } else {
        success = onSignup
          ? await onSignup(email, password, name)
          : await signup(email, password, name);
      }

      if (success) {
        router.replace(successRoute as any);
      } else {
        Alert.alert('Sign In Failed', 'Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Auth error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView style={styles.content}>
            {headerContent}

            <ThemedView style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                {isLogin ? loginTitle : signupTitle}
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                {isLogin ? loginSubtitle : signupSubtitle}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.form}>
              {!isLogin && showNameField && (
                <ThemedView style={styles.inputGroup}>
                  <ThemedText style={styles.label}>Name</ThemedText>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: colors.text,
                        backgroundColor: colors.inputBackground,
                        borderColor: colors.inputBorder,
                      },
                    ]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="words"
                  />
                </ThemedView>
              )}

              <ThemedView style={styles.inputGroup}>
                <ThemedText style={styles.label}>Email</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      backgroundColor: colors.inputBackground,
                      borderColor: colors.inputBorder,
                    },
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </ThemedView>

              <ThemedView style={styles.inputGroup}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      backgroundColor: colors.inputBackground,
                      borderColor: colors.inputBorder,
                    },
                  ]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.placeholder}
                  secureTextEntry
                  autoComplete="password"
                />
              </ThemedView>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    backgroundColor: loading ? colors.disabled : brandColors.primary,
                  },
                ]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.textInverse} />
                ) : (
                  <ThemedText style={[styles.submitButtonText, { color: colors.textInverse }]}>
                    {isLogin ? loginButtonText : signupButtonText}
                  </ThemedText>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.switchButton} onPress={switchMode}>
                <ThemedText style={styles.switchText}>
                  {isLogin ? switchToSignupText : switchToLoginText}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>

            {footerContent}
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  form: {
    gap: 20,
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
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  submitButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
