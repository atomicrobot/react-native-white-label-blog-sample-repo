import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

/**
 * User data stored in auth context
 */
export interface AuthUser {
  email: string;
  name: string;
  [key: string]: unknown;
}

/**
 * Auth context value type
 */
export interface AuthContextType {
  /** Whether the user is currently authenticated */
  isAuthenticated: boolean;
  /** Whether auth status is still loading */
  isLoading: boolean;
  /** Current user data (if authenticated) */
  user: AuthUser | null;
  /** Log in with email and password */
  login: (email: string, password: string) => Promise<boolean>;
  /** Sign up with email, password, and name */
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  /** Log out the current user */
  logout: () => Promise<void>;
  /** Update the current user's data */
  updateUser: (data: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  /** Child components */
  children: ReactNode;
  /** Storage key prefix (default: '@bot') */
  storageKeyPrefix?: string;
  /** Custom login handler (optional - defaults to demo mode) */
  onLogin?: (email: string, password: string) => Promise<{ token: string; user: AuthUser } | null>;
  /** Custom signup handler (optional - defaults to demo mode) */
  onSignup?: (email: string, password: string, name: string) => Promise<{ token: string; user: AuthUser } | null>;
  /** Custom logout handler (optional) */
  onLogout?: () => Promise<void>;
}

/**
 * AuthProvider - Provides authentication state and methods to the app
 *
 * By default, operates in "demo mode" where login/signup always succeeds.
 * For production, provide custom onLogin/onSignup handlers.
 *
 * @example
 * ```tsx
 * // Demo mode (default)
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * // Production mode with custom handlers
 * <AuthProvider
 *   onLogin={async (email, password) => {
 *     const response = await api.login(email, password);
 *     return response.success ? { token: response.token, user: response.user } : null;
 *   }}
 * >
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({
  children,
  storageKeyPrefix = '@bot',
  onLogin,
  onSignup,
  onLogout,
}: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  const AUTH_TOKEN_KEY = `${storageKeyPrefix}_auth_token`;
  const USER_DATA_KEY = `${storageKeyPrefix}_user_data`;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const [token, userData] = await Promise.all([
        AsyncStorage.getItem(AUTH_TOKEN_KEY),
        AsyncStorage.getItem(USER_DATA_KEY),
      ]);

      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      let token: string;
      let userData: AuthUser;

      if (onLogin) {
        // Use custom login handler
        const result = await onLogin(email, password);
        if (!result) return false;
        token = result.token;
        userData = result.user;
      } else {
        // Demo mode: Always succeeds
        token = `demo_token_${Date.now()}`;
        const demoEmail = email || 'demo@example.com';
        const demoName = demoEmail.split('@')[0] || 'Demo User';
        userData = { email: demoEmail, name: demoName };
      }

      await Promise.all([
        AsyncStorage.setItem(AUTH_TOKEN_KEY, token),
        AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData)),
      ]);

      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    try {
      let token: string;
      let userData: AuthUser;

      if (onSignup) {
        // Use custom signup handler
        const result = await onSignup(email, password, name);
        if (!result) return false;
        token = result.token;
        userData = result.user;
      } else {
        // Demo mode: Always succeeds
        token = `demo_token_${Date.now()}`;
        const demoEmail = email || 'demo@example.com';
        const demoName = name || 'Demo User';
        userData = { email: demoEmail, name: demoName };
      }

      await Promise.all([
        AsyncStorage.setItem(AUTH_TOKEN_KEY, token),
        AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData)),
      ]);

      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (onLogout) {
        await onLogout();
      }

      await Promise.all([
        AsyncStorage.removeItem(AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(USER_DATA_KEY),
      ]);

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (data: Partial<AuthUser>): Promise<void> => {
    try {
      if (!user) return;

      const updatedUser = { ...user, ...data };
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      login,
      signup,
      logout,
      updateUser,
    }),
    [isAuthenticated, isLoading, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth state and methods
 *
 * @throws Error if used outside of AuthProvider
 *
 * @example
 * ```tsx
 * function LoginScreen() {
 *   const { login, isLoading } = useAuth();
 *
 *   const handleLogin = async () => {
 *     const success = await login(email, password);
 *     if (success) {
 *       router.replace('/home');
 *     }
 *   };
 * }
 * ```
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
