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
