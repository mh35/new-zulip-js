import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'
import type { GetChannelsChannel } from './channel/channel'
import type { GetChannelFoldersResponseItem } from './channel/folder'
import type { GetSubscriptionsResponseItem } from './channel/subscription'
import type {
  BotServiceOutgoingWebhookFormats,
  CreateStreamPolicyValues,
  CreateWebPublicStreamPolicyValues,
  MediaPreviewSizeSettingValues,
  RealmDigestWeekdayValues,
  RealmPlanTypeValues,
  RealmTypeValues,
  StreamPostPlicyValues,
  TopicVisibilityValues,
  UserSettingsAutomaticallyFollowTopicsPolicyValues,
  UserSettingsAutomaticallyUnmuteTopicsInMutedChannelsPolicyValues,
  UserSettingsColorSchemeValues,
  UserSettingsDemoteInactiveStreamsValues,
  UserSettingsDesktopIconCountDisplayValues,
  UserSettingsEmailAddressVisibilityValues,
  UserSettingsRealmNameInEmailNotificationsPolicyValues,
  UserSettingsUserListStyleValues,
  UserSettingsWebChannelDefaultViewValues,
  UserSettingsWebMarkReadScrollPolicyValues,
  UserSettingsWebStreamUnreadsCountDisplayPolicyValues,
  VideoChatProviderValues,
  WildcardMentionPolicyValues,
} from './constants'
import type { GetCustomProfileFieldsItem } from './custom-profile-field'
import type { GetDraftsResponseItem } from './draft'
import type { GetEmojisResponseItem } from './emoji'
import type { GetLinkifiersItem } from './linkifier'
import type { GetNavigationViewsResponseItem } from './navigation-view'
import type { GetRemindersResponseItem } from './reminder'
import type { GetScheduleMessagesResponseItem } from './scheduled-message'
import type { GetSnippetsResponseItem } from './snippet'
import type { GetUserGroupsResponseGroup } from './user/group'
import type {
  GetUserStatusResponseStatus,
  GetAllUserPresenceUserItem,
  UpdatePresenceResponseModernUserItem,
} from './user/status'
import { ChannelPermissionGroupObj } from './channel/common'
import {
  GetUserByIdResponseUser,
  UpdateUserSettingsParamsEmojiSetValues,
  UpdateUserSettingsParamsResolvedTopicNoticeAutoReadPolicyValues,
  UpdateUserSettingsParamsWebAnimateImagePreviewsValues,
  UpdateUserSettingsParamsWebHomeViewValues,
} from './user/user'

/**
 * Zulip event types
 * @see https://zulip.com/api/get-events#events-by-type
 */
export type ZulipEventTypes =
  | 'alert_words'
  | 'attachment'
  | 'channel_folder'
  | 'channel_folders'
  | 'custom_profile_fields'
  | 'default_stream_groups'
  | 'default_streams'
  | 'delete_message'
  | 'device'
  | 'drafts'
  | 'giphy'
  | 'has_zoom_token'
  | 'heartbeat'
  | 'invites_changed'
  | 'message'
  | 'muted_topics'
  | 'muted_users'
  | 'navigation_view'
  | 'navigation_views'
  | 'onboarding_steps'
  | 'presence'
  | 'reaction'
  | 'realm'
  | 'realm_billing'
  | 'realm_bot'
  | 'realm_domains'
  | 'realm_embedded_bots'
  | 'realm_emoji'
  | 'realm_export'
  | 'realm_export_consent'
  | 'realm_filters'
  | 'realm_incoming_webhook_bots'
  | 'realm_linkifiers'
  | 'realm_playgrounds'
  | 'realm_user'
  | 'realm_user_settings_defaults'
  | 'recent_private_conversations'
  | 'reminders'
  | 'restart'
  | 'saved_snippets'
  | 'scheduled_messages'
  | 'starred_messages'
  | 'stop_words'
  | 'stream'
  | 'submessage'
  | 'subscription'
  | 'tenor'
  | 'typing'
  | 'typing_edit_message'
  | 'update_message'
  | 'update_message_flags'
  | 'user_group'
  | 'user_settings'
  | 'user_status'
  | 'user_topic'
  | 'video_calls'
  | 'web_reload_client'

/**
 * Client capabilities in the parameters of RegisterEventQueue API
 */
export type RegisterEventQueueClientCapabilities = {
  /**
   * Whether the client can handle the current API with null values for channel-level
   * notification settings
   * @since Zulip 2.1.0
   */
  notification_settings_null?: boolean
  /**
   * Whether the client's handler for the delete_message event type has been updated
   * to process the new bulk format
   * @since Zulip 3.0 (feature level 13)
   */
  bulk_message_deletion?: boolean
  /**
   * Whether the client required avatar URLs for all users, or supports using
   * GET /avatar/{user_id} to access user avatars
   * @since Zulip 3.0 (feature level 18)
   */
  user_avatar_url_field_optional?: boolean
  /**
   * Whether the client supports channel typing notifications
   * @since Zulip 4.0 (feature level 58)
   */
  stream_typing_notifications?: boolean
  /**
   * Has no effect with modern servers.
   * Whether the client supported the modern user_settings event type and the
   * top-level user_settings object in this endpoint's response
   * @since Zulip 5.0 (feature level 89)
   */
  user_settings_object?: boolean
  /**
   * Whether the client accepts linkifiers that use RFC 6570 compliant URL
   * templates for linkifying matches
   * @since Zulip 7.0 (feature level 176)
   */
  linkifier_url_template?: boolean
  /**
   * Whether the client supports not having an incomplete user database
   * @since Zulip 8.0 (feature level 232)
   */
  user_list_incomplete?: boolean
  /**
   * Whether the client can handle deactivated user groups by themselves
   * @since Zulip 10.0 (feature level 294)
   */
  include_deactivated_groups?: boolean
  /**
   * Whether the client supports processing archived channels in the stream and
   * subscription event types
   * @since Zulip 10.0 (feature level 315)
   */
  archived_channels?: boolean
  /**
   * Whether the client supports processing the empty string as a topic name
   * @since Zulip 10.0 (feature level 334)
   */
  empty_topic_name?: boolean
  /**
   * Whether the client supports receiving the presence event type with user presence
   * data in the modern format
   * @since Zulip 11.0 (feature level 419)
   */
  simplified_presence_events?: boolean
}

/**
 * Parameters for RegisterEventQueue API
 * @see https://zulip.com/api/register-queue#parameters
 */
export type RegisterEventQueueParams = {
  /**
   * Wyou would like the content to be rendered in HTML format. Default is false
   * @see https://zulip.com/api/register-queue#parameter-apply_markdown
   */
  apply_markdown?: boolean
  /**
   * Whether the client supports computing gravatars URLs
   * @see https://zulip.com/api/register-queue#parameter-client_gravatar
   */
  client_gravatar?: boolean
  /**
   * Whether each returned channel object should include a subscribers field.
   * Default is false
   * @see https://zulip.com/api/register-queue#parameter-include_subscribers
   */
  include_subscribers?: 'true' | 'false' | 'partial' | boolean
  /**
   * Whether the presences object returned in the response will be keyed by
   * user ID and the entry for each user's presence data will be in the modern format.
   * Default is false
   * @since Zulip 3.0
   * @see https://zulip.com/api/register-queue#parameter-slim_presence
   */
  slim_presence?: boolean
  /**
   * Limits how far back in time to fetch user presence data in days.
   * Default is 14
   * @since Zulip 10.0 (feature level 288)
   * @see https://zulip.com/api/register-queue#parameter-presence_history_limit_days
   */
  presence_history_limit_days?: number
  /**
   * Which types of events you're interested in. Default is all types
   * @see https://zulip.com/api/register-queue#parameter-event_types
   */
  event_types?: ZulipEventTypes[]
  /**
   * Whether you would like to request message events from all public channels.
   * Default is false
   * @see https://zulip.com/api/register-queue#parameter-all_public_streams
   */
  all_public_streams?: boolean
  /**
   * Features the client supports
   * @see https://zulip.com/api/register-queue#parameter-client_capabilities
   */
  client_capabilities?: RegisterEventQueueClientCapabilities
  /**
   * Same as the event_types parameter except that the values in
   * fetch_event_types are used to fetch initial data
   * @see https://zulip.com/api/register-queue#parameter-fetch_event_types
   */
  fetch_event_types?: ZulipEventTypes[]
  /**
   * Array of arrays of length 2 indicating the narrow filter(s) for which you'd
   * like to receive events for. Default is empty array.
   * @see https://zulip.com/api/register-queue#parameter-narrow
   */
  narrow?: [string, string][]
}

/**
 * Custom field type keys
 */
export type EventCustomFieldTypeKeys =
  | 'SHORT_TEXT'
  | 'LONG_TEXT'
  | 'DATE'
  | 'SELECT'
  | 'URL'
  | 'EXTERNAL_ACCOUNT'
  | 'USER'
  | 'PRONOUNS'

/**
 * Custom field type information item
 */
export type EventCustomFieldTypeItem = {
  /**
   * The ID of the custom profile field type
   */
  id: number
  /**
   * The name of the custom profile field type
   */
  name: string
}

/**
 * A single onboarding step that should be shown to the user
 */
export type EventOnboardingStepItem = {
  /**
   * The type of the onboarding step. Currently, only one_time_notice is the valid value
   * @since Zulip 8.0 (feature level 233)
   */
  type: 'one_time_notice'
  /**
   * The name of the onboarding step
   */
  name: string
}

/**
 * Muted user information
 * @since Zulip 4.0 (feature level 48)
 */
export type EventMutedUserItem = {
  /**
   * The ID of the muted user
   */
  id: number
  /**
   * UNIX timestamp representing when the user was muted
   */
  timestamp: number
}

/**
 * Realm domain information
 */
export type EventRealmDomainItem = {
  /**
   * The new allowed domain
   */
  domain: string
  /**
   * Whether subdomains are allowed for this domain
   */
  allow_subdomains: true
}

/**
 * Realm playground information
 * @since Zulip 4.0 (feature level 49)
 */
export type EventPlaygroundItem = {
  /**
   * ID for the realm playground
   */
  id: number
  /**
   * The user-visible display name of the playground
   */
  name: string
  /**
   * The name of the Pygments language lexer
   */
  pygments_language: string
  /**
   * URL template for the playground
   * @since Zulip 8.0 (feature level 196)
   */
  url_template: string
}

/**
 * Bot service for outgoing webhook
 */
export type EventBotOutgoingWebhookService = {
  /**
   * The URL the outgoing webhook is configured to post to
   */
  base_url: string
  /**
   * Token that the third-party service can use to confirm that the
   * request is indeed coming from Zulip
   */
  token: string
  /**
   * What format requests are posted in
   *
   * - 1: Zulip's native outgoing webhook format
   * - 2: Emulate the Slack outgoing webhook format
   */
  interface: BotServiceOutgoingWebhookFormats
}

/**
 * Bot service for embedded service
 */
export type EventRealmBotEmbeddedService = {
  /**
   * The name of the bot
   */
  service_name: string
  /**
   * A dictionary of string key/value pairs, which describe the configuration
   * for the bot
   */
  config_data: Record<string, string>
}

export type EventRealmBotItem = {
  /**
   * The user ID of the bot
   */
  user_id: number
  /**
   * The default sending channel of the bot. If this value is null,
   * no default channel
   */
  default_sending_stream: string | null
  /**
   * The default channel for which the bot receives events/register data.
   * If this value is null, no default channel
   */
  default_events_register_stream: string | null
  /**
   * Whether the bot can send messages to all channels by default
   */
  default_all_public_streams: boolean
  /**
   * An array containing extra configuration fields only relevant for outgoing
   * webhook bots and embedded bots. This is always a single-element array
   */
  services?: [EventBotOutgoingWebhookService | EventRealmBotEmbeddedService]
}

/**
 * Embedded bot information
 */
export type EventRealmEmbeddedBotItem = {
  /**
   * The name of the bot
   */
  name: string
  /**
   * A dictionary of string key/value pairs, which describe the configuration
   * for the bot
   */
  config: Record<string, string>
}

/**
 * Incoming Webhook bot configuration option
 */
export type EventRealmIncomingWebhookBotConfigOptionItem = {
  /**
   * A key for the configuration option
   */
  key: string
  /**
   * A human-readable label of the configuration option
   */
  label: string
  /**
   * The name of the validator function for the configuration option
   */
  validator: string
}

/**
 * Incoming webhook bot URL option
 * @since Zulip 11.0 (feature level 403)
 */
export type EventRealmIncomingWebhookBotUrlOptionItem = {
  /**
   * The parameter variable to encode the users input for this option in
   * the integrations webhook URL
   */
  key: string
  /**
   * A human-readable label of the url option
   */
  label: string
  /**
   * The name of the validator function for the configuration option
   */
  validator: string
}

/**
 * Incoming webhook bot information
 */
export type EventRealmIncomingWebhookBotItem = {
  /**
   * A machine-readable unique name identifying the integration
   */
  name: string
  /**
   * A human-readable display name
   * @since Zulip 8.0 (feature level 207)
   */
  display_name: string
  /**
   * For incoming webhook integrations that support the Zulip server filtering
   * incoming events. null indicates this incoming webhook integration doesn't
   * support such filtering
   * @since Zulip 8.0 (feature level 207)
   */
  all_event_types: string[] | null
  /**
   * Configuration options that can be set when creating a bot user for
   * this incoming webhook integration
   */
  config_options: EventRealmIncomingWebhookBotConfigOptionItem[]
  /**
   * An array of optional URL parameter options for the incoming webhook integration
   * @since Zulip 11.0 (feature level 403)
   */
  url_options: EventRealmIncomingWebhookBotUrlOptionItem[]
}

/**
 * Recent private conversation item
 */
export type EventRecentPrivateConversationItem = {
  /**
   * The highest message ID of the conversation
   */
  max_message_id: number
  /**
   * The list of users other than the current user in the direct message conversation
   */
  user_ids: number[]
}

/**
 * Channel that is visible to the user and the user has never been subscribed to
 */
export type EventNeverSubscribedStreamItem = {
  /**
   * Stream ID
   */
  stream_id: number
  /**
   * Stream name
   */
  name: string
  /**
   * Description in Zulip-flavored Markdown
   */
  description: string
  /**
   * Description reandered as HTML
   */
  rendered_description: string
  /**
   * UNIX timestamp when the channel is created
   * @since Zulip 4.0 (feature level 30)
   */
  date_created: number
  /**
   * ID of the user who created the channel.
   * If null, the reason is one of below.
   *
   * - Channel is too old to record the creator.
   *
   * - Channel was created when the realm was created.
   *
   * - Channel was created via the import tool.
   * @since Zulip 9.0 (feature level 254)
   */
  creator_id: number | null
  /**
   * Whether the channel is private or not
   */
  invite_only: boolean
  /**
   * The IDs of subscribers.
   * This field exists only if include_subscribers=true
   */
  subscribers?: number[]
  /**
   * The ID of partial subscribers
   * This field exists only if include_subscribers=partial
   * @since Zulip 11.0 (feature level 412)
   */
  partial_subscribers?: number[]
  /**
   * Only administrator can post or not
   * @deprecated From Zulip 3.0 (feature level 1), use stream_post_policy.
   * If you use Zulip 10.0 (feature level 333) or later, use can_send_message_group.
   */
  is_announcement_only: boolean
  /**
   * Whether the messages in this channel is public to the web or not.
   */
  is_web_public: boolean
  /**
   * Who can post to the channel.
   *
   * 1: Anyone can post
   *
   * 2: Only administrators can post
   *
   * 3: Only full members can post
   *
   * 4: Only moderators can post
   * @deprecated Since Zulip 10.0 (feature level 333), use can_send_message_group.
   */
  stream_post_policy: StreamPostPlicyValues
  /**
   * The number of days the message is deleted by the message retention policy.
   *
   * If this field is null, inherits from the organization level setting.
   *
   * If this field is -1, the message never expires by the message retention policy.
   */
  message_retention_days: number | null
  /**
   * Whether the history of the channel is public to its subscribers.
   */
  history_public_to_subscribers: boolean
  /**
   * The ID of the first message in the channel.
   *
   * If this field is null, no history is available.
   */
  first_message_id: number | null
  /**
   * The ID of the folder. If null, this channel does not belong any folders.
   * @since Zulip 11.0 (feature level 389)
   */
  folder_id: number | null
  /**
   * Whether empty name topic and named topics are enabled or not.
   *
   * inherit: Inherits from organization-level realm_topics_policy
   *
   * allow_empty_topic: Both empty name topic and named topics are enabled
   *
   * disable_empty_topic: Only named topics are enabled
   *
   * empty_topic_only: Only empty topic name is enabled
   * @since Zulip 11.0 (feature level 392)
   */
  topics_policy:
    | 'inherit'
    | 'allow_empty_topic'
    | 'disable_empty_topic'
    | 'empty_topic_only'
  /**
   * Whether the channel has recent message activity.
   * @since Zulip 10.0 (feature level 323)
   */
  is_recently_active: boolean
  /**
   * The average number of messages sent to the channel per week
   *
   * null indicates there is insufficient data to estimate the average traffic.
   */
  stream_weekly_traffic: number | null
  /**
   * A group-setting value defining the set of users who have permission to
   * add subscribers to this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 10.0 (feature level 342)
   */
  can_add_subscribers_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * remove subscribers from this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 6.0 (feature level 142)
   */
  can_remove_subscribers_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * administer this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 10.0 (feature level 325)
   */
  can_administer_channel_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * delete any messages in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 407)
   */
  can_delete_any_message_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * delete messages the user sent in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 407)
   */
  can_delete_own_message_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * move messages from this channel to another channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 396)
   */
  can_move_messages_out_of_channel_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * move messages from another channel to this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 396)
   */
  can_move_messages_within_channel_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * send messages in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 10.0 (feature level 333)
   */
  can_send_message_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * subscribe this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 10.0 (feature level 357)
   */
  can_subscribe_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * resolve topics in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 402)
   */
  can_resolve_topics_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * create topics in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 12.0 (feature level 441)
   */
  can_create_topic_group: number | ChannelPermissionGroupObj
  /**
   * Whether the channel is archived or not.
   * @since Zulip 10.0 (feature level 315)
   */
  is_archived: boolean
  /**
   * The number of subscribers who is not deactivated.
   * @since Zulip 11.0 (feature level 394)
   */
  subscriber_count: number
}

/**
 * Unread private messages information item
 */
export type EventUnreadMsgsPmItem = {
  /**
   * The user ID of the other participant in this one-on-one direct message conversation
   * @since Zulip 5.0 (feature level 119)
   */
  other_user_id: number
  /**
   * Old name for the other_user_id field.
   * @deprecated From Zulip 5.0 (feature level 119), use other_user_id instead
   */
  sender_id: number
  /**
   * The message IDs of the recent unread direct messages, sorted in ascending order
   */
  unread_message_ids: number[]
}

/**
 * Unread channel messages information item
 */
export type EventUnreadMsgsStreamItem = {
  /**
   * The topic under which the messages were sent
   */
  topic: string
  /**
   * The ID of the channel to which the messages were sent
   */
  stream_id: number
  /**
   * The message IDs of the recent unread channel messages, sorted in ascending order
   */
  unread_message_ids: number[]
}

/**
 * Unread group direct messages information item
 */
export type EventUnreadMsgsHuddleItem = {
  /**
   * A string containing the IDs of all users in the group direct message conversation,
   * including the current user, separated by commas and sorted numerically
   */
  user_ids_string: string
  /**
   * The message IDs of the recent unread messages which have been sent in this
   * group direct message conversation, sorted in ascending order
   */
  unread_message_ids: number[]
}

/**
 * Unread messages information
 */
export type EventUnreadMsgs = {
  /**
   * The number of unread messages
   */
  count: number
  /**
   * Unread private messages information
   */
  pms: EventUnreadMsgsPmItem[]
  /**
   * Unread channel messages information
   */
  streams: EventUnreadMsgsStreamItem[]
  /**
   * Unread group direct messages information
   */
  huddles: EventUnreadMsgsHuddleItem[]
  /**
   * IDs of all unread messages in which the user was mentioned directly,
   * and unread non-muted messages in which the user was mentioned through
   * a wildcard
   */
  mentions: number[]
  /**
   * Whether this data set was truncated because the user has too many unread messages
   * @since Zulip 4.0 (feature level 44)
   */
  old_unreads_missing: boolean
}

/**
 * Default channel group
 */
export type EventDefaultStreamGroupItem = {
  /**
   * Name of the default channel group
   */
  name: string
  /**
   * Description of the default channel group
   */
  description: string
  /**
   * ID of the default channel group
   */
  id: number
  /**
   * IDs of all the channels in the default stream group
   */
  streams: number[]
}

/**
 * Emoji set supported by this version of the Zulip server
 */
export type EventEmojisetChoiceItem = {
  /**
   * The key or the name of the emoji set
   */
  key: string
  /**
   * The text describing the emoji set
   */
  text: string
}

/**
 * The image format that uploaded images will be thumbnailed into
 * @since Zulip 9.0 (feature level 273)
 */
export type EventServerThumbnailFormatItem = {
  /**
   * The file path component of the thumbnail format
   */
  name: string
  /**
   * The maximum width of this format
   */
  max_width: number
  /**
   * The maximum height of this format
   */
  max_height: number
  /**
   * The extension of this format
   */
  format: string
  /**
   * If this file format is animated
   */
  animated: boolean
}

/**
 * User settings
 */
export type EventUserSettings = {
  /**
   * Whether to display time in 24-hour notation. null indicates the locale default
   */
  twenty_four_hour_time: boolean | null
  /**
   * Mark as read policy when scrolling.
   *
   * - 1 - Always
   * - 2 - Only in conversation views
   * - 3 - Never
   * @since Zulip 7.0 (feature level 175)
   */
  web_mark_read_on_scroll_policy?: UserSettingsWebMarkReadScrollPolicyValues
  /**
   * Default channel view
   *
   * - 1 - Top topic in the channel
   * - 2 - Channel feed
   * - 3 - List of topics
   * - 4 - Top unread topic in channel
   * @since Zulip 9.0 (feature level 269)
   */
  web_channel_default_view: UserSettingsWebChannelDefaultViewValues
  /**
   * Whether clients display the number of starred messages or not
   */
  starred_message_counts: boolean
  /**
   * Whether to receive typing notifications
   * @since Zulip 9.0 (feature level 253)
   */
  receives_typing_notifications: boolean
  /**
   * Whether to suggest time zone update if the timezone setting is different
   * from the client device time zone
   * @since Zulip 10.0 (feature level 329)
   */
  web_suggest_update_timezone: boolean
  /**
   * Whether to use the maximum available screen width
   */
  fluid_layout_width: boolean
  /**
   * Reserved for use to control variations in Zulip's design to help visually impaired users
   */
  high_contrast_mode: boolean
  /**
   * Primary font-size
   * @since Zulip 9.0 (feature level 245)
   */
  web_font_size_px: number
  /**
   * Line height percent. For example line-height=1.2 is 120.
   * @since Zulip 9.0 (feature level 245)
   */
  web_line_height_percent: number
  /**
   * Color scheme
   *
   * - 1 - Automatic
   * - 2 - Dark theme
   * - 3 - Light theme
   */
  color_scheme: UserSettingsColorSchemeValues
  /**
   * Whether to translate emoticons to emoji in messages the user sends
   */
  translate_emoticons: boolean
  /**
   * Whether to display the names of reacting users on a message
   * @since Zulip 6.0 (feature level 125)
   */
  display_emoji_reaction_users?: boolean
  /**
   * User default language
   */
  default_language: string
  /**
   * The home view
   *
   * - recent - Recent conversations view
   * - inbox - Inbox view
   * - all_messages - Combined feed view
   * @since Zulip 8.0 (feature level 219)
   */
  web_home_view: UpdateUserSettingsParamsWebHomeViewValues
  /**
   * Whether the escape key navigates to the configured home view
   * @since Zulip 8.0 (feature level 219)
   */
  web_escape_navigates_to_home_view: boolean
  /**
   * Whether the users list on left sidebar in narrow windows
   */
  left_side_userlist: boolean
  /**
   * The user's configured emoji set
   *
   * - google - Google modern
   * - twitter - Twitter
   * - text - Plain text
   */
  emojiset: UpdateUserSettingsParamsEmojiSetValues
  /**
   * Whether to hide inactive channels in the left sidebar
   *
   * - 1 - Automatic
   * - 2 - Always
   * - 3 - Never
   */
  demote_inactive_streams: UserSettingsDemoteInactiveStreamsValues
  /**
   * User list style
   *
   * - 1 - Compact
   * - 2 - With status
   * - 3 - With avatar and status
   * @since Zulip 6.0 (feature level 141)
   */
  user_list_style: UserSettingsUserListStyleValues
  /**
   * How animated images should be played in the message feed
   *
   * - always - Always play animate
   * - on_hover - Play on hover
   * - never - Never play
   * @since Zulip 9.0 (feature level 275)
   */
  web_animate_image_previews: UpdateUserSettingsParamsWebAnimateImagePreviewsValues
  /**
   * Which channels should be displayed with a numeric unread count in the left sidebar
   *
   * - 1 - All channels
   * - 2 - Unmuted channels and topics
   * - 3 - No channels
   * @since Zulip 8.0 (feature level 210)
   */
  web_stream_unreads_count_display_policy: UserSettingsWebStreamUnreadsCountDisplayPolicyValues
  /**
   * Whether user wants AI features like topic summarization to be hidden
   * @since Zulip 10.0 (feature level 350)
   */
  hide_ai_features: boolean
  /**
   * Whether channel folders are used to organize how conversations with unread messages are displayed
   * @since Zulip 12.0 (feature level 431)
   */
  web_inbox_show_channel_folders: boolean
  /**
   * Whether channel folders are used to organize how channels are displayed
   * @since Zulip 11.0 (feature level 411)
   */
  web_left_sidebar_show_channel_folders: boolean
  /**
   * Whether left sidebar displays the unread message count summary
   * @since Zulip 11.0 (feature level 398)
   */
  web_left_sidebar_unreads_count_summary: boolean
  /**
   * User's time zone. You must specify IANA identifier of the time zone.
   */
  timezone: string
  /**
   * Whether pressing Enter in the compose box sends a message (or saves a message edit)
   */
  enter_sends: boolean
  /**
   * Whether synchronizing drafts is enabled
   * @since Zulip 5.0 (feature level 87)
   */
  enable_drafts_synchronization: boolean
  /**
   * Enable visual desktop notifications for channel messages
   */
  enable_stream_desktop_notifications: boolean
  /**
   * Enable email notifications for channel messages
   */
  enable_stream_email_notifications: boolean
  /**
   * Enable mobile notifications for channel messages
   */
  enable_stream_push_notifications: boolean
  /**
   * Enable audible desktop notifications for channel messages
   */
  enable_stream_audible_notifications: boolean
  /**
   * Notification sound name
   */
  notification_sound: string
  /**
   * Enable visual desktop notifications for direct messages and @-mentions
   */
  enable_desktop_notifications: boolean
  /**
   * Enable audible desktop notifications for direct messages and @-mentions
   */
  enable_sounds: boolean
  /**
   * Enable visual desktop notifications for messages sent to followed topics
   * @since Zulip 8.0 (feature level 189)
   */
  enable_followed_topic_desktop_notifications: boolean
  /**
   * Enable email notifications for messages sent to followed topics
   * @since Zulip 8.0 (feature level 189)
   */
  enable_followed_topic_email_notifications: boolean
  /**
   * Enable push notifications for messages sent to followed topics
   * @since Zulip 8.0 (feature level 189)
   */
  enable_followed_topic_push_notifications: boolean
  /**
   * Enable audible desktop notifications for messages sent to followed topics
   * @since Zulip 8.0 (feature level 189)
   */
  enable_followed_topic_audible_notifications: boolean
  /**
   * The duration seconds for which the server waits to batch email notifications before sending
   * @since Zulip 5.0 (feature level 82)
   */
  email_notifications_batching_period_seconds: number
  /**
   * Enable email notifications for direct messages and @-mentions received when the user is offline
   */
  enable_offline_email_notifications: boolean
  /**
   * Enable mobile notification for direct messages and @-mentions received when the user is offline
   */
  enable_offline_push_notifications: boolean
  /**
   * Enable mobile notification for direct messages and @-mentions received when the user is online
   */
  enable_online_push_notifications: boolean
  /**
   * Enable digest emails when the user is away
   */
  enable_digest_emails: boolean
  /**
   * Enable marketing emails. Has no function outside Zulip Cloud
   */
  enable_marketing_emails: boolean
  /**
   * Enable email notifications for new logins to account
   */
  enable_login_emails: boolean
  /**
   * Include the message's content in email notifications for new messages
   */
  message_content_in_email_notifications: boolean
  /**
   * Include content of direct messages in desktop notifications
   */
  pm_content_in_desktop_notifications: boolean
  /**
   * Whether wildcard mentions should send notifications like a personal mention
   */
  wildcard_mentions_notify: boolean
  /**
   * Whether wildcard mentions in messages sent to followed topics should send
   * notifications like a personal mention
   * @since Zulip 8.0 (feature level 189)
   */
  enable_followed_topic_wildcard_mentions_notify: boolean
  /**
   * Unread count badge
   *
   * - 1 - All unread messages
   * - 2 - DMs, mentions, and followed topics
   * - 3 - DMs and mentions
   * - 4 - None
   */
  desktop_icon_count_display: UserSettingsDesktopIconCountDisplayValues
  /**
   * Whether to include organization name in subject of message notification emails
   *
   * - 1 - Automatic
   * - 2 - Always
   * - 3 - Never
   * @since Zulip 7.0 (feature level 168)
   */
  realm_name_in_email_notifications_policy: UserSettingsRealmNameInEmailNotificationsPolicyValues
  /**
   * Which topics to follow automatically
   *
   * - 1 - Topics the user participates in
   * - 2 - Topics the user sends a message to
   * - 3 - Topics the user starts
   * - 4 - Never
   * @since Zulip 8.0 (feature level 214)
   */
  automatically_follow_topics_policy: UserSettingsAutomaticallyFollowTopicsPolicyValues
  /**
   * Which topics to unmute automatically in muted channels
   *
   * - 1 - Topics the user participates in
   * - 2 - Topics the user sends a message to
   * - 3 - Topics the user starts
   * - 4 - Never
   * @since Zulip 8.0 (feature level 214)
   */
  automatically_unmute_topics_in_muted_streams_policy: UserSettingsAutomaticallyUnmuteTopicsInMutedChannelsPolicyValues
  /**
   * Whether the server will automatically mark the user as following topics where the user is mentioned
   * @since Zulip 8.0 (feature level 235)
   */
  automatically_follow_topics_where_mentioned: boolean
  /**
   * Whether the resolved-topic notices are marked as read
   *
   * - always - Always mark resolved-topic notices as read
   * - except_followed - Mark resolved-topic notices as read in topics not followed by the user
   * - never - Never mark resolved-topic notices as read
   * @since Zulip 11.0 (feature level 385)
   */
  resolved_topic_notice_auto_read_policy: UpdateUserSettingsParamsResolvedTopicNoticeAutoReadPolicyValues
  /**
   * Display the presence status to other users when online
   */
  presence_enabled: boolean
  /**
   * The names of the notification sound options supported by this Zulip server
   */
  available_notification_sounds: string[]
  /**
   * Available Emoji sets
   */
  emojiset_choices: EventEmojisetChoiceItem[]
  /**
   * Whether typing notifications be sent when composing direct messages
   * @since Zulip 5.0 (feature level 105)
   */
  send_private_typing_notifications: boolean
  /**
   * Whether typing notifications be sent when composing channel messages
   * @since Zulip 5.0 (feature level 105)
   */
  send_stream_typing_notifications: boolean
  /**
   * Whether other users are allowed to see whether you've read messages
   * @since Zulip 5.0 (feature level 105)
   */
  send_read_receipts: boolean
  /**
   * Whether organization administrators are allowed to export your private data
   * @since Zulip 10.0 (feature level 293)
   */
  allow_private_data_export: boolean
  /**
   * The policy other users in this organization can see their real email address
   *
   * - 1 - Everyone
   * - 2 - Members only
   * - 3 - Administrators only
   * - 4 - Nobody
   * - 5 - Moderators only
   * @since Zulip 7.0 (feature level 163)
   */
  email_address_visibility: UserSettingsEmailAddressVisibilityValues
  /**
   * Whether the user's view should automatically go to the conversation where they sent a message
   * @since Zulip 9.0 (feature level 268)
   */
  web_navigate_to_sent_message: boolean
}

/**
 * User topic settings item
 */
export type EventUserTopic = {
  /**
   * Channel ID
   */
  stream_id: number
  /**
   * The name of the topic
   */
  topic_name: string
  /**
   * UNIX timestamp representing when the user-topic relationship was changed
   */
  last_updated: number
  /**
   * The user's visibility configuration for the topic
   */
  visibility_policy: Exclude<TopicVisibilityValues, 0>
}

/**
 * User's logged-in device
 * @since Zulip 12.0 (feature level 468)
 */
export type EventDeviceItem = {
  /**
   * ID to reference the encryption key
   */
  push_key_id: string | null
  /**
   * ID to reference the token provided by FCM/APNs to the device, which is registered
   * to the push bouncer service
   */
  push_token_id: string | null
  /**
   * ID to reference the token provided by FCM/APNs to the device,
   * whose registration is in progress to the push bouncer service
   */
  pending_push_token_id: string | null
  /**
   * The UNIX timestamp for the last time when pending_push_token_id
   * was set to a new non-null value
   */
  push_token_last_updated_timestamp: number | null
  /**
   * Zulip API error code indicating the type of failure that occurred
   */
  push_registration_error_code?: string | null
}

/**
 * Authentication method when available
 */
type EventRealmAuthMethodAvailableItem = {
  /**
   * Whether the authentication method is enabled
   */
  enabled: boolean
  /**
   * Whether the authentication method is available
   */
  available: true
  /**
   * The reason why the authentication method is unavailable
   */
  unavailable_reason: never
}

/**
 * Authentication method when unavailable
 */
type EventRealmAuthMethodUnavailableItem = {
  /**
   * Whether the authentication method is enabled
   */
  enabled: boolean
  /**
   * Whether the authentication method is available
   */
  available: false
  /**
   * The reason why the authentication method is unavailable
   */
  unavailable_reason: string
}

/**
 * Authentication method
 */
export type EventRealmAuthMethodItem =
  | EventRealmAuthMethodAvailableItem
  | EventRealmAuthMethodUnavailableItem

/**
 * Supported video call provider
 */
export type EventVideoChatProviderItem = {
  /**
   * The name of the video call provider
   */
  name: string
  /**
   * The ID of the video call provider
   */
  id: number
}

/**
 * Default external account provider
 */
export type EventDefaultExternalAccountItem = {
  /**
   * The name of the external account provider
   */
  name: string
  /**
   * The text describing the external account
   */
  text: string
  /**
   * The help text to be displayed for the custom profile field in user-facing
   * settings UI
   */
  hint: string
  /**
   * The regex pattern of the URL of a profile page on the external site
   */
  url_pattern: string
}

/**
 * Valid rating configuration item
 * @since Zulip 4.0 (feature level 55)
 */
export type EventGifRatingPolicyItem = {
  /**
   * The description of the rating option
   */
  name: string
  /**
   * The ID of the rating option
   */
  id: number
}

/**
 * A dictionary containing billing information of the organization
 * @since Zulip 10.0 (feature level 363)
 */
export type EventRealmBillingInfo = {
  /**
   * Whether there is a pending sponsorship request for the organization
   */
  has_pending_sponsorship_request: boolean
}

/**
 * Details of a single cross realm bot
 */
export type EventCrossRealmBotItem = GetUserByIdResponseUser & {
  /**
   * Custom field data. Key is the custom field ID. If bot user, this field
   * does not exist.
   */
  profile_data: never
  /**
   * Whether the bot is a system bot or not
   */
  is_system_bot: boolean
}

/**
 * A supported report type
 * @since Zulip 12.0 (feature level 435)
 */
export type EventServerReportTypeItem = {
  /**
   * The unique ID for the report message type
   */
  key: string
  /**
   * The user-facing string for the report message type
   */
  name: string
}

/**
 * The response of RegisterEventQueue API
 * @see https://zulip.com/api/register-queue#response
 */
export type RegisterEventQueueResponse = GeneralSuccessResponse & {
  /**
   * The ID of the queue that has been allocated for your client
   * null if unauthenticated access
   */
  queue_id: string | null
  /**
   * The initial value of last_event_id
   */
  last_event_id: number
  /**
   * The server's current Zulip feature level
   * @since Zulip 3.0 (feature level 1)
   */
  zulip_feature_level: number
  /**
   * The server's version number
   */
  zulip_version: string
  /**
   * The git merge-base between zulip_version and official branches in the public
   * Zulip server and web app repository
   * @since Zulip 5.0 (feature level 88)
   */
  zulip_merge_base: string
  /**
   * Alert words that the current user has configured.
   * Exists only if fetch_event_types includes alert_words
   */
  alert_words?: string[]
  /**
   * Custom profile fields.
   * Exists only if fetch_event_types includes custom_profile_fields
   */
  custom_profile_fields?: GetCustomProfileFieldsItem[]
  /**
   * Custom profile field types.
   * Exists only if fetch_event_types includes custom_profile_fields
   */
  custom_profile_field_types: Record<
    EventCustomFieldTypeKeys,
    EventCustomFieldTypeItem
  >
  /**
   * The UNIX timestamp when the organization was created.
   * Exists only if fetch_event_types includes realm
   * @since Zulip 8.0 (feature level 203)
   */
  realm_date_created?: number
  /**
   * The UNIX timestamp when the demo organization will be automatically deleted.
   * Exists only if fetch_event_types includes realm
   * @since Zulip 5.0 (feature level 94)
   */
  demo_organization_scheduled_deletion_date?: number
  /**
   * Drafts for the user
   */
  drafts: GetDraftsResponseItem[]
  /**
   * Onboarding steps that should be shown to the user
   * Exists only if fetch_event_types includes onboarding_steps
   */
  onboarding_steps?: EventOnboardingStepItem[]
  /**
   * URL of the navigation tour video to display to new users during onboarding.
   * null indicates the feature is disabled.
   * Exists only if fetch_event_types includes onboarding_steps
   * @since Zulip 10.0 (feature level 369)
   */
  navigation_tour_video_url?: string
  /**
   * The highest message ID among all messages the user has received
   * Exists only if fetch_event_types includes message
   * @deprecated If you want to fetch the latest messages, you should pass
   * anchor=latest
   */
  max_message_id?: number
  /**
   * The maximum allowed length for a reminder note, in Unicode code points
   * @since Zulip 11.0 (feature level 415)
   */
  max_reminder_note_length: number
  max_stream_name_length?: number
  max_stream_description_length?: number
  max_channel_folder_name_length?: number
  max_channel_folder_description_length?: number
  max_topic_length?: number
  max_message_length?: number
  server_min_deactivated_realm_deletion_days?: number | null
  server_presence_ping_interval_seconds?: number
  server_presence_offline_threshold_seconds?: number
  server_typing_started_expiry_period_milliseconds?: number
  server_typing_stopped_wait_period_milliseconds?: number
  server_typing_started_wait_period_milliseconds?: number
  scheduled_messages?: GetScheduleMessagesResponseItem[]
  // It should be reminder items
  // see https://github.com/zulip/zulip/blob/main/zerver/lib/events.py#L349
  reminders?: GetRemindersResponseItem[]
  muted_topics?: (string | number)[][]
  muted_users?: EventMutedUserItem[]
  presences?:
    | Record<string, UpdatePresenceResponseModernUserItem>
    | Record<string, GetAllUserPresenceUserItem>
  presence_last_update_id?: number
  server_timestamp?: number
  realm_domains?: EventRealmDomainItem
  realm_emoji?: Record<string, GetEmojisResponseItem>
  // It should be GetLinkifiersItem
  realm_linkifiers?: GetLinkifiersItem[]
  realm_filters?: (string | number)[][]
  realm_playgrounds?: EventPlaygroundItem[]
  realm_user_groups?: GetUserGroupsResponseGroup[]
  realm_bots?: EventRealmBotItem[]
  realm_embedded_bots?: EventRealmEmbeddedBotItem[]
  realm_incoming_webhook_bots?: EventRealmIncomingWebhookBotItem[]
  recent_private_conversations?: EventRecentPrivateConversationItem[]
  navigation_views?: GetNavigationViewsResponseItem[]
  saved_snippets?: GetSnippetsResponseItem[]
  subscriptions?: GetSubscriptionsResponseItem[]
  unsubscribed?: GetSubscriptionsResponseItem[]
  never_subscribed?: EventNeverSubscribedStreamItem[]
  channel_folders?: GetChannelFoldersResponseItem[]
  unread_msgs?: EventUnreadMsgs[]
  starred_messages?: number[]
  streams?: GetChannelsChannel[]
  realm_default_streams?: number[]
  realm_default_stream_groups?: EventDefaultStreamGroupItem[]
  stop_words?: string[]
  user_status?: Record<string, GetUserStatusResponseStatus>
  user_settings?: EventUserSettings
  user_topics?: EventUserTopic[]
  has_zoom_token?: boolean
  giphy_api_key?: string
  tenor_api_key?: string
  devices?: Record<string, EventDeviceItem>
  receives_typing_notifications: boolean
  realm_message_edit_history_visibility_policy?: 'all' | 'moves' | 'none'
  realm_allow_edit_history?: boolean
  realm_can_add_custom_emoji_group?: number | ChannelPermissionGroupObj
  realm_can_add_subscribers_group?: number | ChannelPermissionGroupObj
  realm_can_delete_any_message_group?: number | ChannelPermissionGroupObj
  realm_can_delete_own_message_group?: number | ChannelPermissionGroupObj
  realm_can_set_delete_message_policy_group?: number | ChannelPermissionGroupObj
  realm_can_set_topics_policy_group?: number | ChannelPermissionGroupObj
  realm_can_invite_users_group?: number | ChannelPermissionGroupObj
  realm_can_mention_many_users_group?: number | ChannelPermissionGroupObj
  realm_can_move_messages_between_channels_group?:
    | number
    | ChannelPermissionGroupObj
  realm_can_move_messages_between_topics_group?:
    | number
    | ChannelPermissionGroupObj
  realm_can_create_groups?: number | ChannelPermissionGroupObj
  realm_can_create_bots_group?: number | ChannelPermissionGroupObj
  realm_can_create_write_only_bots_group?: number | ChannelPermissionGroupObj
  realm_can_manage_all_groups?: number | ChannelPermissionGroupObj
  realm_can_manage_billing_group?: number | ChannelPermissionGroupObj
  realm_can_create_public_channel_group?: number | ChannelPermissionGroupObj
  realm_can_create_private_channel_group?: number | ChannelPermissionGroupObj
  realm_can_create_web_public_channel_group?: number | ChannelPermissionGroupObj
  realm_can_resolve_topics_group?: number | ChannelPermissionGroupObj
  /**
   * Users who have permission to create public channels in the organization.
   * Exists only if fetch_event_type includes realm
   * @deprecated From Zulip 9.0 (feature level 264), use
   * realm_can_create_public_channel_group instead
   */
  realm_create_public_stream_policy?: CreateStreamPolicyValues
  /**
   * Users who have permission to create private channels in the organization
   * Exists only if fetch_event_type includes realm
   * @deprecated From Zulip 9.0 (feature level 264), use
   * realm_can_create_private_channel_group instead
   */
  realm_create_private_stream_policy?: CreateStreamPolicyValues
  /**
   * Users who have permission to create web-public channels in the organization
   * Exists only if fetch_event_type includes realm
   * @since Zulip 5.0 (feature level 103)
   * @deprecated From Zulip 10.0 (feature level 280), use
   * realm_can_create_web_public_channel_group instead
   */
  realm_create_web_public_stream_policy?: CreateWebPublicStreamPolicyValues
  /**
   * Users who have permission to use wildcard mentions in large channels
   * Exists only if fetch_event_type includes realm
   * @since Zulip 4.0 (feature level 33)
   * @deprecated From Zulip 10.0 (feature level 352), use
   * realm_can_mention_many_users_group instead
   */
  realm_wildcard_mention_policy?: WildcardMentionPolicyValues
  realm_default_language?: string
  realm_welcome_message_custom_text?: string
  realm_description?: boolean
  realm_digest_emails_enabled?: boolean
  realm_disallow_disposable_email_addresses?: boolean
  realm_email_changes_disabled?: boolean
  realm_invite_required?: boolean
  realm_create_multiuse_invite_group?: number | ChannelPermissionGroupObj
  realm_media_preview_size?: MediaPreviewSizeSettingValues
  realm_inline_image_preview?: boolean
  realm_inline_url_embed_preview?: boolean
  realm_topics_policy?: 'allow_empty_topic' | 'disable_empty_topic'
  /**
   * Whether topics are required or not
   * @deprecated From Zulip 11.0 (feature level 392), use realm_topics_policy instead
   */
  realm_mandatory_topics?: boolean
  realm_message_retention_days?: number
  realm_name?: string
  realm_require_e2ee_push_notifications?: boolean
  realm_require_unique_names?: boolean
  realm_name_changes_disabled?: boolean
  realm_avatar_changes_disabled?: boolean
  realm_emails_restricted_to_domains?: boolean
  realm_send_channel_events_messages?: boolean
  realm_send_welcome_emails?: boolean
  realm_message_content_allowed_in_email_notifications?: boolean
  realm_enable_spectator_access?: boolean
  realm_want_advertise_in_communities_directory?: boolean
  realm_video_chat_provider?: VideoChatProviderValues
  realm_jitsi_server_url?: string | null
  realm_gif_rating_policy?: number
  realm_waiting_period_threshold?: number
  realm_digest_weekday?: RealmDigestWeekdayValues
  realm_direct_message_initiator_group?: number | ChannelPermissionGroupObj
  realm_direct_message_permission_group?: number | ChannelPermissionGroupObj
  realm_default_code_block_language?: string
  realm_message_content_delete_limit_seconds?: number | null
  realm_authentication_methods?: Record<string, EventRealmAuthMethodItem>
  realm_allow_message_editing?: boolean
  realm_message_content_edit_limit_seconds?: number | null
  realm_move_messages_within_stream_limit_seconds?: number | null
  realm_move_messages_between_streams_limit_seconds?: number | null
  realm_enable_read_receipts?: boolean
  realm_icon_url?: string
  realm_icon_source?: 'G' | 'U'
  realm_workplace_users_group?: number | ChannelPermissionGroupObj
  max_icon_file_size_mib?: number
  realm_logo_url?: string
  realm_logo_source?: 'D' | 'U'
  realm_night_logo_url?: string
  realm_night_logo_source?: 'D' | 'U'
  max_logo_file_size_mib?: number
  realm_bot_domain?: string
  realm_uri?: string
  realm_url?: string
  realm_uuid?: string
  realm_available_video_chat_providers?: Record<
    string,
    EventVideoChatProviderItem
  >
  realm_presence_disabled?: boolean
  settings_send_digest_emails?: boolean
  realm_email_auth_enabled?: boolean
  realm_password_auth_enabled?: boolean
  realm_push_notifications_enabled?: boolean
  realm_push_notifications_enabled_end_timestamp?: number | null
  realm_upload_quota_mib?: number | null
  realm_org_type?: RealmTypeValues
  realm_owner_full_content_access?: boolean
  realm_plan_type?: RealmPlanTypeValues
  realm_enable_guest_user_dm_warning?: boolean
  realm_enable_guest_user_indicator?: boolean
  realm_can_access_all_users_group?: number | ChannelPermissionGroupObj
  realm_can_summarize_topics_group?: number | ChannelPermissionGroupObj
  zulip_plan_is_not_limited?: boolean
  upgrade_text_for_wide_organization_logo?: string
  realm_default_external_accounts?: Record<
    string,
    EventDefaultExternalAccountItem
  >
  realm_default_avatar_source?: 'G' | 'J'
  jitsi_server_url?: string
  development_environment?: boolean
  server_generation?: number
  password_min_length?: number
  password_max_length?: number
  password_min_guesses?: number
  gif_rating_policy_options?: Record<string, EventGifRatingPolicyItem>
  max_file_upload_size_mib?: number
  max_avatar_file_size_mib?: number
  server_inline_image_preview?: boolean
  server_inline_url_embed_preview?: boolean
  server_thumbnail_formats?: EventServerThumbnailFormatItem[]
  server_avatar_changes_disabled?: boolean
  server_name_changes_disabled?: boolean
  server_needs_upgrade?: boolean
  server_web_public_streams_enabled?: boolean
  server_emoji_data_url?: string
  server_jitsi_server_url?: string | null
  server_can_summarize_topics?: boolean
  event_queue_longpoll_timeout_seconds?: number
  realm_billing?: EventRealmBillingInfo
  realm_moderation_request_channel_id?: number
  realm_new_stream_announcements_stream_id?: number
  realm_signup_announcements_stream_id?: number
  realm_zulip_update_announcements_stream_id?: number
  realm_empty_topic_display_name?: string
  realm_user_settings_defaults?: EventUserSettings
  realm_users?: GetUserByIdResponseUser[]
  realm_non_active_users?: GetUserByIdResponseUser[]
  avatar_source?: 'G' | 'J' | 'U'
  avatar_url_medium?: string
  avatar_url?: string
  can_create_streams?: boolean
  can_create_public_streams?: boolean
  can_create_private_streams?: boolean
  can_create_web_public_streams?: boolean
  can_subscribe_other_users?: boolean
  can_invite_others_to_realm?: boolean
  is_admin?: boolean
  is_owner?: boolean
  is_moderator?: boolean
  is_guest?: boolean
  user_id?: number
  email?: string
  delivery_email?: string
  full_name?: string
  cross_realm_bots?: EventCrossRealmBotItem[]
  server_report_message_types?: EventServerReportTypeItem[]
}

/**
 * Register a Zulip event queue
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of RegisterEventQueue API
 */
export async function registerEventQueue(
  client: AxiosInstance,
  params: RegisterEventQueueParams,
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    if (Array.isArray(value)) {
      body.append(key, JSON.stringify(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.post<RegisterEventQueueResponse>('/register', body)

  return resp.data
}
