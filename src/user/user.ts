import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'
import type {
  BotTypeValues,
  UserRoleValues,
  UserSettingsWebMarkReadScrollPolicyValues,
  UserSettingsWebChannelDefaultViewValues,
  UserSettingsColorSchemeValues,
  UserSettingsDemoteInactiveStreamsValues,
  UserSettingsUserListStyleValues,
  UserSettingsWebStreamUnreadsCountDisplayPolicyValues,
  UserSettingsDesktopIconCountDisplayValues,
  UserSettingsRealmNameInEmailNotificationsPolicyValues,
  UserSettingsAutomaticallyFollowTopicsPolicyValues,
  UserSettingsAutomaticallyUnmuteTopicsInMutedChannelsPolicyValues,
  UserSettingsEmailAddressVisibilityValues,
} from '../constants'

/**
 * Parameters for GetUserById API
 * @see https://zulip.com/api/get-user#parameters
 */
export type GetUserByIdParams = {
  /**
   * Whether the client supports computing gravatars URLs. Default is true
   * @see https://zulip.com/api/get-user#parameter-client_gravatar
   */
  client_gravatar?: boolean
  /**
   * Whether custom profile fields are included in the response.
   * Default is false
   * @since Zulip 2.1.0
   * @see https://zulip.com/api/get-user#parameter-include_custom_profile_fields
   */
  include_custom_profile_fields?: boolean
}

/**
 * Custom field value object for the response of GetUserById API
 */
export type GetUserByIdResponseUserFieldValue = {
  /**
   * The value
   */
  value: string
  /**
   * The value rendered in HTML. Only exists if the field supports markdown.
   */
  rendered_value?: string
}

/**
 * The user object in the response of GetUserById response
 */
export type GetUserByIdResponseUser = {
  /**
   * The user ID
   */
  user_id: number
  /**
   * The user's real email address. null if the user cannot access user's
   * real email address.
   */
  delivery_email: string | null
  /**
   * The Zulip API email address of the user or bot.
   */
  email: string
  /**
   * Full name of the user or bot, used for all display purposes.
   */
  full_name: string
  /**
   * The time the user account was created.
   */
  date_joined: string
  /**
   * Whether the user account is active or not. If false, the user is deactivated.
   */
  is_active: boolean
  /**
   * Whether the user is an organization owner.
   * @since Zulip 3.0 (feature level 8)
   */
  is_owner: boolean
  /**
   * Whether the user is an organization administrator.
   */
  is_admin: boolean
  /**
   * Whether the user is a guest user.
   */
  is_guest: boolean
  /**
   * Whether the user is a bot or full account.
   */
  is_bot: boolean
  /**
   * The type of the bot.
   */
  bot_type?: BotTypeValues
  /**
   * The user ID of the bot owner. null indicates no owner.
   * @since Zulip 3.0 (feature level 1)
   */
  bot_owner_id?: number | null
  /**
   * Organization-level role of the user.
   * @since Zulip 4.0 (feature level 59)
   */
  role: UserRoleValues
  /**
   * The IANA identifier of the user's profile time zone
   */
  timezone: string
  /**
   * URL for the user's avatar. The field will be null only if client_gravatar=true,
   * the current user has access to this user's real email address,
   * and this user's avatar is hosted by the Gravatar provider.
   */
  avatar_url: string | null
  /**
   * Version of the user avater.
   */
  avatar_version: number
  /**
   * Whether this user object is a stub account imported from another chat system.
   * @since Zulip 12.0 (feature level 433)
   */
  is_imported_stub: boolean
  /**
   * Custom field data. Key is the custom field ID. If bot user, this field
   * does not exist.
   */
  profile_data?: Record<string, GetUserByIdResponseUserFieldValue>
}

/**
 * The response of GetUserById API
 * @see https://zulip.com/api/get-user#response
 */
export type GetUserByIdResponse = GeneralSuccessResponse & {
  /**
   * The target user
   */
  user: GetUserByIdResponseUser
}

/**
 * Parameters for GetUserByEmail API
 * @since Zulip 4.0 (feature level 39)
 * @see https://zulip.com/api/get-user-by-email#parameters
 */
export type GetUserByEmailParams = {
  /**
   * Whether the client supports computing gravatars URLs. Default is true
   * @see https://zulip.com/api/get-user-by-email#parameter-client_gravatar
   */
  client_gravatar?: boolean
  /**
   * Whether custom profile fields are included in the response.
   * Default is false
   * @see https://zulip.com/api/get-user-by-email#parameter-include_custom_profile_fields
   */
  include_custom_profile_fields?: boolean
}

/**
 * The response of GetUserByEmail API
 * @since Zulip 4.0 (feature level 39)
 * @see https://zulip.com/api/get-user-by-email#response
 */
export type GetUserByEmailResponse = GetUserByIdResponse

/**
 * The response of GetOwnUser API
 * @see https://zulip.com/api/get-own-user#response
 */
export type GetOwnUserResponse = GeneralSuccessResponse & {
  /**
   * URL for the user's avatar.
   */
  avatar_url: string
  /**
   * Version of the user avater.
   * @since Zulip 3.0 (feature level 10)
   */
  avatar_version: number
  /**
   * The Zulip API email address of the user or bot.
   */
  email: string
  /**
   * Full name of the user or bot, used for all display purposes.
   */
  full_name: string
  /**
   * Whether the user is an organization administrator.
   */
  is_admin: boolean
  /**
   * Whether the user is an organization owner.
   * @since Zulip 3.0 (feature level 8)
   */
  is_owner: boolean
  /**
   * Organization-level role of the user.
   * @since Zulip 4.0 (feature level 59)
   */
  role: UserRoleValues
  /**
   * Whether the user is a guest user.
   * @since Zulip 3.0 (feature level 10)
   */
  is_guest: boolean
  /**
   * Whether the user is a bot or full account.
   */
  is_bot: boolean
  /**
   * Whether the user account is active or not. If false, the user is deactivated.
   * @since Zulip 3.0 (feature level 10)
   */
  is_active: boolean
  /**
   * The IANA identifier of the user's profile time zone
   * @since Zulip 3.0 (feature level 10)
   */
  timezone: string
  /**
   * The time the user account was created.
   * @since Zulip 3.0 (feature level 10)
   */
  date_joined: string
  /**
   * The integer ID of the last message received by the requesting user's account.
   * @deprecated Use GetMessages with anchor=newest
   */
  max_message_id: number
  /**
   * User ID
   */
  user_id: number
  /**
   * The requesting user's real email address
   */
  delivery_email: string
  /**
   * Whether this user object is a stub account imported from another chat system.
   * @since Zulip 12.0 (feature level 433)
   */
  is_imported_stub: boolean
  /**
   * Custom field data. Key is the custom field ID. If bot user, this field
   * does not exist.
   */
  profile_data?: Record<string, GetUserByIdResponseUserFieldValue>
}

/**
 * Parameters for GetUsers API
 * @see https://zulip.com/api/get-users#parameters
 */
export type GetUsersParams = {
  /**
   * Whether the client supports computing gravatars URLs. Default is true
   * @see https://zulip.com/api/get-users#parameter-client_gravatar
   */
  client_gravatar?: boolean
  /**
   * Whether custom profile fields are included in the response.
   * Default is false
   * @since Zulip 2.1.0
   * @see https://zulip.com/api/get-users#parameter-include_custom_profile_fields
   */
  include_custom_profile_fields?: boolean
  /**
   * Limits the results to the specified user IDs. If not specified, all users
   * the server can access.
   * @since Zulip 11.0 (feature level 384)
   * @see https://zulip.com/api/get-users#parameter-user_ids
   */
  user_ids?: number[]
}

/**
 * User item for GetUsers API
 */
export type GetUsersResponseItem = GetUserByIdResponseUser

/**
 * The response of GetUsers API
 * @see https://zulip.com/api/get-users#response
 */
export type GetUsersResponse = GeneralSuccessResponse & {
  /**
   * Users
   */
  members: GetUsersResponseItem[]
}

/**
 * Parameters for CreateUser API
 * @see https://zulip.com/api/create-user#parameters
 */
export type CreateUserParams = {
  /**
   * User email
   * @see https://zulip.com/api/create-user#parameter-email
   */
  email: string
  /**
   * User password
   * @see https://zulip.com/api/create-user#parameter-password
   */
  password: string
  /**
   * User full name
   * @see https://zulip.com/api/create-user#parameter-full_name
   */
  full_name: string
}

/**
 * The response of CreateUser API
 * @see https://zulip.com/api/create-user
 */
export type CreateUserResponse = GeneralSuccessResponse & {
  /**
   * User ID of the new user
   * @since Zulip 4.0 (feature level 30)
   */
  user_id: number
}

/**
 * Profile data item for UpdateUser API
 */
export type UpdateUserProfileDataItem = {
  /**
   * Custom field ID
   */
  id: number
  /**
   * Custom field value
   */
  value: string | number[] | null
}

/**
 * Updating full name parameters for UpdateUser API
 */
type UpdateUserUpdateFullNameParams = {
  /**
   * The new full name
   * @see https://zulip.com/api/update-user#parameter-full_name
   */
  full_name: string
}

/**
 * Updating role parameters for UpdateUser API
 */
type UpdateUserUpdateRoleParams = {
  /**
   * The new role
   * @since Zulip 3.0 (feature level 8)
   * @see https://zulip.com/api/update-user#parameter-role
   */
  role: UserRoleValues
}

/**
 * Updating profile data parameters for UpdateUser API
 */
type UpdateUserUpdatProfileDataParams = {
  /**
   * Updating profile data
   * @see https://zulip.com/api/update-user#parameter-profile_data
   */
  profile_data: [UpdateUserProfileDataItem, ...UpdateUserProfileDataItem[]]
}

/**
 * Updating email address parameters for UpdateUser API
 */
type UpdateUserUpdateEmailParams = {
  /**
   * The new email address
   * @since Zulip 10.0 (feature level 285)
   * @see https://zulip.com/api/update-user#parameter-new_email
   */
  new_email: string
}

/**
 * Parameters for UpdateUser API
 * @see https://zulip.com/api/update-user#parameters
 */
export type UpdateUserParams =
  | UpdateUserUpdateFullNameParams
  | UpdateUserUpdateRoleParams
  | UpdateUserUpdatProfileDataParams
  | UpdateUserUpdateEmailParams

/**
 * Parameters for UpdateUserByEmail API
 * @since Zulip 10.0 (feature level 313)
 * @see https://zulip.com/api/update-user-by-email#parameters
 */
export type UpdateUserByEmailParams = UpdateUserParams

/**
 * Actions with deactivating user
 */
export type DeactivateUserActions = {
  /**
   * Whether to delete the user's profile by updating their name to "Deleted user" and
   * removing their profile picture
   */
  delete_profile?: boolean
  /**
   * Whether to delete messages in public channels
   */
  delete_public_channel_messages?: boolean
  /**
   * Whether to delete messages in private channels
   */
  delete_private_channel_messages?: boolean
  /**
   * Whether to delete direct messages
   */
  delete_direct_messages?: boolean
}

/**
 * Request parameters for DeactivateUser API
 * @see https://zulip.com/api/deactivate-user#parameters
 */
export type DeactivateUserParams = {
  /**
   * Additional actions on deleting user
   * @since Zulip 12.0 (feature level 459)
   * @see https://zulip.com/api/deactivate-user#parameter-actions
   */
  actions?: DeactivateUserActions
  /**
   * Account deactivation notification content
   * @since Zulip 5.0 (feature level 135)
   * @see https://zulip.com/api/deactivate-user#parameter-deactivation_notification_comment
   */
  deactivation_notification_comment?: string
}

type UpdateUserSettingsTargetUsersParamsWithUserIds = {
  /**
   * The list of user IDs to update settings
   */
  user_ids: number[]
}

type UpdatUserSettingsTargetUsersParamsWithGroupIds = {
  /**
   * The list of group IDs to update settings
   */
  group_ids: number[]
}

type UpdateUserSettingsTargetUsersParams = (
  | UpdateUserSettingsTargetUsersParamsWithUserIds
  | UpdatUserSettingsTargetUsersParamsWithGroupIds
) & {
  /**
   * Skip if the user already set the settings by himself/herself
   */
  skip_if_already_edited: boolean
}

/**
 * Parameters which is forbidden from being updated by administrator
 */
type UpdateUserSettingsProtectedParamKeys =
  | 'email'
  | 'old_password'
  | 'new_password'
  | 'allow_private_data_export'
  | 'email_address_visibility'
  | 'enable_digest_emails'
  | 'enable_login_emails'
  | 'enable_marketing_emails'
  | 'presence_enabled'
  | 'send_private_typing_notifications'
  | 'send_read_receipts'
  | 'send_stream_typing_notifications'

/**
 * Base parameters for administrator update user settings
 */
type UpdateUserSettingsParamsWithTargetUserBase = {
  /**
   * Target user specification
   * @since Zulip 12.0 (feature level 444)
   * @see https://zulip.com/api/update-settings#parameter-target_users
   */
  target_users: UpdateUserSettingsTargetUsersParams
  /**
   * New email address.
   *
   * To complete updating email address, the user must click verification link
   * in the message.
   * @see https://zulip.com/api/update-settings#parameter-email
   */
  email?: never
  /**
   * The old password.
   *
   * You must specify new_password if you specify old_password.
   * @see https://zulip.com/api/update-settings#parameter-old_password
   */
  old_password?: never
  /**
   * The new password
   *
   * You must specify old_password if you specify new_password.
   * @see https://zulip.com/api/update-settings#parameter-new_password
   */
  new_password?: never
  /**
   * Whether organization administrators are allowed to export your private data
   * @since Zulip 10.0 (feature level 293)
   * @see https://zulip.com/api/update-settings#parameter-allow_private_data_export
   */
  allow_private_data_export?: never
  /**
   * The policy other users in this organization can see their real email address
   *
   * - 1 - Everyone
   * - 2 - Members only
   * - 3 - Administrators only
   * - 4 - Nobody
   * - 5 - Moderators only
   * @since Zulip 7.0 (feature level 163)
   * @see https://zulip.com/api/update-settings#parameter-email_address_visibility
   */
  email_address_visibility?: never
  /**
   * Enable digest emails when the user is away
   * @see https://zulip.com/api/update-settings#parameter-enable_digest_emails
   */
  enable_digest_emails?: never
  /**
   * Enable email notifications for new logins to account
   * @see https://zulip.com/api/update-settings#parameter-enable_login_emails
   */
  enable_login_emails?: never
  /**
   * Enable marketing emails. Has no function outside Zulip Cloud
   * @see https://zulip.com/api/update-settings#parameter-enable_marketing_emails
   */
  enable_marketing_emails?: never
  /**
   * Display the presence status to other users when online
   * @since https://zulip.com/api/update-settings#parameter-presence_enabled
   */
  presence_enabled?: never
  /**
   * Whether typing notifications be sent when composing direct messages
   * @since Zulip 5.0 (feature level 105)
   * @see https://zulip.com/api/update-settings#parameter-send_private_typing_notifications
   */
  send_private_typing_notifications?: never
  /**
   * Whether other users are allowed to see whether you've read messages
   * @since Zulip 5.0 (feature level 105)
   * @see https://zulip.com/api/update-settings#parameter-send_read_receipts
   */
  send_read_receipts?: never
  /**
   * Whether typing notifications be sent when composing channel messages
   * @since Zulip 5.0 (feature level 105)
   * @see https://zulip.com/api/update-settings#parameter-send_stream_typing_notifications
   */
  send_stream_typing_notifications?: never
}

type UpdateUserSettingsParamsWithoutTargetUserBase = {
  /**
   * Target user specification
   * @since Zulip 12.0 (feature level 444)
   * @see https://zulip.com/api/update-settings#parameter-target_users
   */
  target_users?: never
}

/**
 * Web home view values
 */
export type UpdateUserSettingsParamsWebHomeViewValues =
  | 'recent'
  | 'inbox'
  | 'all_messages'

/**
 * Animation preview values
 */
export type UpdateUserSettingsParamsWebAnimateImagePreviewsValues =
  | 'always'
  | 'on_hover'
  | 'never'

/**
 * Emoji set parameter values
 */
export type UpdateUserSettingsParamsEmojiSetValues =
  | 'google'
  | 'twitter'
  | 'text'

/**
 * Mark as read policy values for resolved-topic notices
 */
export type UpdateUserSettingsParamsResolvedTopicNoticeAutoReadPolicyValues =
  | 'always'
  | 'except_followed'
  | 'never'

type UpdateUserSettingsEditableParams = {
  /**
   * New full name
   * @see https://zulip.com/api/update-settings#parameter-full_name
   */
  full_name?: string
  /**
   * New email address.
   *
   * To complete updating email address, the user must click verification link
   * in the message.
   * @see https://zulip.com/api/update-settings#parameter-email
   */
  email?: string
  /**
   * The old password.
   *
   * You must specify new_password if you specify old_password.
   * @see https://zulip.com/api/update-settings#parameter-old_password
   */
  old_password?: string
  /**
   * The new password
   *
   * You must specify old_password if you specify new_password.
   * @see https://zulip.com/api/update-settings#parameter-new_password
   */
  new_password?: string
  /**
   * Whether to display time in 24-hour notation
   * @see https://zulip.com/api/update-settings#parameter-twenty_four_hour_time
   */
  twenty_four_hour_time?: boolean
  /**
   * Mark as read policy when scrolling.
   *
   * - 1 - Always
   * - 2 - Only in conversation views
   * - 3 - Never
   * @since Zulip 7.0 (feature level 175)
   * @see https://zulip.com/api/update-settings#parameter-web_mark_read_on_scroll_policy
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
   * @see https://zulip.com/api/update-settings#parameter-web_channel_default_view
   */
  web_channel_default_view?: UserSettingsWebChannelDefaultViewValues
  /**
   * Whether clients display the number of starred messages or not
   * @see https://zulip.com/api/update-settings#parameter-starred_message_counts
   */
  starred_message_counts?: boolean
  /**
   * Whether to receive typing notifications
   * @since Zulip 9.0 (feature level 253)
   * @see https://zulip.com/api/update-settings#parameter-receives_typing_notifications
   */
  receives_typing_notifications?: boolean
  /**
   * Whether to suggest time zone update if the timezone setting is different
   * from the client device time zone
   * @since Zulip 10.0 (feature level 329)
   * @see https://zulip.com/api/update-settings#parameter-web_suggest_update_timezone
   */
  web_suggest_update_timezone?: boolean
  /**
   * Whether to use the maximum available screen width
   * @see https://zulip.com/api/update-settings#parameter-fluid_layout_width
   */
  fluid_layout_width?: boolean
  /**
   * Reserved for use to control variations in Zulip's design to help visually impaired users
   * @see https://zulip.com/api/update-settings#parameter-high_contrast_mode
   */
  high_contrast_mode?: boolean
  /**
   * Primary font-size
   * @since Zulip 9.0 (feature level 245)
   * @see https://zulip.com/api/update-settings#parameter-web_font_size_px
   */
  web_font_size_px?: number
  /**
   * Line height percent. For example line-height=1.2 is 120.
   * @since Zulip 9.0 (feature level 245)
   * @see https://zulip.com/api/update-settings#parameter-web_line_height_percent
   */
  web_line_height_percent?: number
  /**
   * Color scheme
   *
   * - 1 - Automatic
   * - 2 - Dark theme
   * - 3 - Light theme
   * @see https://zulip.com/api/update-settings#parameter-color_scheme
   */
  color_scheme?: UserSettingsColorSchemeValues
  /**
   * Whether synchronizing drafts is enabled
   * @since Zulip 5.0 (feature level 87)
   * @see https://zulip.com/api/update-settings#parameter-enable_drafts_synchronization
   */
  enable_drafts_synchronization?: boolean
  /**
   * Whether to translate emoticons to emoji in messages the user sends
   * @see https://zulip.com/api/update-settings#parameter-translate_emoticons
   */
  translate_emoticons?: boolean
  /**
   * Whether to display the names of reacting users on a message
   * @since Zulip 6.0 (feature level 125)
   * @see https://zulip.com/api/update-settings#parameter-display_emoji_reaction_users
   */
  display_emoji_reaction_users?: boolean
  /**
   * User default language
   * @see https://zulip.com/api/update-settings#parameter-default_language
   */
  default_language?: string
  /**
   * The home view
   *
   * - recent - Recent conversations view
   * - inbox - Inbox view
   * - all_messages - Combined feed view
   * @since Zulip 8.0 (feature level 219)
   * @see https://zulip.com/api/update-settings#parameter-web_home_view
   */
  web_home_view?: UpdateUserSettingsParamsWebHomeViewValues
  /**
   * Whether the escape key navigates to the configured home view
   * @since Zulip 8.0 (feature level 219)
   * @see https://zulip.com/api/update-settings#parameter-web_escape_navigates_to_home_view
   */
  web_escape_navigates_to_home_view?: boolean
  /**
   * Whether the users list on left sidebar in narrow windows
   * @see https://zulip.com/api/update-settings#parameter-left_side_userlist
   */
  left_side_userlist?: boolean
  /**
   * The user's configured emoji set
   *
   * - google - Google modern
   * - twitter - Twitter
   * - text - Plain text
   * @see https://zulip.com/api/update-settings#parameter-emojiset
   */
  emojiset?: UpdateUserSettingsParamsEmojiSetValues
  /**
   * Whether to hide inactive channels in the left sidebar
   *
   * - 1 - Automatic
   * - 2 - Always
   * - 3 - Never
   * @see https://zulip.com/api/update-settings#parameter-demote_inactive_streams
   */
  demote_inactive_streams?: UserSettingsDemoteInactiveStreamsValues
  /**
   * User list style
   *
   * - 1 - Compact
   * - 2 - With status
   * - 3 - With avatar and status
   * @since Zulip 6.0 (feature level 141)
   * @see https://zulip.com/api/update-settings#parameter-user_list_style
   */
  user_list_style?: UserSettingsUserListStyleValues
  /**
   * How animated images should be played in the message feed
   *
   * - always - Always play animate
   * - on_hover - Play on hover
   * - never - Never play
   * @since Zulip 9.0 (feature level 275)
   * @see https://zulip.com/api/update-settings#parameter-web_animate_image_previews
   */
  web_animate_image_previews?: UpdateUserSettingsParamsWebAnimateImagePreviewsValues
  /**
   * Which channels should be displayed with a numeric unread count in the left sidebar
   *
   * - 1 - All channels
   * - 2 - Unmuted channels and topics
   * - 3 - No channels
   * @since Zulip 8.0 (feature level 210)
   * @see https://zulip.com/api/update-settings#parameter-web_stream_unreads_count_display_policy
   */
  web_stream_unreads_count_display_policy?: UserSettingsWebStreamUnreadsCountDisplayPolicyValues
  /**
   * Whether user wants AI features like topic summarization to be hidden
   * @since Zulip 10.0 (feature level 350)
   * @see https://zulip.com/api/update-settings#parameter-hide_ai_features
   */
  hide_ai_features?: boolean
  /**
   * Whether channel folders are used to organize how conversations with unread messages are displayed
   * @since Zulip 12.0 (feature level 431)
   * @see https://zulip.com/api/update-settings#parameter-web_inbox_show_channel_folders
   */
  web_inbox_show_channel_folders?: boolean
  /**
   * Whether channel folders are used to organize how channels are displayed
   * @since Zulip 11.0 (feature level 411)
   * @see https://zulip.com/api/update-settings#parameter-web_left_sidebar_show_channel_folders
   */
  web_left_sidebar_show_channel_folders?: boolean
  /**
   * Whether left sidebar displays the unread message count summary
   * @since Zulip 11.0 (feature level 398)
   * @see https://zulip.com/api/update-settings#parameter-web_left_sidebar_unreads_count_summary
   */
  web_left_sidebar_unreads_count_summary?: boolean
  /**
   * User's time zone. You must specify IANA identifier of the time zone.
   * @see https://zulip.com/api/update-settings#parameter-timezone
   */
  timezone?: string
  /**
   * Enable visual desktop notifications for channel messages
   * @see https://zulip.com/api/update-settings#parameter-enable_stream_desktop_notifications
   */
  enable_stream_desktop_notifications?: boolean
  /**
   * Enable email notifications for channel messages
   * @see https://zulip.com/api/update-settings#parameter-enable_stream_email_notifications
   */
  enable_stream_email_notifications?: boolean
  /**
   * Enable mobile notifications for channel messages
   * @see https://zulip.com/api/update-settings#parameter-enable_stream_push_notifications
   */
  enable_stream_push_notifications?: boolean
  /**
   * Enable audible desktop notifications for channel messages
   * @see https://zulip.com/api/update-settings#parameter-enable_stream_audible_notifications
   */
  enable_stream_audible_notifications?: boolean
  /**
   * Notification sound name
   * @see https://zulip.com/api/update-settings#parameter-notification_sound
   * @see https://github.com/zulip/zulip/tree/main/static/audio/notification_sounds
   */
  notification_sound?: string
  /**
   * Enable visual desktop notifications for direct messages and @-mentions
   * @see https://zulip.com/api/update-settings#parameter-enable_desktop_notifications
   */
  enable_desktop_notifications?: boolean
  /**
   * Enable audible desktop notifications for direct messages and @-mentions
   * @see https://zulip.com/api/update-settings#parameter-enable_sounds
   */
  enable_sounds?: boolean
  /**
   * The duration seconds for which the server waits to batch email notifications before sending
   * @since Zulip 5.0 (feature level 82)
   * @see https://zulip.com/api/update-settings#parameter-email_notifications_batching_period_seconds
   */
  email_notifications_batching_period_seconds?: number
  /**
   * Enable email notifications for direct messages and @-mentions received when the user is offline
   * @see https://zulip.com/api/update-settings#parameter-enable_offline_email_notifications
   */
  enable_offline_email_notifications?: boolean
  /**
   * Enable mobile notification for direct messages and @-mentions received when the user is offline
   * @see https://zulip.com/api/update-settings#parameter-enable_offline_push_notifications
   */
  enable_offline_push_notifications?: boolean
  /**
   * Enable mobile notification for direct messages and @-mentions received when the user is online
   * @see https://zulip.com/api/update-settings#parameter-enable_online_push_notifications
   */
  enable_online_push_notifications?: boolean
  /**
   * Enable visual desktop notifications for messages sent to followed topics
   * @since Zulip 8.0 (feature level 189)
   * @see https://zulip.com/api/update-settings#parameter-enable_followed_topic_desktop_notifications
   */
  enable_followed_topic_desktop_notifications?: boolean
  /**
   * Enable email notifications for messages sent to followed topics
   * @since Zulip 8.0 (feature level 189)
   * @see https://zulip.com/api/update-settings#parameter-enable_followed_topic_email_notifications
   */
  enable_followed_topic_email_notifications?: boolean
  /**
   * Enable push notifications for messages sent to followed topics
   * @since Zulip 8.0 (feature level 189)
   * @see https://zulip.com/api/update-settings#parameter-enable_followed_topic_push_notifications
   */
  enable_followed_topic_push_notifications?: boolean
  /**
   * Enable audible desktop notifications for messages sent to followed topics
   * @since Zulip 8.0 (feature level 189)
   * @see https://zulip.com/api/update-settings#parameter-enable_followed_topic_audible_notifications
   */
  enable_followed_topic_audible_notifications?: boolean
  /**
   * Enable digest emails when the user is away
   * @see https://zulip.com/api/update-settings#parameter-enable_digest_emails
   */
  enable_digest_emails?: boolean
  /**
   * Enable marketing emails. Has no function outside Zulip Cloud
   * @see https://zulip.com/api/update-settings#parameter-enable_marketing_emails
   */
  enable_marketing_emails?: boolean
  /**
   * Enable email notifications for new logins to account
   * @see https://zulip.com/api/update-settings#parameter-enable_login_emails
   */
  enable_login_emails?: boolean
  /**
   * Include the message's content in email notifications for new messages
   * @see https://zulip.com/api/update-settings#parameter-message_content_in_email_notifications
   */
  message_content_in_email_notifications?: boolean
  /**
   * Include content of direct messages in desktop notifications
   * @see https://zulip.com/api/update-settings#parameter-pm_content_in_desktop_notifications
   */
  pm_content_in_desktop_notifications?: boolean
  /**
   * Whether wildcard mentions should send notifications like a personal mention
   * @see https://zulip.com/api/update-settings#parameter-wildcard_mentions_notify
   */
  wildcard_mentions_notify?: boolean
  /**
   * Whether wildcard mentions in messages sent to followed topics should send
   * notifications like a personal mention
   * @since Zulip 8.0 (feature level 189)
   * @see https://zulip.com/api/update-settings#parameter-enable_followed_topic_wildcard_mentions_notify
   */
  enable_followed_topic_wildcard_mentions_notify?: boolean
  /**
   * Unread count badge
   *
   * - 1 - All unread messages
   * - 2 - DMs, mentions, and followed topics
   * - 3 - DMs and mentions
   * - 4 - None
   * @see https://zulip.com/api/update-settings#parameter-desktop_icon_count_display
   */
  desktop_icon_count_display?: UserSettingsDesktopIconCountDisplayValues
  /**
   * Whether to include organization name in subject of message notification emails
   *
   * - 1 - Automatic
   * - 2 - Always
   * - 3 - Never
   * @since Zulip 7.0 (feature level 168)
   * @see https://zulip.com/api/update-settings#parameter-realm_name_in_email_notifications_policy
   */
  realm_name_in_email_notifications_policy?: UserSettingsRealmNameInEmailNotificationsPolicyValues
  /**
   * Which topics to follow automatically
   *
   * - 1 - Topics the user participates in
   * - 2 - Topics the user sends a message to
   * - 3 - Topics the user starts
   * - 4 - Never
   * @since Zulip 8.0 (feature level 214)
   * @see https://zulip.com/api/update-settings#parameter-automatically_follow_topics_policy
   */
  automatically_follow_topics_policy?: UserSettingsAutomaticallyFollowTopicsPolicyValues
  /**
   * Which topics to unmute automatically in muted channels
   *
   * - 1 - Topics the user participates in
   * - 2 - Topics the user sends a message to
   * - 3 - Topics the user starts
   * - 4 - Never
   * @since Zulip 8.0 (feature level 214)
   * @see https://zulip.com/api/update-settings#parameter-automatically_unmute_topics_in_muted_streams_policy
   */
  automatically_unmute_topics_in_muted_streams_policy?: UserSettingsAutomaticallyUnmuteTopicsInMutedChannelsPolicyValues
  /**
   * Whether the server will automatically mark the user as following topics where the user is mentioned
   * @since Zulip 8.0 (feature level 235)
   * @see https://zulip.com/api/update-settings#parameter-automatically_follow_topics_where_mentioned
   */
  automatically_follow_topics_where_mentioned?: boolean
  /**
   * Whether the resolved-topic notices are marked as read
   *
   * - always - Always mark resolved-topic notices as read
   * - except_followed - Mark resolved-topic notices as read in topics not followed by the user
   * - never - Never mark resolved-topic notices as read
   * @since Zulip 11.0 (feature level 385)
   * @see https://zulip.com/api/update-settings#parameter-resolved_topic_notice_auto_read_policy
   */
  resolved_topic_notice_auto_read_policy?: UpdateUserSettingsParamsResolvedTopicNoticeAutoReadPolicyValues
  /**
   * Display the presence status to other users when online
   * @since https://zulip.com/api/update-settings#parameter-presence_enabled
   */
  presence_enabled?: boolean
  /**
   * Whether pressing Enter in the compose box sends a message (or saves a message edit)
   * @see https://zulip.com/api/update-settings#parameter-enter_sends
   */
  enter_sends?: boolean
  /**
   * Whether typing notifications be sent when composing direct messages
   * @since Zulip 5.0 (feature level 105)
   * @see https://zulip.com/api/update-settings#parameter-send_private_typing_notifications
   */
  send_private_typing_notifications?: boolean
  /**
   * Whether typing notifications be sent when composing channel messages
   * @since Zulip 5.0 (feature level 105)
   * @see https://zulip.com/api/update-settings#parameter-send_stream_typing_notifications
   */
  send_stream_typing_notifications?: boolean
  /**
   * Whether other users are allowed to see whether you've read messages
   * @since Zulip 5.0 (feature level 105)
   * @see https://zulip.com/api/update-settings#parameter-send_read_receipts
   */
  send_read_receipts?: boolean
  /**
   * Whether organization administrators are allowed to export your private data
   * @since Zulip 10.0 (feature level 293)
   * @see https://zulip.com/api/update-settings#parameter-allow_private_data_export
   */
  allow_private_data_export?: boolean
  /**
   * The policy other users in this organization can see their real email address
   *
   * - 1 - Everyone
   * - 2 - Members only
   * - 3 - Administrators only
   * - 4 - Nobody
   * - 5 - Moderators only
   * @since Zulip 7.0 (feature level 163)
   * @see https://zulip.com/api/update-settings#parameter-email_address_visibility
   */
  email_address_visibility?: UserSettingsEmailAddressVisibilityValues
  /**
   * Whether the user's view should automatically go to the conversation where they sent a message
   * @since Zulip 9.0 (feature level 268)
   * @see https://zulip.com/api/update-settings#parameter-web_navigate_to_sent_message
   */
  web_navigate_to_sent_message?: boolean
}

/**
 * Editable parameters for updating other users' settings for UpdateUserSettings API
 */
type UpdateUserSettingsEditableParamsForTargetUsers = Omit<
  UpdateUserSettingsEditableParams,
  UpdateUserSettingsProtectedParamKeys
>

type UpdateUserSettingsAtLeastOne<T extends Record<string, unknown>> = {
  [Key in keyof T]-?: Required<Pick<T, Key>> & Partial<Omit<T, Key>>
}[keyof T]

/**
 * Parameters for updating self user settings for UpdateUserSettings API
 */
type UpdateUserSettingsSelfEditableParams =
  UpdateUserSettingsAtLeastOne<UpdateUserSettingsEditableParams>

/**
 * Parameters for updating other users' settings for UpdateUserSettings API
 */
type UpdateUserSettingsTargetUsersEditableParams =
  UpdateUserSettingsAtLeastOne<UpdateUserSettingsEditableParamsForTargetUsers>

/**
 * Parameters for UpdateUserSettings API
 * @see https://zulip.com/api/update-settings#parameters
 */
export type UpdateUserSettingsParams =
  | (UpdateUserSettingsParamsWithTargetUserBase &
      UpdateUserSettingsTargetUsersEditableParams)
  | (UpdateUserSettingsParamsWithoutTargetUserBase &
      UpdateUserSettingsSelfEditableParams)

/**
 * Get user by ID
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @param params API parameters
 * @returns The response of GetUserById API
 * @since Zulip 3.0 (feature level 1)
 * @see https://zulip.com/api/get-user
 */
export async function getUserById(
  client: AxiosInstance,
  userId: number,
  params: GetUserByIdParams = {},
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    sendParams[key] = String(value)
  }

  const resp = await client.get<GetUserByIdResponse>(`/users/${userId}`, {
    params: sendParams,
  })

  return resp.data
}

/**
 * Get user by email
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param email Email address
 * @param params API parameters
 * @returns The response of GetUserByEmail API
 * @since Zulip 4.0 (feature level 39)
 * @see https://zulip.com/api/get-user-by-email
 */
export async function getUserByEmail(
  client: AxiosInstance,
  email: string,
  params: GetUserByEmailParams = {},
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    sendParams[key] = String(value)
  }

  const resp = await client.get<GetUserByEmailResponse>(
    `/users/${encodeURIComponent(email)}`,
    {
      params: sendParams,
    },
  )

  return resp.data
}

/**
 * Get basic data about the user/bot that requests this endpoint
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetOwnUser API
 * @see https://zulip.com/api/get-own-user
 */
export async function getOwnUser(client: AxiosInstance) {
  const resp = await client.get<GetOwnUserResponse>('/users/me')

  return resp.data
}

/**
 * Get users
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of GetUsers API
 * @see https://zulip.com/api/get-users
 */
export async function getUsers(
  client: AxiosInstance,
  params: GetUsersParams = {},
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    if (Array.isArray(value)) {
      sendParams[key] = JSON.stringify(value)
    } else {
      sendParams[key] = String(value)
    }
  }

  const resp = await client.get<GetUsersResponse>('/users', {
    params: sendParams,
  })

  return resp.data
}

/**
 * Create a user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateUser API
 * @see https://zulip.com/api/create-user
 */
export async function createUser(
  client: AxiosInstance,
  params: CreateUserParams,
) {
  const body = new URLSearchParams(params)

  const resp = await client.post<CreateUserResponse>('/users', body)

  return resp.data
}

/**
 * Update a user by ID
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @param params API parameters
 * @returns The response for UpdateUser API
 * @see https://zulip.com/api/update-user
 */
export async function updateUser(
  client: AxiosInstance,
  userId: number,
  params: UpdateUserParams,
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

  const resp = await client.patch<GeneralSuccessResponse>(
    `/users/${userId}`,
    body,
  )
  return resp.data
}

/**
 * Update a user by email address
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param email User email address
 * @param params API parameters
 * @returns The response of UpdateUserByEmail API
 * @since Zulip 10.0 (feature level 313)
 * @see https://zulip.com/api/update-user-by-email
 */
export async function updateUserByEmail(
  client: AxiosInstance,
  email: string,
  params: UpdateUserByEmailParams,
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

  const resp = await client.patch<GeneralSuccessResponse>(
    `/users/${encodeURIComponent(email)}`,
    body,
  )

  return resp.data
}

/**
 * Deactivate a user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @param params API parameters
 * @returns The response of DeactivateUser API
 * @see https://zulip.com/api/deactivate-user
 */
export async function deactivateUser(
  client: AxiosInstance,
  userId: number,
  params: DeactivateUserParams = {},
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    if (Array.isArray(value) || typeof value === 'object') {
      body.append(key, JSON.stringify(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.delete<GeneralSuccessResponse>(`/users/${userId}`, {
    data: body,
  })

  return resp.data
}

/**
 * Deactivate the current user.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of DeactivateSelf API
 * @see https://zulip.com/api/deactivate-own-user
 */
export async function deactivateSelf(client: AxiosInstance) {
  const resp = await client.delete<GeneralSuccessResponse>('/users/me')

  return resp.data
}

/**
 * Reactivate a user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @returns The response of ReactivateUser API
 * @see https://zulip.com/api/reactivate-user
 */
export async function reactivateUser(client: AxiosInstance, userId: number) {
  const resp = await client.post<GeneralSuccessResponse>(
    `/users/${userId}/reactivate`,
  )

  return resp.data
}

/**
 * Update user settings
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of UpdateUserSettings API
 * @see https://zulip.com/api/update-settings
 */
export async function updateUserSettings(
  client: AxiosInstance,
  params: UpdateUserSettingsParams,
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    if (Array.isArray(value) || typeof value === 'object') {
      body.append(key, JSON.stringify(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.patch<GeneralSuccessResponse>('/settings', body)

  return resp.data
}
