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

type UpdateUserSettingsParamsWithTargetUserBase = {
  target_users: UpdateUserSettingsTargetUsersParams
  email?: never
  old_password?: never
  new_password?: never
  allow_private_data_export?: never
  email_address_visibility?: never
  enable_digest_emails?: never
  enable_login_emails?: never
  enable_marketing_emails?: never
  presence_enabled?: never
  send_private_typing_notifications?: never
  send_read_receipts?: never
  send_stream_typing_notifications?: never
}

type UpdateUserSettingsParamsWithoutTargetUserBase = {
  target_users?: never
}

export type UpdateUserSettingsParamsWebHomeViewValues =
  | 'recent'
  | 'inbox'
  | 'all_messages'

export type UpdateUserSettingsParamsWebAnimateImagePreviewsValues =
  | 'always'
  | 'on_hover'
  | 'never'

export type UpdateUserSettingsParamsEmojiSetValues =
  | 'google'
  | 'twitter'
  | 'text'

export type UpdateUserSettingsParamsResolvedTopicNoticeAutoReadPolicyValues =
  | 'always'
  | 'except_followed'
  | 'never'

type UpdateUserSettingsEditableParams = {
  full_name?: string
  email?: string
  old_password?: string
  new_password?: string
  twenty_four_hour_time?: boolean
  web_mark_read_on_scroll_policy?: UserSettingsWebMarkReadScrollPolicyValues
  web_channel_default_view?: UserSettingsWebChannelDefaultViewValues
  starred_message_counts?: boolean
  receives_typing_notifications?: boolean
  web_suggest_update_timezone?: boolean
  fluid_layout_width?: boolean
  high_contrast_mode?: boolean
  web_font_size_px?: number
  web_line_height_percent?: number
  color_scheme?: UserSettingsColorSchemeValues
  enable_drafts_synchronization?: boolean
  translate_emoticons?: boolean
  display_emoji_reaction_users?: boolean
  default_language?: string
  web_home_view?: UpdateUserSettingsParamsWebHomeViewValues
  web_escape_navigates_to_home_view?: boolean
  left_side_userlist?: boolean
  emojiset?: UpdateUserSettingsParamsEmojiSetValues
  demote_inactive_streams?: UserSettingsDemoteInactiveStreamsValues
  user_list_style?: UserSettingsUserListStyleValues
  web_animate_image_previews?: UpdateUserSettingsParamsWebAnimateImagePreviewsValues
  web_stream_unreads_count_display_policy?: UserSettingsWebStreamUnreadsCountDisplayPolicyValues
  hide_ai_features?: boolean
  web_inbox_show_channel_folders?: boolean
  web_left_sidebar_show_channel_folders?: boolean
  web_left_sidebar_unreads_count_summary?: boolean
  timezone?: string
  enable_stream_desktop_notifications?: boolean
  enable_stream_email_notifications?: boolean
  enable_stream_push_notifications?: boolean
  enable_stream_audible_notifications?: boolean
  notification_sound?: string
  enable_desktop_notifications?: boolean
  enable_sounds?: boolean
  email_notifications_batching_period_seconds?: number
  enable_offline_email_notifications?: boolean
  enable_offline_push_notifications?: boolean
  enable_online_push_notifications?: boolean
  enable_followed_topic_desktop_notifications?: boolean
  enable_followed_topic_email_notifications?: boolean
  enable_followed_topic_push_notifications?: boolean
  enable_followed_topic_audible_notifications?: boolean
  enable_digest_emails?: boolean
  enable_marketing_emails?: boolean
  enable_login_emails?: boolean
  message_content_in_email_notifications?: boolean
  pm_content_in_desktop_notifications?: boolean
  wildcard_mentions_notify?: boolean
  enable_followed_topic_wildcard_mentions_notify?: boolean
  desktop_icon_count_display?: UserSettingsDesktopIconCountDisplayValues
  realm_name_in_email_notifications_policy?: UserSettingsRealmNameInEmailNotificationsPolicyValues
  automatically_follow_topics_policy?: UserSettingsAutomaticallyFollowTopicsPolicyValues
  automatically_unmute_topics_in_muted_streams_policy?: UserSettingsAutomaticallyUnmuteTopicsInMutedChannelsPolicyValues
  automatically_follow_topics_where_mentioned?: boolean
  resolved_topic_notice_auto_read_policy?: UpdateUserSettingsParamsResolvedTopicNoticeAutoReadPolicyValues
  presence_enabled?: boolean
  enter_sends?: boolean
  send_private_typing_notifications?: boolean
  send_stream_typing_notifications?: boolean
  send_read_receipts?: boolean
  allow_private_data_export?: boolean
  email_address_visibility?: UserSettingsEmailAddressVisibilityValues
  web_navigate_to_sent_message?: boolean
}

type UpdateUserSettingsEditableParamsForTargetUsers = Omit<
  UpdateUserSettingsEditableParams,
  UpdateUserSettingsProtectedParamKeys
>

type UpdateUserSettingsAtLeastOne<T extends Record<string, unknown>> = {
  [Key in keyof T]-?: Required<Pick<T, Key>> & Partial<Omit<T, Key>>
}[keyof T]

type UpdateUserSettingsSelfEditableParams =
  UpdateUserSettingsAtLeastOne<UpdateUserSettingsEditableParams>

type UpdateUserSettingsTargetUsersEditableParams =
  UpdateUserSettingsAtLeastOne<UpdateUserSettingsEditableParamsForTargetUsers>

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
