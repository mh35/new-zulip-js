import type { GetChannelsChannel } from './channel/channel'
import type { ChannelPermissionGroupObj } from './channel/common'
import type { GetChannelFoldersResponseItem } from './channel/folder'
import type { GetSubscriptionsResponseItem } from './channel/subscription'
import type {
  BotServiceOutgoingWebhookFormats,
  BotTypeValues,
  CreateStreamPolicyValues,
  CreateWebPublicStreamPolicyValues,
  MediaPreviewSizeSettingValues,
  RealmDigestWeekdayValues,
  RealmPlanTypeValues,
  RealmTypeValues,
  TopicVisibilityValues,
  UserRoleValues,
  VideoChatProviderValues,
  WildcardMentionPolicyValues,
} from './constants'
import type { GetCustomProfileFieldsItem } from './custom-profile-field'
import type { GetDraftsResponseItem } from './draft'
import type { GetEmojisResponseItem } from './emoji'
import type { GetLinkifiersItem } from './linkifier'
import type {
  EmojiTypes,
  GetMessagesResponseMessageItem,
  MessageFlags,
} from './message'
import type { GetNavigationViewsResponseItem } from './navigation-view'
import type { GetExportsResponseItem } from './realm-export'
import type { GetRemindersResponseItem } from './reminder'
import type { GetScheduleMessagesResponseItem } from './scheduled-message'
import type { GetSnippetsResponseItem } from './snippet'
import type { GetUserGroupsResponseGroup } from './user/group'
import type { GetUserByIdResponseUser } from './user/user'

/**
 * Common type of the event
 */
export type EventItemCommon = {
  /**
   * The ID of the event
   */
  id: number
  /**
   * The event's type
   */
  type: string
  /**
   * The operation of the event
   */
  op?: string
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

/**
 * Realm bot item
 */
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
 * Event sent to a user's clients when that user's set of configured alert words have changed
 * @see https://zulip.com/api/get-events#alert_words
 */
export type AlertWordsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'alert_words'
  /**
   * The operation of the event
   */
  op: never
  /**
   * Alert words (or phrases) configured by the user
   */
  alert_words: string[]
}

/**
 * Common fields for the person in user_settings-update event
 */
export type UpdateRealmUserPersonCommon = {
  /**
   * The ID of the user affected by this change
   */
  user_id: number
}

/**
 * Person full name update
 */
export type UpdateRealmUserPersonFullName = UpdateRealmUserPersonCommon & {
  /**
   * The new full name for the user
   */
  full_name: string
}

/**
 * Person avater update
 */
export type UpdateRealmUserPersonAvatar = UpdateRealmUserPersonCommon & {
  /**
   * The URL of the new avatar for the user
   */
  avatar_url: string
  /**
   * The new avatar data source type for the user
   *
   * - G - Hosted by Gravatar
   * - J - Generated using Jdenticon
   * - U - Uploaded by user
   */
  avatar_source: 'G' | 'J' | 'U'
  /**
   * The new medium-size avatar URL for user
   */
  avatar_url_medium: string
  /**
   * The version number for the user's avatar
   */
  avatar_version: number
}

/**
 * Timezone update
 */
export type UpdateRealmUserPersonTimezone = UpdateRealmUserPersonCommon & {
  /**
   * The Zulip API email of the user
   * @deprecated It is redundant with the user_id
   */
  email: string
  /**
   * The IANA identifier of the new profile time zone for the user
   */
  timezone: string
}

/**
 * Bot owner update
 */
export type UpdateRealmUserPersonOwner = UpdateRealmUserPersonCommon & {
  /**
   * The user ID of the new bot owner
   */
  bot_owner_id: number
}

/**
 * Role update
 */
export type UpdateRealmUserPersonRole = UpdateRealmUserPersonCommon & {
  /**
   * The new role of the user.
   */
  role: UserRoleValues
}

/**
 * Delivery email address update
 */
export type UpdateRealmUserPersonDeliveryEmail = UpdateRealmUserPersonCommon & {
  /**
   * The new delivery email of the user. null indicates you cannot access their real email.
   */
  delivery_email: string | null
}

/**
 * Custom field data for custom field value update
 */
export type UpdateRealmUserPersonCustomFieldValue = {
  /**
   * The ID of the custom profile field
   */
  id: number
  /**
   * User's personal value for this custom profile field, or null if unset
   */
  value: string | null
  /**
   * The value rendered in HTML. Will only be present for custom profile field
   * types that support Markdown rendering
   */
  rendered_value?: string
}

/**
 * Custom field data update
 */
export type UpdateRealmUserPersonCustomField = UpdateRealmUserPersonCommon & {
  /**
   * Custom profile data change
   */
  custom_profile_field: UpdateRealmUserPersonCustomFieldValue
}

/**
 * Email update
 */
export type UpdateRealmUserPersonEmail = UpdateRealmUserPersonCommon & {
  /**
   * The new value of email for the user.
   */
  new_email: string
}

/**
 * Deactivated or reactivated
 * @since Zulip 8.0 (feature level 222)
 */
export type UpdateRealmUserPersonActivateStatus =
  UpdateRealmUserPersonCommon & {
    /**
     * Whether the user account has been deactivated
     */
    is_active: boolean
  }

/**
 * Import stub status update
 * @since Zulip 12.0 (feature level 433)
 */
export type UpdateRealmUserPersonImportStatus = UpdateRealmUserPersonCommon & {
  /**
   * Whether the user account is stub or not. This value is always false.
   */
  is_imported_stub: false
}

/**
 * User created by API first login
 * @since Zulip 12.0 (feature level 475)
 */
export type UpdateRealmUserPersonJoinDate = UpdateRealmUserPersonCommon & {
  /**
   * The time when the user logged in to their account for the first time
   */
  date_joined: string
}

/**
 * Person field types for user_settings-update event
 */
export type UpdateRealmUserPerson =
  | UpdateRealmUserPersonFullName
  | UpdateRealmUserPersonAvatar
  | UpdateRealmUserPersonTimezone
  | UpdateRealmUserPersonOwner
  | UpdateRealmUserPersonRole
  | UpdateRealmUserPersonDeliveryEmail
  | UpdateRealmUserPersonCustomField
  | UpdateRealmUserPersonEmail
  | UpdateRealmUserPersonActivateStatus
  | UpdateRealmUserPersonImportStatus
  | UpdateRealmUserPersonJoinDate

/**
 * Update realm user event (user profile change)
 * @see https://zulip.com/api/get-events#realm_user-update
 */
export type UpdateRealmUserEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_user'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * Update user settings event target and content
   */
  person: UpdateRealmUserPerson
}

/**
 * Add subscribed channels event
 * @see https://zulip.com/api/get-events#subscription-add
 */
export type AddSubscriptionEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'subscription'
  /**
   * The operation of the event
   */
  op: 'add'
  /**
   * Subscribed channels information
   */
  subscriptions: GetSubscriptionsResponseItem[]
}

/**
 * User settings update event (personal settings change like notification preferences)
 * @see https://zulip.com/api/get-events#user_settings-update
 * @since Zulip 5.0 (feature level 89)
 */
export type UserSettingsUpdateEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_settings'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * Name of the changed setting
   */
  property: string
  /**
   * New value of the changed setting
   */
  value: boolean | number | string
  /**
   * Present only if the setting to be changed is `default_language`.
   * Contains the name of the new default language in English.
   */
  language_name?: string
}

/**
 * Realm user add event
 * @see https://zulip.com/api/get-events#realm_user-add
 */
export type RealmUserAddEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_user'
  /**
   * The operation of the event
   */
  op: 'add'
  /**
   * A dictionary containing basic data on the new Zulip user
   */
  person: GetUserByIdResponseUser
}

/**
 * Person in realm user remove event
 */
export type RealmUserRemoveEventPerson = {
  /**
   * The ID of the deactivated user
   */
  user_id: number
  /**
   * The full name of the user
   * @deprecated Will be removed in a future release
   */
  full_name?: string
}

/**
 * Realm user remove event
 * @see https://zulip.com/api/get-events#realm_user-remove
 */
export type RealmUserRemoveEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_user'
  /**
   * The operation of the event
   */
  op: 'remove'
  /**
   * Object containing details of the removed user
   */
  person: RealmUserRemoveEventPerson
}

/**
 * Remove subscription event
 * @see https://zulip.com/api/get-events#subscription-remove
 */
export type RemoveSubscriptionEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'subscription'
  /**
   * The operation of the event
   */
  op: 'remove'
  /**
   * A list of dictionaries describing the unsubscribed channels
   */
  subscriptions: { stream_id: number; name: string }[]
}

/**
 * Update subscription event
 * @see https://zulip.com/api/get-events#subscription-update
 */
export type UpdateSubscriptionEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'subscription'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * The ID of the channel whose subscription details have changed
   */
  stream_id: number
  /**
   * The property of the subscription which has changed
   */
  property: string
  /**
   * The new value of the changed property
   */
  value: boolean | number | string
}

/**
 * Subscription peer add event
 * @see https://zulip.com/api/get-events#subscription-peer_add
 */
export type SubscriptionPeerAddEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'subscription'
  /**
   * The operation of the event
   */
  op: 'peer_add'
  /**
   * The IDs of channels that have new or updated subscriber data
   * @since Zulip 4.0 (feature level 35)
   */
  stream_ids: number[]
  /**
   * The IDs of the users who are newly visible as subscribed to the specified channels
   * @since Zulip 4.0 (feature level 35)
   */
  user_ids: number[]
}

/**
 * Subscription peer remove event
 * @see https://zulip.com/api/get-events#subscription-peer_remove
 */
export type SubscriptionPeerRemoveEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'subscription'
  /**
   * The operation of the event
   */
  op: 'peer_remove'
  /**
   * The IDs of the channels from which the users have been unsubscribed
   * @since Zulip 4.0 (feature level 35)
   */
  stream_ids: number[]
  /**
   * The IDs of the users who have been unsubscribed
   * @since Zulip 4.0 (feature level 35)
   */
  user_ids: number[]
}

/**
 * Message event
 * @see https://zulip.com/api/get-events#message
 */
export type MessageEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'message'
  /**
   * The operation of the event
   */
  op: never
  /**
   * Object containing details of the message
   */
  message: GetMessagesResponseMessageItem
  /**
   * The user's message flags for the message
   */
  flags: MessageFlags[]
  /**
   * For clients supporting local echo.
   * The local ID of the message sent by the client.
   */
  local_message_id?: string
}

/**
 * Has zoom token event
 * @see https://zulip.com/api/get-events#has_zoom_token
 */
export type HasZoomTokenEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'has_zoom_token'
  /**
   * The operation of the event
   */
  op: never
  /**
   * Whether the user has a zoom token or not
   */
  value: boolean
}

/**
 * Invites changed event
 * @see https://zulip.com/api/get-events#invites_changed
 */
export type InvitesChangedEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'invites_changed'
  /**
   * The operation of the event
   */
  op: never
}

/**
 * Presence data for a single client (legacy format)
 */
export type EventPresenceClientItem = {
  /**
   * The client software of the user
   */
  client: string
  /**
   * The status of the user on this client
   */
  status: 'active' | 'idle'
  /**
   * The UNIX timestamp of when the presence was last updated
   */
  timestamp: number
  /**
   * Whether this client is a pushable client (e.g. a mobile device)
   */
  pushable: boolean
}

/**
 * Modern presence data for a user
 * @since Zulip 11.0 (feature level 419)
 */
export type EventPresenceModernItem = {
  /**
   * The UNIX timestamp of the last time the user was actively present
   */
  active_timestamp?: number
  /**
   * The UNIX timestamp of the last time the user was idle but present
   */
  idle_timestamp?: number
}

/**
 * Fields in presence event which supports simplified_presence_events
 */
type PresenceEventModern = {
  /**
   * Only present for clients supporting `simplified_presence_events`.
   * A dictionary mapping user IDs to modern presence data.
   * @since Zulip 11.0 (feature level 419)
   */
  presences: Record<string, EventPresenceModernItem>
  /**
   * Not present for clients supporting `simplified_presence_events`.
   * The ID of the user whose presence changed.
   */
  user_id: never
  /**
   * Not present for clients supporting `simplified_presence_events`.
   * The Zulip API email of the user whose presence changed.
   */
  email: never
  /**
   * Not present for clients supporting `simplified_presence_events`.
   * The UNIX timestamp of when the server processed the presence update.
   */
  server_timestamp: never
  /**
   * Not present for clients supporting `simplified_presence_events`.
   * A dictionary mapping client names to legacy presence data.
   */
  presence: never
}

/**
 * Fields in presence event which does not support simplified_presence_events
 */
type PresenceEventLegacy = {
  /**
   * Only present for clients supporting `simplified_presence_events`.
   * A dictionary mapping user IDs to modern presence data.
   * @since Zulip 11.0 (feature level 419)
   */
  presences: never
  /**
   * Not present for clients supporting `simplified_presence_events`.
   * The ID of the user whose presence changed.
   */
  user_id: number
  /**
   * Not present for clients supporting `simplified_presence_events`.
   * The Zulip API email of the user whose presence changed.
   */
  email: string
  /**
   * Not present for clients supporting `simplified_presence_events`.
   * The UNIX timestamp of when the server processed the presence update.
   */
  server_timestamp: number
  /**
   * Not present for clients supporting `simplified_presence_events`.
   * A dictionary mapping client names to legacy presence data.
   */
  presence: Record<string, EventPresenceClientItem>
}

/**
 * Presence event
 * @see https://zulip.com/api/get-events#presence
 */
export type PresenceEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'presence'
  /**
   * The operation of the event
   */
  op: never
} & (PresenceEventModern | PresenceEventLegacy)

/**
 * Stream create event
 * @see https://zulip.com/api/get-events#stream-create
 */
export type StreamCreateEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'stream'
  /**
   * The operation of the event
   */
  op: 'create'
  /**
   * Array of objects containing details about the newly added channels
   */
  streams: GetChannelsChannel[]
}

/**
 * Stream delete event
 * @see https://zulip.com/api/get-events#stream-delete
 */
export type StreamDeleteEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'stream'
  /**
   * The operation of the event
   */
  op: 'delete'
  /**
   * Array of objects containing IDs of the deleted channels
   * @deprecated Use `stream_ids` instead
   */
  streams?: { stream_id: number }[]
  /**
   * Array containing the IDs of the channels that were deleted
   * @since Zulip 10.0 (feature level 318)
   */
  stream_ids?: number[]
}

/**
 * Stream update event
 * @see https://zulip.com/api/get-events#stream-update
 */
export type StreamUpdateEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'stream'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * The ID of the channel whose details have changed
   */
  stream_id: number
  /**
   * The name of the channel
   */
  name: string
  /**
   * The property of the channel which has changed
   */
  property: string
  /**
   * The new value of the changed property
   */
  value: boolean | number | string | ChannelPermissionGroupObj | null
  /**
   * Only present if the changed property was `description`.
   * The short description of the channel rendered in HTML.
   */
  rendered_description?: string
  /**
   * Only present if the changed property was `invite_only`.
   * Whether the history of the channel is accessible to new subscribers.
   */
  history_public_to_subscribers?: boolean
  /**
   * Only present if the changed property was `invite_only`.
   * Whether the channel is web-public.
   * @since Zulip 5.0 (feature level 71)
   */
  is_web_public?: boolean
}

/**
 * User in reaction events
 * @deprecated From Zulip 3.0 (feature level 2), use user_id field instead
 */
export type EventReactionUser = {
  /**
   * Full name of the user
   */
  email: string
  /**
   * Zulip API email of the user
   */
  full_name: string
  /**
   * ID of the user
   */
  user_id: number
  /**
   * Whether the user is a mirror dummy
   */
  is_mirror_dummy: boolean
}

/**
 * Common fields for reaction events
 */
export type EventReactionCommon = {
  /**
   * Name of the emoji
   */
  emoji_name: string
  /**
   * A unique identifier for the emoji within the namespace of the reaction_type
   */
  emoji_code: string
  /**
   * A string indicating the type of emoji
   */
  reaction_type: EmojiTypes
  /**
   * The ID of the user who added or removed the reaction
   * @since Zulip 3.0 (feature level 2)
   */
  user_id: number
  /**
   * Dictionary with data on the user who added or removed the reaction
   * @deprecated From Zulip 3.0 (feature level 2), use `user_id` instead
   */
  user: EventReactionUser
  /**
   * The ID of the message to which the reaction relates
   */
  message_id: number
}

/**
 * Reaction add event
 * @see https://zulip.com/api/get-events#reaction-add
 */
export type ReactionAddEvent = EventItemCommon &
  EventReactionCommon & {
    /**
     * The event's type
     */
    type: 'reaction'
    /**
     * The operation of the event
     */
    op: 'add'
  }

/**
 * Reaction remove event
 * @see https://zulip.com/api/get-events#reaction-remove
 */
export type ReactionRemoveEvent = EventItemCommon &
  EventReactionCommon & {
    /**
     * The event's type
     */
    type: 'reaction'
    /**
     * The operation of the event
     */
    op: 'remove'
  }

/**
 * Attachment item for attachment event
 */
export type AttachmentEventAttachment = {
  /**
   * The ID for the attachment
   */
  id: number
  /**
   * Name of the uploaded file
   */
  name: string
  /**
   * A representation of the path of the file within the repository of user-uploaded files
   */
  path_id: string
  /**
   * Size of the file in bytes
   */
  size: number
  /**
   * Time when the attachment was uploaded as a UNIX timestamp
   */
  create_time: number
  /**
   * IDs of messages that reference this uploaded file
   * @since Zulip 12.0 (feature level 472)
   */
  message_ids: number[]
}

/**
 * Attachment add event
 * @see https://zulip.com/api/get-events#attachment-add
 */
export type AttachmentAddEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'attachment'
  /**
   * The operation of the event
   */
  op: 'add'
  /**
   * Details of the uploaded file
   */
  attachment: AttachmentEventAttachment
  /**
   * The total size of all files uploaded by users in the organization, in bytes
   */
  upload_space_used: number
}

/**
 * Attachment update event
 * @see https://zulip.com/api/get-events#attachment-update
 */
export type AttachmentUpdateEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'attachment'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * Details of the uploaded file
   */
  attachment: AttachmentEventAttachment
  /**
   * The total size of all files uploaded by users in the organization, in bytes
   */
  upload_space_used: number
}

/**
 * Attachment remove event
 * @see https://zulip.com/api/get-events#attachment-remove
 */
export type AttachmentRemoveEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'attachment'
  /**
   * The operation of the event
   */
  op: 'remove'
  /**
   * Dictionary containing the ID of the deleted attachment
   */
  attachment: { id: number }
  /**
   * The total size of all files uploaded by users in the organization, in bytes
   */
  upload_space_used: number
}

/**
 * Device add event
 * @see https://zulip.com/api/get-events#device-add
 * @since Zulip 12.0 (feature level 468)
 */
export type DeviceAddEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'device'
  /**
   * The operation of the event
   */
  op: 'add'
  /**
   * The ID of the new registered device
   */
  device_id: number
}

/**
 * Device remove event
 * @see https://zulip.com/api/get-events#device-remove
 * @since Zulip 12.0 (feature level 470)
 */
export type DeviceRemoveEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'device'
  /**
   * The operation of the event
   */
  op: 'remove'
  /**
   * The ID of the device which deregistered
   */
  device_id: number
}

/**
 * Device update event
 * @see https://zulip.com/api/get-events#device-update
 * @since Zulip 12.0 (feature level 468)
 */
export type DeviceUpdateEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'device'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * The ID of the registered device whose metadata changed
   */
  device_id: number
  /**
   * ID to reference the encryption key used to encrypt push notifications
   */
  push_key_id?: number
  /**
   * ID to reference the token provided by FCM/APNs to the device
   */
  push_token_id?: string | null
  /**
   * ID to reference the token whose registration is pending
   */
  pending_push_token_id?: string | null
  /**
   * The UNIX timestamp for the last time the pending token was updated
   */
  push_token_last_updated_timestamp?: number
  /**
   * If the push registration failed, a Zulip API error code
   */
  push_registration_error_code?: string | null
}

/**
 * Submessage event
 * @see https://zulip.com/api/get-events#submessage
 */
export type SubmessageEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'submessage'
  /**
   * The operation of the event
   */
  op: never
  /**
   * The type of the submessage
   */
  msg_type: string
  /**
   * The content of the submessage
   */
  content: string
  /**
   * The ID of the message to which the submessage has been added
   */
  message_id: number
  /**
   * The ID of the user who sent the submessage
   */
  sender_id: number
  /**
   * The ID of the submessage
   */
  submessage_id: number
}

/**
 * User status event
 * @see https://zulip.com/api/get-events#user_status
 */
export type UserStatusEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_status'
  /**
   * The operation of the event
   */
  op: never
  /**
   * The ID of the user whose status changed
   */
  user_id: number
  /**
   * Whether the user has marked themselves away
   * @deprecated From Zulip 6.0 (feature level 148), use presence event instead
   */
  away: boolean
  /**
   * The text content of the status message
   */
  status_text: string
  /**
   * The emoji name for the user's status
   * @since Zulip 5.0 (feature level 86)
   */
  emoji_name: string
  /**
   * The emoji code for the user's status
   * @since Zulip 5.0 (feature level 86)
   */
  emoji_code: string
  /**
   * The emoji type for the user's status
   * @since Zulip 5.0 (feature level 86)
   */
  reaction_type: EmojiTypes
}

/**
 * Custom profile fields event
 * @see https://zulip.com/api/get-events#custom_profile_fields
 */
export type CustomProfileFieldsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'custom_profile_fields'
  /**
   * The operation of the event
   */
  op: never
  /**
   * An array of dictionaries containing details of custom profile fields
   */
  fields: GetCustomProfileFieldsItem[]
}

/**
 * Default stream groups event
 * @see https://zulip.com/api/get-events#default_stream_groups
 */
export type DefaultStreamGroupsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'default_stream_groups'
  /**
   * The operation of the event
   */
  op: never
  /**
   * An array of dictionaries containing details about default channel groups
   */
  default_stream_groups: EventDefaultStreamGroupItem[]
}

/**
 * Default streams event
 * @see https://zulip.com/api/get-events#default_streams
 */
export type DefaultStreamsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'default_streams'
  /**
   * The operation of the event
   */
  op: never
  /**
   * An array of IDs of all the default channels
   */
  default_streams: number[]
}

/**
 * Fields for delete_message event which supports bulk_message_deletion
 */
type DeleteMessageEventBulk = {
  /**
   * Only present for clients supporting `bulk_message_deletion`.
   * The IDs of the deleted messages.
   */
  message_ids: number[]
  /**
   * Only present for clients not supporting `bulk_message_deletion`.
   * The ID of the deleted message.
   */
  message_id: never
}

/**
 * Fields for delete_message event which does not support bulk_message_deletion
 */
type DeleteMessageEventSingle = {
  /**
   * Only present for clients supporting `bulk_message_deletion`.
   * The IDs of the deleted messages.
   */
  message_ids: never
  /**
   * Only present for clients not supporting `bulk_message_deletion`.
   * The ID of the deleted message.
   */
  message_id: number
}

/**
 * Fields for delete_message event for channel message
 */
type DeleteMessageEventStream = {
  /**
   * The type of the deleted message
   */
  message_type: 'stream'
  /**
   * Only present if `message_type` is `"stream"`.
   * The ID of the channel to which the message was sent.
   */
  stream_id: number
  /**
   * Only present if `message_type` is `"stream"`.
   * The topic to which the message was sent.
   */
  topic: string
}

/**
 * Fields for delete_message event for private message
 */
type DeleteMessageEventPrivate = {
  /**
   * The type of the deleted message
   */
  message_type: 'private'
  /**
   * Only present if `message_type` is `"stream"`.
   * The ID of the channel to which the message was sent.
   */
  stream_id: never
  /**
   * Only present if `message_type` is `"stream"`.
   * The topic to which the message was sent.
   */
  topic: never
}

/**
 * Delete message event
 * @see https://zulip.com/api/get-events#delete_message
 */
export type DeleteMessageEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'delete_message'
  /**
   * The operation of the event
   */
  op: never
} & (DeleteMessageEventBulk | DeleteMessageEventSingle) &
  (DeleteMessageEventStream | DeleteMessageEventPrivate)

/**
 * Muted topics event
 * @deprecated From Zulip 6.0 (feature level 134), use user_topic event instead
 * @see https://zulip.com/api/get-events#muted_topics
 */
export type MutedTopicsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'muted_topics'
  /**
   * The operation of the event
   */
  op: never
  /**
   * Array of tuples [stream_name, topic_name, timestamp] describing muted topics
   */
  muted_topics: [string, string, number][]
}

/**
 * User topic event
 * @see https://zulip.com/api/get-events#user_topic
 * @since Zulip 6.0 (feature level 134)
 */
export type UserTopicEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_topic'
  /**
   * The operation of the event
   */
  op: never
  /**
   * The ID of the channel to which the topic belongs
   */
  stream_id: number
  /**
   * The name of the topic
   */
  topic_name: string
  /**
   * A UNIX timestamp for when the user-topic relationship was last changed
   */
  last_updated: number
  /**
   * An integer indicating the user's visibility preferences for the topic
   */
  visibility_policy: TopicVisibilityValues
}

/**
 * Muted users event
 * @see https://zulip.com/api/get-events#muted_users
 * @since Zulip 4.0 (feature level 48)
 */
export type MutedUsersEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'muted_users'
  /**
   * The operation of the event
   */
  op: never
  /**
   * A list of dictionaries describing muted users
   */
  muted_users: EventMutedUserItem[]
}

/**
 * Heartbeat event
 * @see https://zulip.com/api/get-events#heartbeat
 */
export type HeartbeatEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'heartbeat'
  /**
   * The operation of the event
   */
  op: never
}

/**
 * Onboarding steps event
 * @see https://zulip.com/api/get-events#onboarding_steps
 * @since Zulip 8.0 (feature level 233)
 */
export type OnboardingStepsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'onboarding_steps'
  /**
   * The operation of the event
   */
  op: never
  /**
   * An array of dictionaries containing details about onboarding steps
   */
  onboarding_steps: EventOnboardingStepItem[]
}

/**
 * Topic link item in update_message event
 */
export type EventTopicLinkItem = {
  /**
   * The original link text
   */
  text: string
  /**
   * The link URL
   */
  url: string
}

/**
 * Update message event
 * @see https://zulip.com/api/get-events#update_message
 */
export type UpdateMessageEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'update_message'
  /**
   * The operation of the event
   */
  op: never
  /**
   * The ID of the user who edited the message. null for rendering-only updates.
   */
  user_id: number | null
  /**
   * Whether the event only updates the rendered content of the message
   * @since Zulip 5.0 (feature level 114)
   */
  rendering_only: boolean
  /**
   * The ID of the message which was edited or updated
   */
  message_id: number
  /**
   * A sorted list of IDs of messages to which any channel or topic changes apply
   */
  message_ids: number[]
  /**
   * The user's personal message flags for the message with ID `message_id`
   */
  flags: MessageFlags[]
  /**
   * The UNIX timestamp when this message edit was processed
   */
  edit_timestamp: number
  /**
   * Only present if the message was originally sent to a channel.
   * The name of the channel.
   */
  stream_name?: string
  /**
   * Only present if the message was originally sent to a channel.
   * The pre-edit channel ID.
   */
  stream_id?: number
  /**
   * Only present if message(s) were moved to a different channel.
   * The post-edit channel ID.
   */
  new_stream_id?: number
  /**
   * Only present if this event moved messages to a different topic and/or channel.
   */
  propagate_mode?: 'change_one' | 'change_later' | 'change_all'
  /**
   * Only present if this event moved messages to a different topic.
   * The original topic name.
   */
  orig_subject?: string
  /**
   * Only present if this event moved messages to a different topic.
   * The new topic name.
   */
  subject?: string
  /**
   * Only present if this event moved messages to a different topic.
   * Links in the new topic.
   */
  topic_links?: EventTopicLinkItem[]
  /**
   * Only present if this event changed the message content.
   * The original content in Zulip-flavored Markdown.
   */
  orig_content?: string
  /**
   * Only present if this event changed the message content.
   * The original content rendered as HTML.
   */
  orig_rendered_content?: string
  /**
   * Only present if this event changed the message content or updated rendering.
   * The new content of the message.
   */
  content?: string
  /**
   * Only present if this event changed the message content or updated rendering.
   * The new content rendered as HTML.
   */
  rendered_content?: string
  /**
   * Only present if this event changed the message content.
   * Whether the message starts with `/me`.
   */
  is_me_message?: boolean
}

/**
 * Typing user item
 */
export type EventTypingUserItem = {
  /**
   * The user's ID
   */
  user_id: number
  /**
   * The Zulip API email address for the user
   */
  email: string
}

/**
 * Fields for typing event for direct message
 */
type TypingEventDirect = {
  /**
   * Type of message being composed: `"stream"` or `"direct"`
   * @since Zulip 4.0 (feature level 58)
   */
  message_type: 'direct'
  /**
   * Only present if `message_type` is `"direct"`.
   * Array of dictionaries describing the recipients.
   */
  recipients: EventTypingUserItem[]
  /**
   * Only present if `message_type` is `"stream"`.
   * @since Zulip 4.0 (feature level 58)
   */
  stream_id: never
  /**
   * Only present if `message_type` is `"stream"`.
   * @since Zulip 4.0 (feature level 58)
   */
  topic: never
}

/**
 * Fields for typing event for channel message
 */
type TypingEventStream = {
  /**
   * Type of message being composed: `"stream"` or `"direct"`
   * @since Zulip 4.0 (feature level 58)
   */
  message_type: 'stream'
  /**
   * Only present if `message_type` is `"direct"`.
   * Array of dictionaries describing the recipients.
   */
  recipients: never
  /**
   * Only present if `message_type` is `"stream"`.
   * @since Zulip 4.0 (feature level 58)
   */
  stream_id: number
  /**
   * Only present if `message_type` is `"stream"`.
   * @since Zulip 4.0 (feature level 58)
   */
  topic: string
}

/**
 * Typing start event
 * @see https://zulip.com/api/get-events#typing-start
 */
export type TypingStartEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'typing'
  /**
   * The operation of the event
   */
  op: 'start'
  /**
   * Object describing the user who is typing the message
   */
  sender: EventTypingUserItem
} & (TypingEventDirect | TypingEventStream)

/**
 * Typing stop event
 * @see https://zulip.com/api/get-events#typing-stop
 */
export type TypingStopEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'typing'
  /**
   * The operation of the event
   */
  op: 'stop'
  /**
   * Object describing the user who was typing the message
   */
  sender: EventTypingUserItem
} & (TypingEventDirect | TypingEventStream)

/**
 * Recipient info for edit message typing events for channel message
 */
type EventTypingEditMessageRecipientStream = {
  /**
   * The type of message: `"stream"` or `"direct"`
   */
  type: 'stream'
  /**
   * Only present for stream messages. The channel ID.
   */
  stream_id: number
  /**
   * Only present for stream messages. The topic name.
   */
  topic: string
  /**
   * Only present for direct messages. The user IDs of the recipients.
   */
  user_ids: never
}

/**
 * Recipient info for edit message typing events for direct message
 */
type EventTypingEditMessageRecipientDirect = {
  /**
   * The type of message: `"stream"` or `"direct"`
   */
  type: 'direct'
  /**
   * Only present for stream messages. The channel ID.
   */
  stream_id: never
  /**
   * Only present for stream messages. The topic name.
   */
  topic: never
  /**
   * Only present for direct messages. The user IDs of the recipients.
   */
  user_ids: number[]
}

/**
 * Recipient info for edit message typing events
 */
export type EventTypingEditMessageRecipient =
  | EventTypingEditMessageRecipientStream
  | EventTypingEditMessageRecipientDirect

/**
 * Typing edit message start event
 * @see https://zulip.com/api/get-events#typing_edit_message-start
 * @since Zulip 10.0 (feature level 351)
 */
export type TypingEditMessageStartEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'typing_edit_message'
  /**
   * The operation of the event
   */
  op: 'start'
  /**
   * The ID of the user who is typing the edit of the message
   */
  sender_id: number
  /**
   * The ID of the message being edited
   */
  message_id: number
  /**
   * Object containing details about recipients of message edit typing notification
   */
  recipient: EventTypingEditMessageRecipient
}

/**
 * Typing edit message stop event
 * @see https://zulip.com/api/get-events#typing_edit_message-stop
 * @since Zulip 10.0 (feature level 351)
 */
export type TypingEditMessageStopEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'typing_edit_message'
  /**
   * The operation of the event
   */
  op: 'stop'
  /**
   * The ID of the user who sent the message
   */
  sender_id: number
  /**
   * The ID of the message that was being edited
   */
  message_id: number
  /**
   * Object containing details about recipients of message edit typing notification
   */
  recipient: EventTypingEditMessageRecipient
}

/**
 * Update message flags add event
 * @see https://zulip.com/api/get-events#update_message_flags-add
 */
export type UpdateMessageFlagsAddEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'update_message_flags'
  /**
   * The operation of the event
   */
  op: 'add'
  /**
   * Old name for the `op` field
   * @deprecated From Zulip 4.0 (feature level 32), use op field instead
   */
  operation: 'add'
  /**
   * The message flag that was added
   */
  flag: MessageFlags
  /**
   * IDs of all messages to which the flag was added
   */
  messages: number[]
  /**
   * Whether the specified flag was added to all messages
   */
  all: boolean
}

/**
 * Message details in update_message_flags remove event for private message
 */
type EventUpdateMessageFlagsRemoveMessageDetailPrivate = {
  /**
   * The type of this message. Either "stream" or "private".
   */
  type: 'private'
  /**
   * Present only if type is private.
   * The user IDs of every recipient of this direct message, excluding yourself.
   */
  user_ids: number[]
  /**
   * Present only if type is "stream".
   * The ID of the channel where the message was sent.
   */
  stream_id: never
  /**
   * Present only if type is "stream".
   * Name of the topic where the message was sent.
   */
  topic: never
}

/**
 * Message details in update_message_flags remove event for channel message
 */
type EventUpdateMessageFlagsRemoveMessageDetailStream = {
  /**
   * The type of this message. Either "stream" or "private".
   */
  type: 'stream'
  /**
   * Present only if type is private.
   * The user IDs of every recipient of this direct message, excluding yourself.
   */
  user_ids: never
  /**
   * Present only if type is "stream".
   * The ID of the channel where the message was sent.
   */
  stream_id: number
  /**
   * Present only if type is "stream".
   * Name of the topic where the message was sent.
   */
  topic: string
}

/**
 * Message details in update_message_flags remove event
 */
export type EventUpdateMessageFlagsRemoveMessageDetail = {
  /**
   * A flag which indicates whether the message contains a mention of the user.
   * Present only if the message mentions the current user.
   */
  mentioned?: boolean
  /**
   * @deprecated
   */
  unmuted_stream_msg: boolean
} & (
  | EventUpdateMessageFlagsRemoveMessageDetailPrivate
  | EventUpdateMessageFlagsRemoveMessageDetailStream
)

/**
 * Fields for update_message_flags remove event for read flag
 */
type UpdateMessageFlagRemoveEventRead = {
  /**
   * The message flag to be removed
   */
  flag: 'read'
  /**
   * Only present if the specified `flag` is `"read"`.
   * A set of data structures describing the messages.
   */
  message_details: Record<string, EventUpdateMessageFlagsRemoveMessageDetail>
}

/**
 * Fields for update_message_flags remove event for other than read flag
 */
type UpdateMessageFlagRemoveEventNotRead = {
  /**
   * The message flag to be removed
   */
  flag: Exclude<MessageFlags, 'read'>
  /**
   * Only present if the specified `flag` is `"read"`.
   * A set of data structures describing the messages.
   */
  message_details: never
}

/**
 * Update message flags remove event
 * @see https://zulip.com/api/get-events#update_message_flags-remove
 */
export type UpdateMessageFlagsRemoveEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'update_message_flags'
  /**
   * The operation of the event
   */
  op: 'remove'
  /**
   * Old name for the `op` field
   * @deprecated From Zulip 4.0 (feature level 32), use op field instead
   */
  operation: 'remove'
  /**
   * Array containing the IDs of the messages from which the flag was removed
   */
  messages: number[]
  /**
   * Will be false for all specified flags
   * @deprecated
   */
  all: false
} & (UpdateMessageFlagRemoveEventRead | UpdateMessageFlagRemoveEventNotRead)

/**
 * User group permission group value type
 */
export type EventUserGroupPermissionGroup = number | ChannelPermissionGroupObj

/**
 * User group add event
 * @see https://zulip.com/api/get-events#user_group-add
 */
export type UserGroupAddEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_group'
  /**
   * The operation of the event
   */
  op: 'add'
  /**
   * Object containing the user group's attributes
   */
  group: GetUserGroupsResponseGroup
}

/**
 * Data for user group update event
 */
export type UserGroupUpdateEventData = {
  /**
   * The new name of the user group. Only present if the group's name changed
   */
  name?: string
  /**
   * The new description of the group. Only present if the description changed
   */
  description?: string
  /**
   * Users who have permission to add members to this group. Only present if
   * this user group permission setting changed
   * @since Zulip 10.0 (feature level 305)
   */
  can_add_members_group?: EventUserGroupPermissionGroup
  /**
   * Users who have permission to join this group. Only present if
   * this user group permission setting changed
   * @since Zulip 10.0 (feature level 301)
   */
  can_join_group?: EventUserGroupPermissionGroup
  /**
   * Users who have permission to leave this group. Only present if
   * this user group permission setting changed
   * @since Zulip 10.0 (feature level 308)
   */
  can_leave_group?: EventUserGroupPermissionGroup
  /**
   * Users who have permission to manage this group. Only present if
   * this user group permission setting changed
   * @since Zulip 10.0 (feature level 283)
   */
  can_manage_group?: EventUserGroupPermissionGroup
  /**
   * Users who have permission to mention this user group. Only present if
   * this user group permission setting changed
   * @since Zulip 8.0 (feature level 191)
   */
  can_mention_group?: EventUserGroupPermissionGroup
  /**
   * Users who have permission to remove members from this group. Only present if
   * this user group permission setting changed
   * @since Zulip 10.0 (feature level 324)
   */
  can_remove_members_group?: EventUserGroupPermissionGroup
  /**
   * Whether the user group is deactivated
   * @since Zulip 10.0 (feature level 290)
   */
  deactivated?: boolean
}

/**
 * User group update event
 * @see https://zulip.com/api/get-events#user_group-update
 */
export type UserGroupUpdateEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_group'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * The ID of the user group whose details have changed
   */
  group_id: number
  /**
   * Dictionary containing the changed details of the user group
   */
  data: UserGroupUpdateEventData
}

/**
 * User group add members event
 * @see https://zulip.com/api/get-events#user_group-add_members
 */
export type UserGroupAddMembersEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_group'
  /**
   * The operation of the event
   */
  op: 'add_members'
  /**
   * The ID of the user group with new members
   */
  group_id: number
  /**
   * Array containing the IDs of the users who have been added to the group
   */
  user_ids: number[]
}

/**
 * User group remove members event
 * @see https://zulip.com/api/get-events#user_group-remove_members
 */
export type UserGroupRemoveMembersEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_group'
  /**
   * The operation of the event
   */
  op: 'remove_members'
  /**
   * The ID of the user group whose details have changed
   */
  group_id: number
  /**
   * Array containing the IDs of the users who have been removed from the group
   */
  user_ids: number[]
}

/**
 * User group add subgroups event
 * @see https://zulip.com/api/get-events#user_group-add_subgroups
 * @since Zulip 6.0 (feature level 127)
 */
export type UserGroupAddSubgroupsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_group'
  /**
   * The operation of the event
   */
  op: 'add_subgroups'
  /**
   * The ID of the user group whose details have changed
   */
  group_id: number
  /**
   * IDs of the subgroups that have been added
   */
  direct_subgroup_ids: number[]
}

/**
 * User group remove subgroups event
 * @see https://zulip.com/api/get-events#user_group-remove_subgroups
 * @since Zulip 6.0 (feature level 127)
 */
export type UserGroupRemoveSubgroupsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_group'
  /**
   * The operation of the event
   */
  op: 'remove_subgroups'
  /**
   * The ID of the user group whose details have changed
   */
  group_id: number
  /**
   * IDs of the subgroups that have been removed
   */
  direct_subgroup_ids: number[]
}

/**
 * User group remove event
 * @see https://zulip.com/api/get-events#user_group-remove
 */
export type UserGroupRemoveEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_group'
  /**
   * The operation of the event
   */
  op: 'remove'
  /**
   * The ID of the group which has been deleted
   */
  group_id: number
}

/**
 * Realm linkifiers event
 * @see https://zulip.com/api/get-events#realm_linkifiers
 * @since Zulip 4.0 (feature level 54)
 */
export type RealmLinkifiersEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_linkifiers'
  /**
   * The operation of the event
   */
  op: never
  /**
   * An ordered array of dictionaries containing details about linkifiers
   */
  realm_linkifiers: GetLinkifiersItem[]
}

/**
 * Realm filters event (legacy, no longer sent to clients)
 * @see https://zulip.com/api/get-events#realm_filters
 * @deprecated Use `realm_linkifiers` instead
 */
export type RealmFiltersEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_filters'
  /**
   * The operation of the event
   */
  op: never
  /**
   * An array of tuples [pattern, url_format, id]
   */
  realm_filters: [string, string, number][]
}

/**
 * Realm playgrounds event
 * @see https://zulip.com/api/get-events#realm_playgrounds
 */
export type RealmPlaygroundsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_playgrounds'
  /**
   * The operation of the event
   */
  op: never
  /**
   * Data about code playgrounds
   */
  realm_playgrounds: EventPlaygroundItem[]
}

/**
 * Realm emoji update event
 * @see https://zulip.com/api/get-events#realm_emoji-update
 */
export type RealmEmojiUpdateEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_emoji'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * An object in which each key is an emoji ID and the value describes the emoji
   */
  realm_emoji: Record<string, GetEmojisResponseItem>
}

/**
 * Realm domains add event
 * @see https://zulip.com/api/get-events#realm_domains-add
 */
export type RealmDomainsAddEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_domains'
  /**
   * The operation of the event
   */
  op: 'add'
  /**
   * Details of the newly added domain
   */
  realm_domain: EventRealmDomainItem
}

/**
 * Realm domains change event
 * @see https://zulip.com/api/get-events#realm_domains-change
 */
export type RealmDomainsChangeEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_domains'
  /**
   * The operation of the event
   */
  op: 'change'
  /**
   * Object containing details of the edited domain
   */
  realm_domain: EventRealmDomainItem
}

/**
 * Realm domains remove event
 * @see https://zulip.com/api/get-events#realm_domains-remove
 */
export type RealmDomainsRemoveEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_domains'
  /**
   * The operation of the event
   */
  op: 'remove'
  /**
   * The domain that was removed
   */
  domain: string
}

/**
 * Realm export event
 * @see https://zulip.com/api/get-events#realm_export
 */
export type RealmExportEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_export'
  /**
   * The operation of the event
   */
  op: never
  /**
   * An array of dictionaries containing details about data exports
   */
  exports: GetExportsResponseItem[]
}

/**
 * Realm export consent event
 * @since Zulip 10.0 (feature level 312)
 * @see https://zulip.com/api/get-events#realm_export_consent
 */
export type RealmExportConsentEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_export_consent'
  /**
   * The operation of the event
   */
  op: never
  /**
   * The ID of the user whose setting was changed
   */
  user_id: number
  /**
   * Whether the user has consented for their private data export
   */
  consented: boolean
}

/**
 * Realm bot add event
 * @see https://zulip.com/api/get-events#realm_bot-add
 */
export type RealmBotAddEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_bot'
  /**
   * The operation of the event
   */
  op: 'add'
  /**
   * Object containing details of the bot
   */
  bot: EventRealmBotItem
}

/**
 * Realm bot update event
 * @see https://zulip.com/api/get-events#realm_bot-update
 */
export type RealmBotUpdateEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_bot'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * Object containing the user ID of the bot and the changed property
   */
  bot: Partial<EventRealmBotItem> & { user_id: number }
}

/**
 * Removed bot for realm bot remove event
 */
export type RealmBotRemoveEventRemovedBot = {
  /**
   * The user ID of the deactivated bot
   */
  user_id: number
  /**
   * The full name of the deactivated bot
   */
  full_name: string
}

/**
 * Realm bot remove event (legacy)
 * @see https://zulip.com/api/get-events#realm_bot-remove
 * @deprecated From Zulip 8.0 (feature level 222), use delete op instead
 */
export type RealmBotRemoveEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_bot'
  /**
   * The operation of the event
   */
  op: 'remove'
  /**
   * Object containing details about the deactivated bot
   */
  bot: RealmBotRemoveEventRemovedBot
}

/**
 * Realm bot delete event
 * @see https://zulip.com/api/get-events#realm_bot-delete
 */
export type RealmBotDeleteEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm_bot'
  /**
   * The operation of the event
   */
  op: 'delete'
  /**
   * Object containing details about the deactivated bot user ID
   */
  bot: { user_id: number }
}

/**
 * Realm update event (single organization setting change)
 * @see https://zulip.com/api/get-events#realm-update
 */
export type RealmUpdateEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * The name of the property that was changed
   */
  property: string
  /**
   * The new value of the property
   */
  value: boolean | number | string | null
}

/**
 * Realm deactivated event
 * @see https://zulip.com/api/get-events#realm-deactivated
 */
export type RealmDeactivatedEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm'
  /**
   * The operation of the event
   */
  op: 'deactivated'
  /**
   * The ID of the deactivated realm
   */
  realm_id: number
}

/**
 * Restart event
 * @see https://zulip.com/api/get-events#restart
 */
export type RestartEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'restart'
  /**
   * The operation of the event
   */
  op: never
  /**
   * The Zulip version number
   * @since Zulip 4.0 (feature level 59)
   */
  zulip_version: string
  /**
   * The Zulip merge base number
   * @since Zulip 5.0 (feature level 88)
   */
  zulip_merge_base: string
  /**
   * The Zulip feature level of the server after the restart
   * @since Zulip 4.0 (feature level 59)
   */
  zulip_feature_level: number
  /**
   * The UNIX timestamp at which the server started
   */
  server_generation: number
}

/**
 * Web reload client event
 * @see https://zulip.com/api/get-events#web_reload_client
 */
export type WebReloadClientEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'web_reload_client'
  /**
   * The operation of the event
   */
  op: never
  /**
   * Whether the client should fetch a new event queue immediately
   */
  immediate: boolean
}

/**
 * Authentication method object in realm/update_dict event data
 * @see https://zulip.com/api/get-events#realm-update_dict
 */
export type RealmUpdateDictAuthMethod = {
  /** Whether the authentication method is enabled */
  enabled: boolean
  /** Whether the authentication method is available for use */
  available: boolean
  /** Reason why the authentication method is unavailable (only present when available is false) */
  unavailable_reason?: string
}

/**
 * Data object in realm/update_dict event containing the changed organization settings.
 * All properties are optional — only those that have changed are included.
 * @see https://zulip.com/api/get-events#realm-update_dict
 */
export type RealmUpdateDictData = {
  /** Whether this organization allows editing the content of messages */
  allow_message_editing?: boolean
  /** Dictionary of authentication method names mapped to their enabled/available state */
  authentication_methods?: Record<string, RealmUpdateDictAuthMethod>
  /** Users who are allowed to access all users in the organization */
  can_access_all_users_group?: EventUserGroupPermissionGroup
  /** Users who have permission to add custom emoji */
  can_add_custom_emoji_group?: EventUserGroupPermissionGroup
  /** Users who have permission to add subscribers to channels */
  can_add_subscribers_group?: EventUserGroupPermissionGroup
  /** Users who have permission to create all types of bot users */
  can_create_bots_group?: EventUserGroupPermissionGroup
  /** Users who have permission to create private channels */
  can_create_private_channel_group?: EventUserGroupPermissionGroup
  /** Users who have permission to create public channels */
  can_create_public_channel_group?: EventUserGroupPermissionGroup
  /** Users who have permission to create user groups */
  can_create_groups?: EventUserGroupPermissionGroup
  /** Users who have permission to create web-public channels */
  can_create_web_public_channel_group?: EventUserGroupPermissionGroup
  /** Users who have permission to create bot users that can only send messages */
  can_create_write_only_bots_group?: EventUserGroupPermissionGroup
  /** Users who have permission to delete any message */
  can_delete_any_message_group?: EventUserGroupPermissionGroup
  /** Users who have permission to delete messages that they sent */
  can_delete_own_message_group?: EventUserGroupPermissionGroup
  /** Users who have permission to invite users via email */
  can_invite_users_group?: EventUserGroupPermissionGroup
  /** Users who have permission to administer all existing groups */
  can_manage_all_groups?: EventUserGroupPermissionGroup
  /** Users who have permission to manage plans and billing */
  can_manage_billing_group?: EventUserGroupPermissionGroup
  /** Users who have permission to use wildcard mentions in large channels */
  can_mention_many_users_group?: EventUserGroupPermissionGroup
  /** Users who have permission to move messages between channels */
  can_move_messages_between_channels_group?: EventUserGroupPermissionGroup
  /** Users who have permission to move messages between topics */
  can_move_messages_between_topics_group?: EventUserGroupPermissionGroup
  /** Users who have permission to resolve topics */
  can_resolve_topics_group?: EventUserGroupPermissionGroup
  /** Users who have permission to change per-channel can_delete_any_message_group/can_delete_own_message_group */
  can_set_delete_message_policy_group?: EventUserGroupPermissionGroup
  /** Users who have permission to change per-channel topics_policy setting */
  can_set_topics_policy_group?: EventUserGroupPermissionGroup
  /** Users who are allowed to use AI summarization */
  can_summarize_topics_group?: EventUserGroupPermissionGroup
  /** Users who are allowed to create reusable invitation links */
  create_multiuse_invite_group?: EventUserGroupPermissionGroup
  /**
   * The avatar data source type for new users
   * - G - Hosted by Gravatar
   * - J - Generated using Jdenticon
   */
  default_avatar_source?: 'G' | 'J'
  /** The default programming language for code blocks */
  default_code_block_language?: string
  /** The organization language for automated messages and invitation emails */
  default_language?: string
  /** The description of the organization */
  description?: string
  /** Whether the organization has enabled weekly digest emails */
  digest_emails_enabled?: boolean
  /** The day of the week the digest email is sent (0=Monday...6=Sunday) */
  digest_weekday?: RealmDigestWeekdayValues
  /** Users who are allowed to initiate direct messages */
  direct_message_initiator_group?: EventUserGroupPermissionGroup
  /** Users who have permission to send direct messages */
  direct_message_permission_group?: EventUserGroupPermissionGroup
  /** Whether the organization disallows disposable email addresses */
  disallow_disposable_email_addresses?: boolean
  /** Whether the organization disallows users to change their email address */
  email_changes_disabled?: boolean
  /** Whether this organization restricts access to email addresses to realm domains */
  emails_restricted_to_domains?: boolean
  /** Whether clients should show a warning when composing a DM to a guest user */
  enable_guest_user_dm_warning?: boolean
  /** Whether clients should display "(guest)" after guest user names */
  enable_guest_user_indicator?: boolean
  /** Whether the organization has enabled spectator access */
  enable_spectator_access?: boolean
  /** Whether the organization has enabled Zulip's read receipts feature */
  enable_read_receipts?: boolean
  /** The organization's configured GIF rating policy */
  gif_rating_policy?: number
  /**
   * The source of the organization's icon
   * - G - Default Zulip icon
   * - U - Uploaded by an administrator
   */
  icon_source?: 'G' | 'U'
  /** The URL of the organization's icon */
  icon_url?: string
  /** Whether this organization has been configured to enable previews of linked images */
  inline_image_preview?: boolean
  /** Whether this organization has been configured to enable previews of linked websites */
  inline_url_embed_preview?: boolean
  /** Whether an invitation is required to join this organization */
  invite_required?: boolean
  /** The URL of the Jitsi server for video calls */
  jitsi_server_url?: string | null
  /**
   * The source of the organization's wide logo
   * - D - Default Zulip logo
   * - U - Uploaded by an administrator
   */
  logo_source?: 'D' | 'U'
  /** The URL of the organization's wide logo */
  logo_url?: string
  /**
   * @deprecated From Zulip 11.0 (feature level 392), use topics_policy instead
   */
  mandatory_topics?: boolean
  /** The maximum file size allowed for file uploads */
  max_file_upload_size_mib?: number
  /** Whether message content is included in missed-message emails */
  message_content_allowed_in_email_notifications?: boolean
  /** The maximum age in seconds of messages that can be deleted (null = no limit) */
  message_content_delete_limit_seconds?: number | null
  /** The maximum age in seconds of messages that can be edited (null = no limit) */
  message_content_edit_limit_seconds?: number | null
  /**
   * Visibility setting for message edit history
   * - all - All users can see edit history
   * - moves - Only message moves are shown
   * - none - Edit history is disabled
   */
  message_edit_history_visibility_policy?: 'all' | 'moves' | 'none'
  /** The ID of the private channel for moderation request messages (-1 = disabled) */
  moderation_request_channel_id?: number
  /** Time limit in seconds for moving messages between channels (null = no limit) */
  move_messages_between_streams_limit_seconds?: number | null
  /** Time limit in seconds for moving messages within a channel (null = no limit) */
  move_messages_within_stream_limit_seconds?: number | null
  /** The name of the organization */
  name?: string
  /** Whether the organization disallows users to change their name */
  name_changes_disabled?: boolean
  /** The ID of the channel for new channel announcements (-1 = disabled) */
  new_stream_announcements_stream_id?: number
  /**
   * The source of the organization's dark-theme wide logo
   * - D - Default Zulip logo
   * - U - Uploaded by an administrator
   */
  night_logo_source?: 'D' | 'U'
  /** The URL of the organization's dark-theme wide logo */
  night_logo_url?: string
  /** The organization type */
  org_type?: RealmTypeValues
  /** The plan type of the organization */
  plan_type?: RealmPlanTypeValues
  /** Whether online presence of other users is hidden */
  presence_disabled?: boolean
  /** Whether push notifications are enabled */
  push_notifications_enabled?: boolean
  /** UNIX timestamp when push notifications access is expected to end (null = no end) */
  push_notifications_enabled_end_timestamp?: number | null
  /** The rendered HTML description of the organization */
  rendered_description?: string
  /** Whether the organization requires end-to-end encrypted push notifications */
  require_e2ee_push_notifications?: boolean
  /** Whether the organization requires unique names for users */
  require_unique_names?: boolean
  /** Whether the organization sends automated messages to channels on channel events */
  send_channel_events_messages?: boolean
  /** Whether the organization sends welcome emails to new users */
  send_welcome_emails?: boolean
  /** The ID of the channel for signup announcements (-1 = disabled) */
  signup_announcements_stream_id?: number
  /**
   * Default policy for sending channel messages to the empty topic
   * - allow_empty_topic - Channel messages can be sent to the empty topic
   * - disable_empty_topic - Channel messages cannot be sent to the empty topic
   */
  topics_policy?: 'allow_empty_topic' | 'disable_empty_topic'
  /** The total quota for uploaded files in this organization (null = no limit) */
  upload_quota_mib?: number | null
  /** The video chat provider for the organization */
  video_chat_provider?: VideoChatProviderValues
  /** The waiting period before new members can send certain types of messages */
  waiting_period_threshold?: number
  /** Whether the organization wants to be listed in the Zulip communities directory */
  want_advertise_in_communities_directory?: boolean
  /** The custom welcome message for Welcome Bot */
  welcome_message_custom_text?: string
  /** Users with admin-equivalent access for workplace management */
  workplace_users_group?: EventUserGroupPermissionGroup
  /** The ID of the channel for Zulip update announcements (-1 = disabled) */
  zulip_update_announcements_stream_id?: number
  /**
   * @deprecated From Zulip 9.0 (feature level 264), use can_create_public_channel_group
   */
  create_public_stream_policy?: CreateStreamPolicyValues
  /**
   * @deprecated From Zulip 9.0 (feature level 266), use can_create_private_channel_group
   */
  create_private_stream_policy?: CreateStreamPolicyValues
  /**
   * @deprecated From Zulip 10.0 (feature level 280), use can_create_web_public_channel_group
   */
  create_web_public_stream_policy?: CreateWebPublicStreamPolicyValues
  /**
   * @deprecated From Zulip 10.0 (feature level 352), use can_mention_many_users_group
   */
  wildcard_mention_policy?: WildcardMentionPolicyValues
  /**
   * The organization's policy for the size of image and video thumbnails
   * - 100 - 100% height (the default)
   * - 150 - 150% height
   * - 200 - 200% height
   */
  media_preview_size?: MediaPreviewSizeSettingValues
  /** Whether users can change their own avatar */
  avatar_changes_disabled?: boolean
}

/**
 * Realm update dict event (multiple organization settings change)
 * @see https://zulip.com/api/get-events#realm-update_dict
 */
export type RealmUpdateDictEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'realm'
  /**
   * The operation of the event
   */
  op: 'update_dict'
  /**
   * Always `"default"`. Present for backwards-compatibility.
   * @deprecated
   */
  property: 'default'
  /**
   * An object containing the properties that have changed.
   * Only the settings that were modified are included.
   */
  data: RealmUpdateDictData
}

/**
 * Realm user settings defaults update event
 * @see https://zulip.com/api/get-events#realm_user_settings_defaults-update
 */
export type RealmUserSettingsDefaultsUpdateEvent = EventItemCommon & {
  type: 'realm_user_settings_defaults'
  op: 'update'
  /**
   * The name of the property that was changed
   */
  property: string
  /**
   * The new value of the property
   */
  value: boolean | number | string
}

/**
 * Drafts add event
 * @see https://zulip.com/api/get-events#drafts-add
 */
export type DraftsAddEvent = EventItemCommon & {
  type: 'drafts'
  op: 'add'
  /**
   * An array containing objects for the newly created drafts
   */
  drafts: GetDraftsResponseItem[]
}

/**
 * Drafts update event
 * @see https://zulip.com/api/get-events#drafts-update
 */
export type DraftsUpdateEvent = EventItemCommon & {
  type: 'drafts'
  op: 'update'
  /**
   * A dictionary representing the updated message draft
   */
  draft: GetDraftsResponseItem
}

/**
 * Drafts remove event
 * @see https://zulip.com/api/get-events#drafts-remove
 */
export type DraftsRemoveEvent = EventItemCommon & {
  type: 'drafts'
  op: 'remove'
  /**
   * The ID of the draft that was deleted
   */
  draft_id: number
}

/**
 * Navigation view add event
 * @see https://zulip.com/api/get-events#navigation_view-add
 * @since Zulip 11.0 (feature level 390)
 */
export type NavigationViewAddEvent = EventItemCommon & {
  type: 'navigation_view'
  op: 'add'
  /**
   * Represents a user's personal configuration for a specific navigation view
   */
  navigation_view: GetNavigationViewsResponseItem
}

/**
 * Navigation view update event
 * @see https://zulip.com/api/get-events#navigation_view-update
 * @since Zulip 11.0 (feature level 390)
 */
export type NavigationViewUpdateEvent = EventItemCommon & {
  type: 'navigation_view'
  op: 'update'
  /**
   * The unique URL hash of the navigation view being updated
   */
  fragment: string
  /**
   * A dictionary containing the updated properties of the navigation view
   */
  data: Partial<Omit<GetNavigationViewsResponseItem, 'fragment'>>
}

/**
 * Navigation view remove event
 * @see https://zulip.com/api/get-events#navigation_view-remove
 * @since Zulip 11.0 (feature level 390)
 */
export type NavigationViewRemoveEvent = EventItemCommon & {
  type: 'navigation_view'
  op: 'remove'
  /**
   * The unique URL hash of the navigation view that was deleted
   */
  fragment: string
}

/**
 * Saved snippets add event
 * @see https://zulip.com/api/get-events#saved_snippets-add
 * @since Zulip 10.0 (feature level 297)
 */
export type SavedSnippetsAddEvent = EventItemCommon & {
  type: 'saved_snippets'
  op: 'add'
  /**
   * Object containing the details of the saved snippet
   */
  saved_snippet: GetSnippetsResponseItem
}

/**
 * Saved snippets update event
 * @see https://zulip.com/api/get-events#saved_snippets-update
 * @since Zulip 10.0 (feature level 297)
 */
export type SavedSnippetsUpdateEvent = EventItemCommon & {
  type: 'saved_snippets'
  op: 'update'
  /**
   * Object containing the details of the updated saved snippet
   */
  saved_snippet: GetSnippetsResponseItem
}

/**
 * Saved snippets remove event
 * @see https://zulip.com/api/get-events#saved_snippets-remove
 * @since Zulip 10.0 (feature level 297)
 */
export type SavedSnippetsRemoveEvent = EventItemCommon & {
  type: 'saved_snippets'
  op: 'remove'
  /**
   * The ID of the saved snippet that was deleted
   */
  saved_snippet_id: number
}

/**
 * Reminders add event
 * @see https://zulip.com/api/get-events#reminders-add
 * @since Zulip 11.0 (feature level 399)
 */
export type RemindersAddEvent = EventItemCommon & {
  type: 'reminders'
  op: 'add'
  /**
   * An array of objects containing details of the newly created reminders
   */
  reminders: GetRemindersResponseItem[]
}

/**
 * Reminders remove event
 * @see https://zulip.com/api/get-events#reminders-remove
 * @since Zulip 11.0 (feature level 399)
 */
export type RemindersRemoveEvent = EventItemCommon & {
  type: 'reminders'
  op: 'remove'
  /**
   * The ID of the reminder that was deleted
   */
  reminder_id: number
}

/**
 * Scheduled messages add event
 * @see https://zulip.com/api/get-events#scheduled_messages-add
 * @since Zulip 7.0 (feature level 179)
 */
export type ScheduledMessagesAddEvent = EventItemCommon & {
  type: 'scheduled_messages'
  op: 'add'
  /**
   * An array of objects containing details of the newly created scheduled messages
   */
  scheduled_messages: GetScheduleMessagesResponseItem[]
}

/**
 * Scheduled messages update event
 * @see https://zulip.com/api/get-events#scheduled_messages-update
 * @since Zulip 7.0 (feature level 179)
 */
export type ScheduledMessagesUpdateEvent = EventItemCommon & {
  type: 'scheduled_messages'
  op: 'update'
  /**
   * Object containing details of the updated scheduled message
   */
  scheduled_message: GetScheduleMessagesResponseItem
}

/**
 * Scheduled messages remove event
 * @see https://zulip.com/api/get-events#scheduled_messages-remove
 * @since Zulip 7.0 (feature level 179)
 */
export type ScheduledMessagesRemoveEvent = EventItemCommon & {
  type: 'scheduled_messages'
  op: 'remove'
  /**
   * The ID of the scheduled message that was deleted
   */
  scheduled_message_id: number
}

/**
 * Channel folder add event
 * @see https://zulip.com/api/get-events#channel_folder-add
 * @since Zulip 11.0 (feature level 389)
 */
export type ChannelFolderAddEvent = EventItemCommon & {
  type: 'channel_folder'
  op: 'add'
  /**
   * Object containing the channel folder's attributes
   */
  channel_folder: GetChannelFoldersResponseItem
}

/**
 * Channel folder update event
 * @see https://zulip.com/api/get-events#channel_folder-update
 * @since Zulip 11.0 (feature level 389)
 */
export type ChannelFolderUpdateEvent = EventItemCommon & {
  type: 'channel_folder'
  op: 'update'
  /**
   * ID of the updated channel folder
   */
  channel_folder_id: number
  /**
   * Dictionary containing the changed details of the channel folder
   */
  data: Partial<Omit<GetChannelFoldersResponseItem, 'id'>>
}

/**
 * Channel folder reorder event
 * @see https://zulip.com/api/get-events#channel_folder-reorder
 * @since Zulip 11.0 (feature level 418)
 */
export type ChannelFolderReorderEvent = EventItemCommon & {
  type: 'channel_folder'
  op: 'reorder'
  /**
   * A list of channel folder IDs representing the new order
   */
  order: number[]
}

/**
 * Union of all Zulip real-time event types
 * @see https://zulip.com/api/get-events
 */
export type ZulipEvent =
  | AlertWordsEvent
  | UserSettingsUpdateEvent
  | UpdateRealmUserEvent
  | RealmUserAddEvent
  | RealmUserRemoveEvent
  | AddSubscriptionEvent
  | RemoveSubscriptionEvent
  | UpdateSubscriptionEvent
  | SubscriptionPeerAddEvent
  | SubscriptionPeerRemoveEvent
  | MessageEvent
  | HasZoomTokenEvent
  | InvitesChangedEvent
  | PresenceEvent
  | StreamCreateEvent
  | StreamDeleteEvent
  | StreamUpdateEvent
  | ReactionAddEvent
  | ReactionRemoveEvent
  | AttachmentAddEvent
  | AttachmentUpdateEvent
  | AttachmentRemoveEvent
  | DeviceAddEvent
  | DeviceRemoveEvent
  | DeviceUpdateEvent
  | SubmessageEvent
  | UserStatusEvent
  | CustomProfileFieldsEvent
  | DefaultStreamGroupsEvent
  | DefaultStreamsEvent
  | DeleteMessageEvent
  | MutedTopicsEvent
  | UserTopicEvent
  | MutedUsersEvent
  | HeartbeatEvent
  | OnboardingStepsEvent
  | UpdateMessageEvent
  | TypingStartEvent
  | TypingStopEvent
  | TypingEditMessageStartEvent
  | TypingEditMessageStopEvent
  | UpdateMessageFlagsAddEvent
  | UpdateMessageFlagsRemoveEvent
  | UserGroupAddEvent
  | UserGroupUpdateEvent
  | UserGroupAddMembersEvent
  | UserGroupRemoveMembersEvent
  | UserGroupAddSubgroupsEvent
  | UserGroupRemoveSubgroupsEvent
  | UserGroupRemoveEvent
  | RealmLinkifiersEvent
  | RealmFiltersEvent
  | RealmPlaygroundsEvent
  | RealmEmojiUpdateEvent
  | RealmDomainsAddEvent
  | RealmDomainsChangeEvent
  | RealmDomainsRemoveEvent
  | RealmExportEvent
  | RealmExportConsentEvent
  | RealmBotAddEvent
  | RealmBotUpdateEvent
  | RealmBotRemoveEvent
  | RealmBotDeleteEvent
  | RealmUpdateEvent
  | RealmDeactivatedEvent
  | RestartEvent
  | WebReloadClientEvent
  | RealmUpdateDictEvent
  | RealmUserSettingsDefaultsUpdateEvent
  | DraftsAddEvent
  | DraftsUpdateEvent
  | DraftsRemoveEvent
  | NavigationViewAddEvent
  | NavigationViewUpdateEvent
  | NavigationViewRemoveEvent
  | SavedSnippetsAddEvent
  | SavedSnippetsUpdateEvent
  | SavedSnippetsRemoveEvent
  | RemindersAddEvent
  | RemindersRemoveEvent
  | ScheduledMessagesAddEvent
  | ScheduledMessagesUpdateEvent
  | ScheduledMessagesRemoveEvent
  | ChannelFolderAddEvent
  | ChannelFolderUpdateEvent
  | ChannelFolderReorderEvent
