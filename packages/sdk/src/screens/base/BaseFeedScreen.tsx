import React, { useEffect, useState, ReactNode, ReactElement } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { useTheme } from '../../hooks/use-bot-theme';
import { useBotScreenConfig } from '../../provider/BotProvider';

/**
 * Post data structure
 */
export interface FeedPost {
  id: number | string;
  userId: number | string;
  title: string;
  body: string;
  type?: 'post' | 'poll';
  authorName?: string;
  timestamp?: string;
  imageUrl?: string;
}

/**
 * Poll option structure
 */
export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

/**
 * Poll post structure
 */
export interface FeedPollPost extends FeedPost {
  type: 'poll';
  question: string;
  options: PollOption[];
  totalVotes: number;
}

/**
 * Props for BaseFeedScreen
 */
export interface BaseFeedScreenProps {
  /** Custom title for the feed header */
  title?: string;
  /** Custom function to fetch posts */
  fetchPosts?: () => Promise<(FeedPost | FeedPollPost)[]>;
  /** Initial posts to display */
  initialPosts?: (FeedPost | FeedPollPost)[];
  /** Enable polls (default: true) */
  enablePolls?: boolean;
  /** Enable comments action (default: true) */
  enableComments?: boolean;
  /** Enable sharing action (default: true) */
  enableSharing?: boolean;
  /** Enable likes action (default: true) */
  enableLikes?: boolean;
  /** Called when a post is liked */
  onLike?: (post: FeedPost | FeedPollPost) => void;
  /** Called when comment is pressed */
  onComment?: (post: FeedPost | FeedPollPost) => void;
  /** Called when share is pressed */
  onShare?: (post: FeedPost | FeedPollPost) => void;
  /** Called when a poll vote is cast */
  onPollVote?: (pollId: number | string, optionId: string) => void;
  /** Custom header content */
  headerContent?: ReactNode;
  /** Custom empty state content */
  emptyContent?: ReactNode;
  /** Loading text */
  loadingText?: string;
  /** Hide the default header */
  hideHeader?: boolean;
  /** Custom post renderer */
  renderPost?: (post: FeedPost, defaultRenderer: () => ReactNode) => ReactNode;
  /** Custom poll renderer */
  renderPoll?: (poll: FeedPollPost, defaultRenderer: () => ReactNode) => ReactNode;
}

// Default demo posts with polls
const defaultPollPosts: FeedPollPost[] = [
  {
    id: 1001,
    userId: 1,
    title: 'Community Poll',
    body: "What's your favorite way to volunteer?",
    type: 'poll',
    question: "What's your favorite way to volunteer?",
    options: [
      { id: '1', text: 'Local community events', votes: 45 },
      { id: '2', text: 'Online mentoring', votes: 32 },
      { id: '3', text: 'Environmental cleanup', votes: 28 },
      { id: '4', text: 'Food bank assistance', votes: 19 },
    ],
    totalVotes: 124,
  },
  {
    id: 1002,
    userId: 2,
    title: 'Event Feedback',
    body: 'How would you rate our last community event?',
    type: 'poll',
    question: 'How would you rate our last community event?',
    options: [
      { id: '1', text: 'Excellent', votes: 67 },
      { id: '2', text: 'Good', votes: 43 },
      { id: '3', text: 'Average', votes: 12 },
      { id: '4', text: 'Needs improvement', votes: 5 },
    ],
    totalVotes: 127,
  },
];

// Default fetch function using JSONPlaceholder
const defaultFetchPosts = async (): Promise<(FeedPost | FeedPollPost)[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    const apiPosts = data.slice(0, 15).map((post: any) => ({
      ...post,
      type: 'post' as const,
    }));

    // Interleave poll posts with API posts
    const allPosts: (FeedPost | FeedPollPost)[] = [];
    let apiIndex = 0;
    let pollIndex = 0;

    for (let i = 0; i < apiPosts.length + defaultPollPosts.length; i++) {
      if (i === 2 || i === 7 || i === 12) {
        if (pollIndex < defaultPollPosts.length) {
          allPosts.push(defaultPollPosts[pollIndex]);
          pollIndex++;
        }
      }
      if (apiIndex < apiPosts.length) {
        allPosts.push(apiPosts[apiIndex]);
        apiIndex++;
      }
    }

    while (pollIndex < defaultPollPosts.length) {
      allPosts.push(defaultPollPosts[pollIndex]);
      pollIndex++;
    }

    return allPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return defaultPollPosts;
  }
};

/**
 * BaseFeedScreen - A customizable social feed screen
 *
 * Features:
 * - Posts and polls support
 * - Pull to refresh
 * - Like, comment, share actions
 * - Fully themeable
 *
 * @example
 * ```tsx
 * <BaseFeedScreen
 *   title="Community Feed"
 *   enablePolls={true}
 *   onLike={(post) => console.log('Liked', post.id)}
 * />
 * ```
 */
export function BaseFeedScreen({
  title = 'Feed',
  fetchPosts = defaultFetchPosts,
  initialPosts,
  enablePolls = true,
  enableComments = true,
  enableSharing = true,
  enableLikes = true,
  onLike,
  onComment,
  onShare,
  onPollVote,
  headerContent,
  emptyContent,
  loadingText = 'Loading feed...',
  hideHeader = false,
  renderPost: customRenderPost,
  renderPoll: customRenderPoll,
}: BaseFeedScreenProps) {
  const [posts, setPosts] = useState<(FeedPost | FeedPollPost)[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [pollVotes, setPollVotes] = useState<Record<string | number, string>>({});
  const { colors, brandColors, isDark } = useTheme();
  const screenConfig = useBotScreenConfig('feed');

  const showPolls = enablePolls && (screenConfig?.enablePolls !== false);
  const showComments = enableComments && (screenConfig?.enableComments !== false);
  const showSharing = enableSharing && (screenConfig?.enableSharing !== false);

  const loadPosts = async () => {
    try {
      let fetchedPosts = await fetchPosts();
      if (!showPolls) {
        fetchedPosts = fetchedPosts.filter((p) => p.type !== 'poll');
      }
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!initialPosts) {
      loadPosts();
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadPosts();
  };

  const handlePollVote = (pollId: number | string, optionId: string) => {
    if (pollVotes[pollId]) return;
    setPollVotes({ ...pollVotes, [pollId]: optionId });
    onPollVote?.(pollId, optionId);
  };

  const isPollPost = (item: FeedPost | FeedPollPost): item is FeedPollPost => {
    return item.type === 'poll';
  };

  const renderDefaultPoll = (item: FeedPollPost) => {
    const userVote = pollVotes[item.id];
    const hasVoted = !!userVote;
    const displayVotes = hasVoted ? item.totalVotes + 1 : item.totalVotes;

    return (
      <ThemedView
        style={[
          styles.postCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.postHeader}>
          <View style={[styles.avatar, { backgroundColor: brandColors.destructive }]}>
            <ThemedText style={[styles.avatarText, { color: colors.textInverse }]}>
              {String(item.userId).charAt(0)}
            </ThemedText>
          </View>
          <View style={styles.postHeaderInfo}>
            <ThemedText type="defaultSemiBold">
              {item.authorName || 'Community Admin'}
            </ThemedText>
            <ThemedText style={styles.postTime}>{item.timestamp || '1 day ago'}</ThemedText>
          </View>
        </View>
        <ThemedText type="subtitle" style={styles.postTitle}>
          {item.question}
        </ThemedText>
        <View style={styles.pollContainer}>
          {item.options.map((option) => {
            const isSelected = userVote === option.id;
            const voteCount = hasVoted && isSelected ? option.votes + 1 : option.votes;
            const percentage = displayVotes > 0 ? (voteCount / displayVotes) * 100 : 0;

            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.pollOption,
                  {
                    backgroundColor: isSelected
                      ? isDark ? '#3A3A5C' : '#E8F4FD'
                      : colors.surfaceSecondary,
                    borderColor: isSelected ? brandColors.primary : colors.border,
                  },
                ]}
                onPress={() => handlePollVote(item.id, option.id)}
                disabled={hasVoted}
              >
                <View style={styles.pollOptionContent}>
                  <ThemedText
                    style={[styles.pollOptionText, { fontWeight: isSelected ? '600' : '400' }]}
                  >
                    {option.text}
                  </ThemedText>
                  {hasVoted && (
                    <ThemedText style={styles.pollPercentage}>
                      {percentage.toFixed(1)}%
                    </ThemedText>
                  )}
                </View>
                {hasVoted && (
                  <View
                    style={[
                      styles.pollBar,
                      {
                        width: `${percentage}%`,
                        backgroundColor: isSelected ? brandColors.primary : colors.disabled,
                      },
                    ]}
                  />
                )}
                {isSelected && (
                  <View style={styles.selectedIndicator}>
                    <IconSymbol name="heart.fill" size={16} color={brandColors.primary} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <ThemedText style={styles.pollVoteCount}>
          {displayVotes} {displayVotes === 1 ? 'vote' : 'votes'}
        </ThemedText>
        {renderActions(item)}
      </ThemedView>
    );
  };

  const renderActions = (item: FeedPost | FeedPollPost) => (
    <View style={styles.postActions}>
      {enableLikes && (
        <TouchableOpacity style={styles.actionButton} onPress={() => onLike?.(item)}>
          <IconSymbol name="heart.fill" size={20} color={colors.iconSecondary} />
          <ThemedText style={styles.actionText}>Like</ThemedText>
        </TouchableOpacity>
      )}
      {showComments && (
        <TouchableOpacity style={styles.actionButton} onPress={() => onComment?.(item)}>
          <IconSymbol name="message.fill" size={20} color={colors.iconSecondary} />
          <ThemedText style={styles.actionText}>Comment</ThemedText>
        </TouchableOpacity>
      )}
      {showSharing && (
        <TouchableOpacity style={styles.actionButton} onPress={() => onShare?.(item)}>
          <IconSymbol name="paperplane.fill" size={20} color={colors.iconSecondary} />
          <ThemedText style={styles.actionText}>Share</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderDefaultPost = (item: FeedPost) => (
    <ThemedView
      style={[
        styles.postCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.postHeader}>
        <View style={[styles.avatar, { backgroundColor: brandColors.primary }]}>
          <ThemedText style={[styles.avatarText, { color: colors.textInverse }]}>
            {String(item.userId).charAt(0)}
          </ThemedText>
        </View>
        <View style={styles.postHeaderInfo}>
          <ThemedText type="defaultSemiBold">
            {item.authorName || `User ${item.userId}`}
          </ThemedText>
          <ThemedText style={styles.postTime}>{item.timestamp || '2 hours ago'}</ThemedText>
        </View>
      </View>
      <ThemedText type="subtitle" style={styles.postTitle}>
        {item.title}
      </ThemedText>
      <ThemedText style={styles.postBody}>{item.body}</ThemedText>
      {renderActions(item)}
    </ThemedView>
  );

  const renderItem = ({ item }: { item: FeedPost | FeedPollPost }): ReactElement | null => {
    if (isPollPost(item)) {
      const defaultRenderer = () => renderDefaultPoll(item);
      const result = customRenderPoll ? customRenderPoll(item, defaultRenderer) : defaultRenderer();
      return result as ReactElement | null;
    }

    const defaultRenderer = () => renderDefaultPost(item);
    const result = customRenderPost ? customRenderPost(item, defaultRenderer) : defaultRenderer();
    return result as ReactElement | null;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <ThemedText style={styles.loadingText}>{loadingText}</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {!hideHeader && (
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            {title}
          </ThemedText>
        </ThemedView>
      )}
      {headerContent}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          emptyContent ? (
            emptyContent as ReactElement
          ) : (
            <ThemedView style={styles.emptyContainer}>
              <ThemedText>No posts yet</ThemedText>
            </ThemedView>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  postCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postHeaderInfo: {
    flex: 1,
  },
  postTime: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  postTitle: {
    marginBottom: 8,
    fontSize: 18,
  },
  postBody: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    opacity: 0.8,
  },
  postActions: {
    flexDirection: 'row',
    gap: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    opacity: 0.7,
  },
  pollContainer: {
    marginTop: 12,
    marginBottom: 8,
    gap: 8,
  },
  pollOption: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  pollOptionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  pollOptionText: {
    fontSize: 15,
    flex: 1,
  },
  pollPercentage: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.7,
  },
  pollBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    opacity: 0.2,
    zIndex: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 3,
  },
  pollVoteCount: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
    marginBottom: 8,
  },
});

export default BaseFeedScreen;
