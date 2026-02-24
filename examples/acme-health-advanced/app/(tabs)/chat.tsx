/**
 * Chat Screen - Using Base Screen with Full Customization
 *
 * This demonstrates the "Base Screen" pattern from the blog series:
 * - Custom header content
 * - Custom footer content
 * - Custom submit handler
 * - Full control while maintaining theme consistency
 */
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { BaseChatScreen } from 'bot-sdk/screens';
import { HealthHeader } from '../../components/HealthHeader';
import { HealthDisclaimer } from '../../components/HealthDisclaimer';

export default function ChatScreen() {
  const [conversationCount, setConversationCount] = useState(0);

  const handleSubmitQuestion = async (question: string) => {
    setConversationCount((prev) => prev + 1);

    // In production, send to your AI/LLM backend
    console.log('Question submitted:', question);

    // Simulate response
    Alert.alert(
      'Question Received',
      `Your question "${question.substring(0, 50)}${question.length > 50 ? '...' : ''}" has been sent to our health AI assistant.\n\nIn production, this would connect to your backend API.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <BaseChatScreen
      // Custom handlers
      onSubmitQuestion={handleSubmitQuestion}
      // Custom content injection via render slots
      headerContent={
        <HealthHeader
          subtitle={
            conversationCount > 0
              ? `${conversationCount} question${conversationCount > 1 ? 's' : ''} asked`
              : 'Ask your health questions'
          }
        />
      }
      footerContent={<HealthDisclaimer />}
      // Override defaults from config
      placeholder="Type your health question..."
      enableVoiceInput={true}
      autoPlay={true}
      loopVideo={true}
    />
  );
}
