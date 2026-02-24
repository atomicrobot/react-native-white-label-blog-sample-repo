import { useEffect, useState, ReactNode } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';

export interface BaseWebViewScreenProps {
  /** URL to load in the WebView */
  url: string;
  /** Optional header component */
  renderHeader?: () => ReactNode;
  /** Content to show while loading */
  renderLoading?: () => ReactNode;
  /** Content to show on error */
  renderError?: (error: string) => ReactNode;
  /** Safe area edges to respect */
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  /** Enable JavaScript (default: true) */
  javaScriptEnabled?: boolean;
  /** Enable DOM storage (default: true) */
  domStorageEnabled?: boolean;
}

/**
 * Base WebView screen with loading states and customization slots.
 *
 * @example
 * ```tsx
 * // Simple usage
 * <BaseWebViewScreen url="https://example.com/donate" />
 *
 * // With custom header
 * <BaseWebViewScreen
 *   url={urls.webView.donations}
 *   renderHeader={() => (
 *     <View style={styles.header}>
 *       <ThemedText type="title">Donate</ThemedText>
 *     </View>
 *   )}
 * />
 * ```
 */
export function BaseWebViewScreen({
  url,
  renderHeader,
  renderLoading,
  renderError,
  edges = ['top'],
  javaScriptEnabled = true,
  domStorageEnabled = true,
}: BaseWebViewScreenProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [WebViewModule, setWebViewModule] = useState<any>(null);

  useEffect(() => {
    import('react-native-webview')
      .then((module) => setWebViewModule(module))
      .catch(() => console.warn('react-native-webview not available'));
  }, []);

  if (!url) {
    return (
      <SafeAreaView style={styles.container} edges={edges}>
        <ThemedView style={styles.errorContainer}>
          <ThemedText>No URL configured</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  const WebView = WebViewModule?.WebView;

  if (!WebView) {
    return (
      <SafeAreaView style={styles.container} edges={edges}>
        {renderHeader?.()}
        <ThemedView style={styles.errorContainer}>
          <ActivityIndicator size="large" />
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      {renderHeader?.()}
      <ThemedView style={styles.container}>
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          onLoadStart={() => {
            setLoading(true);
            setError(null);
          }}
          onLoadEnd={() => setLoading(false)}
          onError={(syntheticEvent: any) => {
            const { nativeEvent } = syntheticEvent;
            setError(nativeEvent.description || 'Failed to load page');
            setLoading(false);
          }}
          javaScriptEnabled={javaScriptEnabled}
          domStorageEnabled={domStorageEnabled}
          startInLoadingState={true}
        />
        {loading && (
          <ThemedView style={styles.loadingContainer}>
            {renderLoading ? (
              renderLoading()
            ) : (
              <ActivityIndicator size="large" />
            )}
          </ThemedView>
        )}
        {error && !loading && (
          <ThemedView style={styles.errorContainer}>
            {renderError ? (
              renderError(error)
            ) : (
              <ThemedText>Error: {error}</ThemedText>
            )}
          </ThemedView>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
