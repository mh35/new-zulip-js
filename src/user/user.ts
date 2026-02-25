import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'
import type { BotTypeValues, UserRoleValues } from '../constants'

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
