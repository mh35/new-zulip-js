import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'
import type { EmojiTypes } from '../message'

/**
 * User status with Emoji parameters for GetUserStatus API
 */
type GetUserStatusResponseEmojiStatus = {
  /**
   * If present, the name for the emoji to associate with the user's status
   */
  emoji_name: string
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
 * User status without Emoji parameters for GetUserStatus API
 */
type GetUserStatusResponseNoEmojiStatus = {
  /**
   * If present, the name for the emoji to associate with the user's status
   */
  emoji_name: never
  /**
   * If present, a unique identifier, defining the specific emoji codepoint requested,
   * namespace of the reaction_type
   */
  emoji_code: never
  /**
   * If present, a string indicating the type of emoji. Each emoji reaction_type has an
   * independent namespace for values of emoji_code
   */
  reaction_type: never
}

/**
 * User status for GetUserStatus API
 */
export type GetUserStatusResponseStatus = (
  | GetUserStatusResponseEmojiStatus
  | GetUserStatusResponseNoEmojiStatus
) & {
  /**
   * If present, marked as away
   * @deprecated Since Zulip 6.0 (feature level 148), use GetUserPresence API
   */
  away?: boolean
  /**
   * If present, the user status message
   */
  status_text?: string
}

/**
 * Update status parameters for UpdateStatus API
 */
type UpdateStatusUpdateStatusParams = {
  /**
   * The text content of the status message. Sending the empty string will clear the user's
   * status.
   * @see https://zulip.com/api/update-status#parameter-status_text
   */
  status_text: string
}

/**
 * Update emoji parameters for UpdateStatus API
 */
type UpdateStatusUpdateEmojiParams = {
  /**
   * The text content of the status message. Sending the empty string will clear the user's
   * status.
   * @see https://zulip.com/api/update-status#parameter-status_text
   */
  status_text?: string
  /**
   * The name for the emoji to associate with the user's status
   * @since Zulip 5.0 (feature level 86)
   * @see https://zulip.com/api/update-status#parameter-emoji_name
   */
  emoji_name: string
  /**
   * A unique identifier, defining the specific emoji codepoint requested,
   * namespace of the reaction_type
   * @since Zulip 5.0 (feature level 86)
   * @see https://zulip.com/api/update-status#parameter-emoji_code
   */
  emoji_code?: string
  /**
   * A string indicating the type of emoji. Each emoji reaction_type has an
   * independent namespace for values of emoji_code
   * @since Zulip 5.0 (feature level 86)
   * @see https://zulip.com/api/update-status#parameter-reaction_type
   */
  reaction_type?: EmojiTypes
  /**
   * Whether the user should be marked as "away"
   * @deprecated Since Zulip 6.0 (feature level 148), use UpdatePresence API
   * @see https://zulip.com/api/update-status#parameter-away
   */
  away?: boolean
}

/**
 * Not updating emoji parameters for UpdateStatus API
 */
type UpdateStatusNotUpdateEmojiParams = {
  /**
   * The name for the emoji to associate with the user's status
   * @since Zulip 5.0 (feature level 86)
   * @see https://zulip.com/api/update-status#parameter-emoji_name
   */
  emoji_name: never
  /**
   * A unique identifier, defining the specific emoji codepoint requested,
   * namespace of the reaction_type
   * @since Zulip 5.0 (feature level 86)
   * @see https://zulip.com/api/update-status#parameter-emoji_code
   */
  emoji_code: never
  /**
   * A string indicating the type of emoji. Each emoji reaction_type has an
   * independent namespace for values of emoji_code
   * @since Zulip 5.0 (feature level 86)
   * @see https://zulip.com/api/update-status#parameter-reaction_type
   */
  reaction_type: never
}

/**
 * Update away parameters for UpdateStatus API
 */
type UpdateStatusUpdateAwayParams = {
  /**
   * Whether the user should be marked as "away"
   * @deprecated Since Zulip 6.0 (feature level 148), use UpdatePresence API
   * @see https://zulip.com/api/update-status#parameter-away
   */
  away: boolean
}

/**
 * Parameters for UpdateStatus API
 * @see https://zulip.com/api/update-status#parameters
 */
export type UpdateStatusParams =
  | UpdateStatusUpdateEmojiParams
  | (UpdateStatusNotUpdateEmojiParams &
      (UpdateStatusUpdateStatusParams | UpdateStatusUpdateAwayParams))

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

/**
 * Update status of the current user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of UpdateStatus API
 * @see https://zulip.com/api/update-status
 */
export async function updateStatus(
  client: AxiosInstance,
  params: UpdateStatusParams,
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    body.append(key, String(value))
  }

  const resp = await client.post<GeneralSuccessResponse>(
    '/users/me/status',
    body,
  )

  return resp.data
}
