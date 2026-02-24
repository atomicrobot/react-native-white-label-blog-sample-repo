import React, { useCallback, useEffect, useRef, useState, ReactNode } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { useTheme } from '../../hooks/use-bot-theme';
import { useBotUrls } from '../../provider';
import { useBotScreenConfig } from '../../provider/BotProvider';

/**
 * Props for BaseChatScreen
 */
export interface BaseChatScreenProps {
  /** Custom video source URL (defaults to SDK config) */
  videoSource?: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Enable voice input (default: true) */
  enableVoiceInput?: boolean;
  /** Called when a question is submitted */
  onSubmitQuestion?: (question: string, audioUri?: string) => void;
  /** Called when recording completes (native only) */
  onRecordingComplete?: (audioUri: string) => void;
  /** Custom header content to render above the video */
  headerContent?: ReactNode;
  /** Custom content to render below the input */
  footerContent?: ReactNode;
  /** Show native video controls (default: false) */
  showVideoControls?: boolean;
  /** Auto-play video on mount (default: true) */
  autoPlay?: boolean;
  /** Loop video (default: true) */
  loopVideo?: boolean;
}

/**
 * BaseChatScreen - A customizable video chat screen
 *
 * Features:
 * - Video playback with expo-video
 * - Voice input with expo-audio (native) or Web Speech API (web)
 * - Text input for questions
 * - Fully themeable
 *
 * @example
 * ```tsx
 * <BaseChatScreen
 *   placeholder="Ask anything..."
 *   onSubmitQuestion={(q) => sendToAPI(q)}
 *   enableVoiceInput={true}
 * />
 * ```
 */
export function BaseChatScreen({
  videoSource: customVideoSource,
  placeholder,
  enableVoiceInput = true,
  onSubmitQuestion,
  onRecordingComplete,
  headerContent,
  footerContent,
  showVideoControls = false,
  autoPlay = true,
  loopVideo = true,
}: BaseChatScreenProps) {
  const [question, setQuestion] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioRecorderRef = useRef<any>(null);

  const { colors, brandColors } = useTheme();
  const urls = useBotUrls();
  const screenConfig = useBotScreenConfig('chat');

  // Use custom video source or fall back to SDK config
  const videoSource = customVideoSource || urls.media.defaultVideoStream;
  const inputPlaceholder = placeholder || screenConfig?.placeholder || 'Ask a question about the video...';

  // Lazy load video and audio modules to handle optional dependencies
  const [VideoModule, setVideoModule] = useState<any>(null);
  const [AudioModule, setAudioModule] = useState<any>(null);

  useEffect(() => {
    // Dynamically import expo-video
    import('expo-video')
      .then((module) => setVideoModule(module))
      .catch(() => console.warn('expo-video not available'));

    // Dynamically import expo-audio for voice input
    if (enableVoiceInput && Platform.OS !== 'web') {
      import('expo-audio')
        .then((module) => setAudioModule(module))
        .catch(() => console.warn('expo-audio not available'));
    }
  }, [enableVoiceInput]);

  // Initialize Web Speech API on web
  useEffect(() => {
    if (!enableVoiceInput) return;

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptText = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcriptText + ' ';
            } else {
              interimTranscript += transcriptText;
            }
          }

          if (finalTranscript) {
            setQuestion((prev) => prev + finalTranscript);
            setTranscript('');
          } else {
            setTranscript(interimTranscript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [enableVoiceInput]);

  // Request audio permissions on native
  useEffect(() => {
    if (enableVoiceInput && AudioModule && Platform.OS !== 'web') {
      AudioModule.AudioModule?.requestRecordingPermissionsAsync?.().catch(console.error);
    }
  }, [enableVoiceInput, AudioModule]);

  const startRecording = async () => {
    if (!enableVoiceInput) return;

    try {
      if (Platform.OS === 'web' && recognitionRef.current) {
        recognitionRef.current.start();
        setIsRecording(true);
        setTranscript('');
      } else if (AudioModule) {
        await AudioModule.AudioModule?.setAudioModeAsync?.({
          allowsRecording: true,
          playsInSilentMode: true,
        });

        // Create recorder if needed
        if (!audioRecorderRef.current) {
          const { useAudioRecorder } = AudioModule;
          // Note: In a real implementation, you'd use the hook properly
          // For now, we'll show an alert
        }

        setIsRecording(true);
        setTranscript('Recording...');

        Alert.alert(
          'Recording',
          'Recording started. In a production app, this would transcribe your speech.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please check microphone permissions.');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      if (Platform.OS === 'web' && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecording(false);
        if (transcript) {
          setQuestion((prev) => prev + transcript);
          setTranscript('');
        }
      } else {
        setIsRecording(false);
        setTranscript('');

        Alert.alert(
          'Recording Complete',
          'Audio recorded. In production, this would be sent to a speech-to-text service.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
      setIsRecording(false);
    }
  };

  const handleMicPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSendQuestion = () => {
    if (question.trim()) {
      onSubmitQuestion?.(question.trim());
      setQuestion('');
      setTranscript('');
    }
  };

  // Render video player if expo-video is available
  const renderVideoPlayer = () => {
    if (!VideoModule || !videoSource) {
      return (
        <ThemedView style={styles.videoPlaceholder}>
          <ThemedText>Video not available</ThemedText>
        </ThemedView>
      );
    }

    const { VideoView, useVideoPlayer } = VideoModule;
    return <VideoPlayerComponent
      VideoView={VideoView}
      useVideoPlayer={useVideoPlayer}
      videoSource={videoSource}
      autoPlay={autoPlay}
      loopVideo={loopVideo}
      showControls={showVideoControls}
    />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ThemedView style={styles.content}>
          {headerContent}

          {/* Video Feed */}
          <ThemedView style={styles.videoContainer}>
            {renderVideoPlayer()}
          </ThemedView>

          {/* Question Input Area */}
          <ThemedView
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.surface,
                borderTopColor: colors.border,
              },
            ]}
          >
            <View style={styles.inputWrapper}>
              {enableVoiceInput && (
                <TouchableOpacity
                  style={[
                    styles.micButton,
                    {
                      backgroundColor: isRecording
                        ? brandColors.destructive
                        : colors.border,
                    },
                  ]}
                  onPress={handleMicPress}
                >
                  <IconSymbol
                    name="mic.fill"
                    size={20}
                    color={colors.textInverse}
                  />
                </TouchableOpacity>
              )}
              <View style={styles.textInputContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                      backgroundColor: colors.inputBackground,
                    },
                  ]}
                  placeholder={inputPlaceholder}
                  placeholderTextColor={colors.placeholder}
                  value={question + (transcript ? ' ' + transcript : '')}
                  onChangeText={setQuestion}
                  multiline
                  maxLength={500}
                />
                {isRecording && (
                  <View style={[styles.recordingBadge, { backgroundColor: brandColors.destructive }]}>
                    <ThemedText style={[styles.recordingText, { color: colors.textInverse }]}>
                      {Platform.OS === 'web' ? 'Listening...' : 'Recording...'}
                    </ThemedText>
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                    backgroundColor: question.trim() ? brandColors.primary : colors.disabled,
                  },
                ]}
                onPress={handleSendQuestion}
                disabled={!question.trim() || isRecording}
              >
                <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </ThemedView>

          {footerContent}
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Separate component for video player to properly use hooks
function VideoPlayerComponent({
  VideoView,
  useVideoPlayer,
  videoSource,
  autoPlay,
  loopVideo,
  showControls,
}: {
  VideoView: any;
  useVideoPlayer: any;
  videoSource: string;
  autoPlay: boolean;
  loopVideo: boolean;
  showControls: boolean;
}) {
  const player = useVideoPlayer(videoSource, (p: any) => {
    p.loop = loopVideo;
    if (autoPlay) {
      p.play();
    }
  });

  useFocusEffect(
    useCallback(() => {
      if (player && autoPlay) {
        player.play();
      }
      return () => {
        if (player) {
          player.pause();
        }
      };
    }, [player, autoPlay])
  );

  return (
    <VideoView
      player={player}
      style={styles.video}
      contentFit="contain"
      nativeControls={showControls}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  video: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    position: 'relative',
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  recordingBadge: {
    position: 'absolute',
    top: -20,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recordingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BaseChatScreen;
