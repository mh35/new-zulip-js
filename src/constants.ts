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

/**
 * Always mark messages as read when the user scrolls through their feed
 * @since Zulip 7.0 (feature level 175)
 * @see https://zulip.com/api/update-settings#parameter-web_mark_read_on_scroll_policy
 */
export const USER_SETTINGS_WEB_MARK_READ_SCROLL_POLICY_ALWAYS = 1

/**
 * Mark messages as read when the user scrolls through their feed only if
 * the view is conversation view
 * @since Zulip 7.0 (feature level 175)
 * @see https://zulip.com/api/update-settings#parameter-web_mark_read_on_scroll_policy
 */
export const USER_SETTINGS_WEB_MARK_READ_SCROLL_POLICY_CONVERSATION_VIEW = 2

/**
 * Don't mark messages as read when the user scrolls through their feed
 * @since Zulip 7.0 (feature level 175)
 * @see https://zulip.com/api/update-settings#parameter-web_mark_read_on_scroll_policy
 */
export const USER_SETTINGS_WEB_MARK_READ_SCROLL_POLICY_NONE = 3

/**
 * The values of policy to mark messages as read when the user scrolls through
 * their feed
 * @since Zulip 7.0 (feature level 175)
 * @see https://zulip.com/api/update-settings#parameter-web_mark_read_on_scroll_policy
 */
export type UserSettingsWebMarkReadScrollPolicyValues = 1 | 2 | 3

/**
 * Top topic in the channel as default view on clicking on a channel link
 * @since Zulip 9.0 (feature level 269)
 * @see https://zulip.com/api/update-settings#parameter-web_channel_default_view
 */
export const USER_SETTINGS_WEB_CHANNEL_DEFAULT_VIEW_TOP_TOPIC = 1

/**
 * Channel feed as default view on clicking on a channel link
 * @since Zulip 9.0 (feature level 269)
 * @see https://zulip.com/api/update-settings#parameter-web_channel_default_view
 */
export const USER_SETTINGS_WEB_CHANNEL_DEFAULT_VIEW_FEED = 2

/**
 * List of topics as default view on clicking on a channel link
 * @since Zulip 11.0 (feature level 383)
 * @see https://zulip.com/api/update-settings#parameter-web_channel_default_view
 */
export const USER_SETTINGS_WEB_CHANNEL_DEFAULT_VIEW_LIST_TOPICS = 3

/**
 * Top unread topic in channel as default view on clicking on a channel link
 * @since Zulip 11.0 (feature level 401)
 * @see https://zulip.com/api/update-settings#parameter-web_channel_default_view
 */
export const USER_SETTINGS_WEB_CHANNEL_DEFAULT_VIEW_UNREAD = 4

/**
 * The values of the default view on the web
 * @since Zulip 9.0 (feature level 269)
 * @see https://zulip.com/api/update-settings#parameter-web_channel_default_view
 */
export type UserSettingsWebChannelDefaultViewValues = 1 | 2 | 3 | 4

/**
 * Auto color scheme
 * @see https://zulip.com/api/update-settings#parameter-color_scheme
 */
export const USER_SETTINGS_COLOR_SCHEME_AUTO = 1

/**
 * Dark color scheme
 * @see https://zulip.com/api/update-settings#parameter-color_scheme
 */
export const USER_SETTINGS_COLOR_SCHEME_DARK = 2

/**
 * Light color scheme
 * @see https://zulip.com/api/update-settings#parameter-color_scheme
 */
export const USER_SETTINGS_COLOR_SCHEME_LIGHT = 3

/**
 * The values of the color scheme
 * @see https://zulip.com/api/update-settings#parameter-color_scheme
 */
export type UserSettingsColorSchemeValues = 1 | 2 | 3

/**
 * Hide inactive streams automatic
 * @see https://zulip.com/api/update-settings#parameter-demote_inactive_streams
 */
export const USER_SETTINGS_DEMOTE_INACTIVE_STREAMS_AUTO = 1

/**
 * Always hide inactive streams
 * @see https://zulip.com/api/update-settings#parameter-demote_inactive_streams
 */
export const USER_SETTINGS_DEMOTE_INACTIVE_STREAMS_ALWAYS = 2

/**
 * Never hide inactive streams
 * @see https://zulip.com/api/update-settings#parameter-demote_inactive_streams
 */
export const USER_SETTINGS_DEMOTE_INACTIVE_STREAMS_NEVER = 3

/**
 * The values of hiding inactive streams settings
 * @see https://zulip.com/api/update-settings#parameter-demote_inactive_streams
 */
export type UserSettingsDemoteInactiveStreamsValues = 1 | 2 | 3

/**
 * Compact style user for the right sidebar user list
 * @since Zulip 6.0 (feature level 141)
 * @see https://zulip.com/api/update-settings#parameter-user_list_style
 */
export const USER_SETTINGS_USER_LIST_STYLE_COMPACT = 1

/**
 * With status style user for the right sidebar user list
 * @since Zulip 6.0 (feature level 141)
 * @see https://zulip.com/api/update-settings#parameter-user_list_style
 */
export const USER_SETTINGS_USER_LIST_STYLE_STATUS = 2

/**
 * With avatar and status style user for the right sidebar user list
 * @since Zulip 6.0 (feature level 141)
 * @see https://zulip.com/api/update-settings#parameter-user_list_style
 */
export const USER_SETTINGS_USER_LIST_STYLE_AVATAR_STATUS = 3

/**
 * The user list style values for the right sidebar values
 * @since Zulip 6.0 (feature level 141)
 * @see https://zulip.com/api/update-settings#parameter-user_list_style
 */
export type UserSettingsUserListStyleValues = 1 | 2 | 3

/**
 * Show unread count on all channels in the left sidebar
 * @since Zulip 8.0 (feature level 210)
 * @see https://zulip.com/api/update-settings#parameter-web_stream_unreads_count_display_policy
 */
export const USER_SETTINGS_WEB_STREAM_UNREADS_COUNT_DISPLAY_POLICY_ALL_CHANNELS = 1

/**
 * Show unread count on unmuted channels and topics in the left sidebar
 * @since Zulip 8.0 (feature level 210)
 * @see https://zulip.com/api/update-settings#parameter-web_stream_unreads_count_display_policy
 */
export const USER_SETTINGS_WEB_STREAM_UNREADS_COUNT_DISPLAY_POLICY_UNMUTED_CHANNELS_AND_TOPICS = 2

/**
 * Do not show unread count on channels in the left sidebar
 * @since Zulip 8.0 (feature level 210)
 * @see https://zulip.com/api/update-settings#parameter-web_stream_unreads_count_display_policy
 */
export const USER_SETTINGS_WEB_STREAM_UNREADS_COUNT_DISPLAY_POLICY_NONE = 3

/**
 * The values of unread count display policy for channels in the left sidebar
 * @since Zulip 8.0 (feature level 210)
 * @see https://zulip.com/api/update-settings#parameter-web_stream_unreads_count_display_policy
 */
export type UserSettingsWebStreamUnreadsCountDisplayPolicyValues = 1 | 2 | 3

/**
 * Display all unread messages in desktop icon badge count
 * @see https://zulip.com/api/update-settings#parameter-desktop_icon_count_display
 */
export const USER_SETTINGS_DESKTOP_ICON_COUNT_DISPLAY_ALL_UNREAD_MESSAGES = 1

/**
 * Display direct messages, mentions, and followed topics in desktop icon badge count
 * @since Zulip 8.0 (feature level 227)
 * @see https://zulip.com/api/update-settings#parameter-desktop_icon_count_display
 */
export const USER_SETTINGS_DESKTOP_ICON_COUNT_DISPLAY_DMS_MENTIONS_AND_FOLLOWED_TOPICS = 2

/**
 * Display direct messages and mentions in desktop icon badge count
 * @see https://zulip.com/api/update-settings#parameter-desktop_icon_count_display
 */
export const USER_SETTINGS_DESKTOP_ICON_COUNT_DISPLAY_DMS_AND_MENTIONS = 3

/**
 * Do not display desktop icon badge count
 * @see https://zulip.com/api/update-settings#parameter-desktop_icon_count_display
 */
export const USER_SETTINGS_DESKTOP_ICON_COUNT_DISPLAY_NONE = 4

/**
 * The values of desktop icon count display policy
 * @see https://zulip.com/api/update-settings#parameter-desktop_icon_count_display
 */
export type UserSettingsDesktopIconCountDisplayValues = 1 | 2 | 3 | 4

/**
 * Automatically include organization name in notification email subject
 * @since Zulip 7.0 (feature level 168)
 * @see https://zulip.com/api/update-settings#parameter-realm_name_in_email_notifications_policy
 */
export const USER_SETTINGS_REALM_NAME_IN_EMAIL_NOTIFICATIONS_POLICY_AUTO = 1

/**
 * Always include organization name in notification email subject
 * @since Zulip 7.0 (feature level 168)
 * @see https://zulip.com/api/update-settings#parameter-realm_name_in_email_notifications_policy
 */
export const USER_SETTINGS_REALM_NAME_IN_EMAIL_NOTIFICATIONS_POLICY_ALWAYS = 2

/**
 * Never include organization name in notification email subject
 * @since Zulip 7.0 (feature level 168)
 * @see https://zulip.com/api/update-settings#parameter-realm_name_in_email_notifications_policy
 */
export const USER_SETTINGS_REALM_NAME_IN_EMAIL_NOTIFICATIONS_POLICY_NEVER = 3

/**
 * The values of including organization name in notification email subject policy
 * @since Zulip 7.0 (feature level 168)
 * @see https://zulip.com/api/update-settings#parameter-realm_name_in_email_notifications_policy
 */
export type UserSettingsRealmNameInEmailNotificationsPolicyValues = 1 | 2 | 3

/**
 * Automatically follow topics the user participates in
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_follow_topics_policy
 */
export const USER_SETTINGS_AUTOMATICALLY_FOLLOW_TOPICS_POLICY_PARTICIPATED = 1

/**
 * Automatically follow topics the user sends a message to
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_follow_topics_policy
 */
export const USER_SETTINGS_AUTOMATICALLY_FOLLOW_TOPICS_POLICY_SEND_MESSAGE = 2

/**
 * Automatically follow topics the user starts
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_follow_topics_policy
 */
export const USER_SETTINGS_AUTOMATICALLY_FOLLOW_TOPICS_POLICY_STARTS = 3

/**
 * Never automatically follow topics
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_follow_topics_policy
 */
export const USER_SETTINGS_AUTOMATICALLY_FOLLOW_TOPICS_POLICY_NEVER = 4

/**
 * The values of automatically following topics policy
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_follow_topics_policy
 */
export type UserSettingsAutomaticallyFollowTopicsPolicyValues = 1 | 2 | 3 | 4

/**
 * Automatically unmute topics in muted channels the user participates in
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_unmute_topics_in_muted_streams_policy
 */
export const USER_SETTINGS_AUTOMATICALLY_UNMUTE_TOPICS_IN_MUTED_CHANNELS_POLICY_PARTICIPATED = 1

/**
 * Automatically unmute topics in muted channels the user sends a message to
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_unmute_topics_in_muted_streams_policy
 */
export const USER_SETTINGS_AUTOMATICALLY_UNMUTE_TOPICS_IN_MUTED_CHANNELS_POLICY_SEND_MESSAGE = 2

/**
 * Automatically unmute topics in muted channels the user starts
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_unmute_topics_in_muted_streams_policy
 */
export const USER_SETTINGS_AUTOMATICALLY_UNMUTE_TOPICS_IN_MUTED_CHANNELS_POLICY_STARTS = 3

/**
 * Never automatically unmute topics in muted channels
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_unmute_topics_in_muted_streams_policy
 */
export const USER_SETTINGS_AUTOMATICALLY_UNMUTE_TOPICS_IN_MUTED_CHANNELS_POLICY_NEVER = 4

/**
 * The values of automatically unmuting topics in muted channels policy
 * @since Zulip 8.0 (feature level 214)
 * @see https://zulip.com/api/update-settings#parameter-automatically_unmute_topics_in_muted_streams_policy
 */
export type UserSettingsAutomaticallyUnmuteTopicsInMutedChannelsPolicyValues =
  | 1
  | 2
  | 3
  | 4

/**
 * Everyone in organization can see the user's real email address
 * @since Zulip 7.0 (feature level 163)
 * @see https://zulip.com/api/update-settings#parameter-email_address_visibility
 */
export const USER_SETTINGS_EMAIL_ADDRESS_VISIBILITY_EVERYONE = 1

/**
 * Members only can see the user's real email address
 * @since Zulip 7.0 (feature level 163)
 * @see https://zulip.com/api/update-settings#parameter-email_address_visibility
 */
export const USER_SETTINGS_EMAIL_ADDRESS_VISIBILITY_MEMBERS_ONLY = 2

/**
 * Administrators only can see the user's real email address
 * @since Zulip 7.0 (feature level 163)
 * @see https://zulip.com/api/update-settings#parameter-email_address_visibility
 */
export const USER_SETTINGS_EMAIL_ADDRESS_VISIBILITY_ADMINISTRATORS_ONLY = 3

/**
 * Nobody can see the user's real email address
 * @since Zulip 7.0 (feature level 163)
 * @see https://zulip.com/api/update-settings#parameter-email_address_visibility
 */
export const USER_SETTINGS_EMAIL_ADDRESS_VISIBILITY_NOBODY = 4

/**
 * Moderators only can see the user's real email address
 * @since Zulip 7.0 (feature level 163)
 * @see https://zulip.com/api/update-settings#parameter-email_address_visibility
 */
export const USER_SETTINGS_EMAIL_ADDRESS_VISIBILITY_MODERATORS_ONLY = 5

/**
 * The values of email address visibility policy
 * @since Zulip 7.0 (feature level 163)
 * @see https://zulip.com/api/update-settings#parameter-email_address_visibility
 */
export type UserSettingsEmailAddressVisibilityValues = 1 | 2 | 3 | 4 | 5
