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

// Stream policy values
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

// Bot type constants
/**
 * Not bot user
 * @see https://zulip.com/api/get-user#response
 */
export const BOT_TYPE_NOT_BOT = null

/**
 * Generic bot user
 * @see https://zulip.com/api/get-user#response
 */
export const BOT_TYPE_GENERIC = 1

/**
 * Incoming webhook bot user
 * @see https://zulip.com/api/get-user#response
 */
export const BOT_TYPE_INCOMING_WEBHOOK = 2

/**
 * Outgoing webhook bot user
 * @see https://zulip.com/api/get-user#response
 */
export const BOT_TYPE_OUTGOING_WEBHOOK = 3

/**
 * Embedded bot user
 * @see https://zulip.com/api/get-user#response
 */
export const BOT_TYPE_EMBEDDED = 4

/**
 * Bot type values
 * @see https://zulip.com/api/get-user#response
 */
export type BotTypeValues = null | 1 | 2 | 3 | 4

// role constants
/**
 * Organization owner
 * @since Zulip 4.0 (feature level 59)
 * @see https://zulip.com/api/get-user#response
 */
export const USER_ROLE_OWNER = 100

/**
 * Organization administrator
 * @since Zulip 4.0 (feature level 59)
 * @see https://zulip.com/api/get-user#response
 */
export const USER_ROLE_ADMINISTRATOR = 200

/**
 * Organization moderator
 * @since Zulip 4.0 (feature level 59)
 * @see https://zulip.com/api/get-user#response
 */
export const USER_ROLE_MODERATOR = 300

/**
 * Member
 * @since Zulip 4.0 (feature level 59)
 * @see https://zulip.com/api/get-user#response
 */
export const USER_ROLE_MEMBER = 400

/**
 * Guest
 * @since Zulip 4.0 (feature level 59)
 * @see https://zulip.com/api/get-user#response
 */
export const USER_ROLE_GUEST = 600

/**
 * User role values
 * @since Zulip 4.0 (feature level 59)
 * @see https://zulip.com/api/get-user#response
 */
export type UserRoleValues = 100 | 200 | 300 | 400 | 600
