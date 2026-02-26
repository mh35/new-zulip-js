import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'
import type { EmojiTypes } from '../message'

/**
 * User status for GetUserStatus API
 */
export type GetUserStatusResponseStatus = {
  /**
   * If present, marked as away
   * @deprecated Since Zulip 6.0 (feature level 148), use GetUserPresence API
   */
  away?: boolean
  /**
   * If present, the user status message
   */
  status_text?: string
  /**
   * If present, the name for the emoji to associate with the user's status
   */
  emoji_name?: string
  /**
   * If present, a unique identifier, defining the specific emoji codepoint requested,
   * namespace of the reaction_type
   */
  emoji_code?: string
  /**
   * If present, a string indicating the type of emoji. Each emoji reaction_type has an
   * independent namespace for values of emoji_code
   */
  reaction_type?: EmojiTypes
}

/**
 * The response of GetUserStatus API
 * @since Zulip 9.0 (feature level 262)
 * @see https://zulip.com/api/get-user-status#response
 */
export type GetUserStatusResponse = GeneralSuccessResponse & {
  /**
   * The user status
   */
  status: GetUserStatusResponseStatus
}

/**
 * Get a user status
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @returns The response of GetUserStatus API
 * @since Zulip 9.0 (feature level 262)
 * @see https://zulip.com/api/get-user-status
 */
export async function getUserStatus(client: AxiosInstance, userId: number) {
  const resp = await client.get<GetUserStatusResponse>(
    `/users/${userId}/status`,
  )

  return resp.data
}
