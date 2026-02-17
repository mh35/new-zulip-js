// Topic visibility policy values
/**
 * None. Removes the visibility policy previously set for the topic.
 * @see https://zulip.com/api/update-user-topic#parameter-visibility_policy
 */
export const VISIBILITY_NONE = 0
/**
 * Muted. Mutes the topic in a channel.
 * @see https://zulip.com/api/update-user-topic#parameter-visibility_policy
 */
export const VISIBILITY_MUTED = 1
/**
 * Unmuted. Unmutes the topic in a muted channel.
 * @see https://zulip.com/api/update-user-topic#parameter-visibility_policy
 */
export const VISIBILITY_UNNUTED = 2
/**
 * Followed. Follows the topic.
 * @see https://zulip.com/api/update-user-topic#parameter-visibility_policy
 */
export const VISIBILITY_FOLLOWED = 3

/**
 * Topic visibility type values
 * @see https://zulip.com/api/update-user-topic#parameter-visibility_policy
 */
export type TopicVisibilityValues = 0 | 1 | 2 | 3