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

/**
 * Stream policy anyone can post to channel
 * @deprecated Since Zulip 10.0 (feature level 333)
 * @see https://zulip.com/api/get-streams#response
 */
export const STREAM_POST_POLICY_ANYONE_CAN_POST = 1

/**
 * Stream policy only administrators can post to channel
 * @deprecated Since Zulip 10.0 (feature level 333)
 * @see https://zulip.com/api/get-streams#response
 */
export const STREAM_POST_POLICY_ADMIN_CAN_POST = 2

/**
 * Stream policy only full members can post to channel
 * @deprecated Since Zulip 10.0 (feature level 333)
 * @see https://zulip.com/api/get-streams#response
 */
export const STREAM_POST_POLICY_FULL_MEMBER_CAN_POST = 3

/**
 * Stream policy only moderators can post to channel
 * @deprecated Since Zulip 10.0 (feature level 333)
 * @see https://zulip.com/api/get-streams#response
 */
export const STREAM_POST_POLICY_MODERATOR_CAN_POST = 4

/**
 * Stream policy values
 * @deprecated Since Zulip 10.0 (feature level 333)
 * @see https://zulip.com/api/get-streams#response
 */
export type StreamPostPlicyValues = 1 | 2 | 3 | 4
