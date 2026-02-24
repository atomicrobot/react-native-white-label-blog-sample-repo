/**
 * Chat Screen - Preset Mode
 *
 * Uses the SDK's ChatScreen preset with zero configuration.
 * All settings come from config/bot.config.ts.
 *
 * For full control, use BaseChatScreen instead:
 *
 * import { BaseChatScreen } from 'bot-sdk/screens';
 *
 * export default function CustomChatScreen() {
 *   return (
 *     <BaseChatScreen
 *       onSubmitQuestion={(question) => console.log('Asked:', question)}
 *       headerContent={<CustomHeader />}
 *       placeholder="Custom placeholder..."
 *     />
 *   );
 * }
 */
export { ChatScreen as default } from 'bot-sdk/screens';
