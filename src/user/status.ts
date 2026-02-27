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
 * Update status text parameters for UpdateUserStatus API
 */
type UpdateUserStatusUpdateStatusParams = {
  /**
   * The text content of the status message. Sending the empty string will clear the user's
   * status.
   * @see https://zulip.com/api/update-status-for-user#parameter-status_text
   */
  status_text: string
}

/**
 * Update emoji parameters for UpdateUserStatus API
 */
type UpdateUserStatusUpdateEmojiParams = {
  /**
   * The text content of the status message. Sending the empty string will clear the user's
   * status.
   * @see https://zulip.com/api/update-status-for-user#parameter-status_text
   */
  status_text?: string
  /**
   * The name for the emoji to associate with the user's status
   * @see https://zulip.com/api/update-status-for-user#parameter-emoji_name
   */
  emoji_name: string
  /**
   * A unique identifier, defining the specific emoji codepoint requested,
   * namespace of the reaction_type
   * @see https://zulip.com/api/update-status-for-user#parameter-emoji_code
   */
  emoji_code?: string
  /**
   * A string indicating the type of emoji. Each emoji reaction_type has an
   * independent namespace for values of emoji_code
   * @see https://zulip.com/api/update-status-for-user#parameter-reaction_type
   */
  reaction_type?: EmojiTypes
}

/**
 * Not updating emoji parameters for UpdateUserStatus API
 */
type UpdateUserStatusNoUpdateEmojiParams = {
  /**
   * The name for the emoji to associate with the user's status
   * @see https://zulip.com/api/update-status-for-user#parameter-emoji_name
   */
  emoji_name: never
  /**
   * A unique identifier, defining the specific emoji codepoint requested,
   * namespace of the reaction_type
   * @see https://zulip.com/api/update-status-for-user#parameter-emoji_code
   */
  emoji_code: never
  /**
   * A string indicating the type of emoji. Each emoji reaction_type has an
   * independent namespace for values of emoji_code
   * @see https://zulip.com/api/update-status-for-user#parameter-reaction_type
   */
  reaction_type: never
}

/**
 * Parameters for UpdateUserStatus API
 * @since Zulip 11.0 (feature level 407)
 * @see https://zulip.com/api/update-status-for-user#parameters
 */
export type UpdateUserStatusParams =
  | UpdateUserStatusUpdateEmojiParams
  | (UpdateUserStatusNoUpdateEmojiParams & UpdateUserStatusUpdateStatusParams)

/**
 * Direct message destination parameters for SetTypingStatus API
 */
type SetTypingStatusDirectDestinationParams = {
  /**
   * Destination type. For direct message, specify direct. For stream,
   * specify stream or channel. Default is direct
   * @since Zulip 4.0 (feature level 58)
   * @see https://zulip.com/api/set-typing-status#parameter-type
   */
  type?: 'direct'
  /**
   * Target user IDs
   * @see https://zulip.com/api/set-typing-status#parameter-to
   */
  to: number[]
  /**
   * Target stream ID
   * @since Zulip 8.0 (feature level 215)
   * @see https://zulip.com/api/set-typing-status#parameter-stream_id
   */
  stream_id: never
  /**
   * Target topic name
   * @since Zulip 4.0 (feature level 58)
   * @see https://zulip.com/api/set-typing-status#parameter-topic
   */
  topic: never
}

/**
 * Stream destination parameters for SetTypingStatus API
 */
type SetTypingStatusStreamDestinationParams = {
  /**
   * Destination type. For direct message, specify direct. For stream,
   * specify stream or channel. Default is direct
   * @since Zulip 4.0 (feature level 58)
   * @see https://zulip.com/api/set-typing-status#parameter-type
   */
  type: 'stream' | 'channel'
  /**
   * Target user IDs
   * @see https://zulip.com/api/set-typing-status#parameter-to
   */
  to: never
  /**
   * Target stream ID
   * @since Zulip 8.0 (feature level 215)
   * @see https://zulip.com/api/set-typing-status#parameter-stream_id
   */
  stream_id: number
  /**
   * Target topic name
   * @since Zulip 4.0 (feature level 58)
   * @see https://zulip.com/api/set-typing-status#parameter-topic
   */
  topic: string
}

/**
 * Parameters for SetTypingStatus API
 * @see https://zulip.com/api/set-typing-status#parameters
 */
export type SetTypingStatusParams = (
  | SetTypingStatusDirectDestinationParams
  | SetTypingStatusStreamDestinationParams
) & {
  /**
   * Started typing or stopped typing
   * @see https://zulip.com/api/set-typing-status#parameter-op
   */
  op: 'start' | 'stop'
}

/**
 * Parameters for SetTypingStatusForEdit API
 * @see https://zulip.com/api/set-typing-status-for-message-edit#parameters
 */
export type SetTypingStatusForEditParams = {
  /**
   * Started typing or stopped typing
   * @see https://zulip.com/api/set-typing-status-for-message-edit#parameter-op
   */
  op: 'start' | 'stop'
}

/**
 * User presence item corresponding to client.
 * This uses in GetUserPresence API.
 */
export type GetUserPresenceClientItem = {
  /**
   * When this update was received. If the timestamp is more than a few minutes
   * in the past, the user is offline.
   */
  timestamp: number
  /**
   * Whether the user had recently interacted with Zulip at the time of the timestamp
   */
  status: 'active' | 'idle'
}

/**
 * The presence object in GetUserPresence API
 */
export type GetUserPresenceObj = {
  /**
   * Aggregated presence status
   */
  aggregated: GetUserPresenceClientItem
  /**
   * Website presence status
   */
  website: GetUserPresenceClientItem
}

/**
 * The response of GetUserPresence API
 * @see https://zulip.com/api/get-user-presence#response
 */
export type GetUserPresenceResponse = GeneralSuccessResponse & {
  /**
   * The presence data of the user
   */
  presence: GetUserPresenceObj
}

/**
 * Aggregated user presence item for GetAllUserPresence API
 */
export type GetAllUserPresenceClientAggregatedItem = {
  /**
   * The client name. Starting with Zulip 7.0 (feature level 178), always website.
   */
  client: 'website'
  /**
   * Whether the user had recently interacted with Zulip at the time of the timestamp
   */
  status: 'active' | 'idle'
  /**
   * When this update was received. If the timestamp is more than a few minutes
   * in the past, the user is offline.
   */
  timestamp: number
}

/**
 * Client-specific user presence item for GetAllUserPresence API
 */
export type GetAllUserPresenceClientWebsiteItem = {
  /**
   * The client name. Starting with Zulip 7.0 (feature level 178), always website.
   */
  client: 'website'
  /**
   * Whether the user had recently interacted with Zulip at the time of the timestamp
   */
  status: 'active' | 'idle'
  /**
   * When this update was received. If the timestamp is more than a few minutes
   * in the past, the user is offline.
   */
  timestamp: number
  /**
   * Whether the client is capable of showing mobile/push notifications to the user
   */
  pushable: boolean
}

/**
 * The user item of GetAllUserPresence API
 */
export type GetAllUserPresenceUserItem = {
  /**
   * Aggregated presence data
   */
  aggregated: GetAllUserPresenceClientAggregatedItem
  /**
   * Website presence data
   */
  website: GetAllUserPresenceClientWebsiteItem
}

/**
 * The response of GetAllUserPresence API
 * @see https://zulip.com/api/get-presence#response
 */
export type GetAllUserPresenceResponse = GeneralSuccessResponse & {
  /**
   * The server timestamp
   */
  server_timestamp: number
  /**
   * Users' presence data with user email key
   */
  presences: Record<string, GetAllUserPresenceUserItem>
}

/**
 * Initialize parameter for UpdatePresence API
 */
type UpdatePresenceForInitializeParams = {
  /**
   * The identifier that specifies what presence data the client already has received
   * @since Zulip 9.0 (feature level 263)
   * @see https://zulip.com/api/update-presence#parameter-last_update_id
   */
  last_update_id: -1
  /**
   * Limits how far back in time to fetch user presence data. Default is 14 days
   * @since Zulip 10.0 (feature level 288)
   * @see https://zulip.com/api/update-presence#parameter-history_limit_days
   */
  history_limit_days?: number
  /**
   * Whether to get slim presence or not
   * @deprecated Since Zulip 9.0 (feature level 263), use last_update_id instead
   * @see https://zulip.com/api/update-presence#parameter-slim_presence
   */
  slim_presence: never
}

/**
 * Continuous parameter for UpdatePresence API
 */
type UpdatePresenceForUpdateParams = {
  /**
   * The identifier that specifies what presence data the client already has received
   * @since Zulip 9.0 (feature level 263)
   * @see https://zulip.com/api/update-presence#parameter-last_update_id
   */
  last_update_id: Exclude<number, -1>
  /**
   * Limits how far back in time to fetch user presence data. Default is 14 days
   * @since Zulip 10.0 (feature level 288)
   * @see https://zulip.com/api/update-presence#parameter-history_limit_days
   */
  history_limit_days: never
  /**
   * Whether to get slim presence or not
   * @deprecated Since Zulip 9.0 (feature level 263), use last_update_id instead
   * @see https://zulip.com/api/update-presence#parameter-slim_presence
   */
  slim_presence: never
}

/**
 * Legacy parameters to get slim presence for UpdatePresence API
 */
type UpdatePresenceForUpdateLegacySlimParams = {
  /**
   * The identifier that specifies what presence data the client already has received
   * @since Zulip 9.0 (feature level 263)
   * @see https://zulip.com/api/update-presence#parameter-last_update_id
   */
  last_update_id: never
  /**
   * Limits how far back in time to fetch user presence data. Default is 14 days
   * @since Zulip 10.0 (feature level 288)
   * @see https://zulip.com/api/update-presence#parameter-history_limit_days
   */
  history_limit_days: never
  /**
   * Whether to get slim presence or not
   * @deprecated Since Zulip 9.0 (feature level 263), use last_update_id instead
   * @see https://zulip.com/api/update-presence#parameter-slim_presence
   */
  slim_presence: true
}

/**
 * Legacy parameters to get full presence for UpdatePresence API
 */
type UpdatePresenceForUpdateLegacyFullParams = {
  /**
   * The identifier that specifies what presence data the client already has received
   * @since Zulip 9.0 (feature level 263)
   * @see https://zulip.com/api/update-presence#parameter-last_update_id
   */
  last_update_id: never
  /**
   * Limits how far back in time to fetch user presence data. Default is 14 days
   * @since Zulip 10.0 (feature level 288)
   * @see https://zulip.com/api/update-presence#parameter-history_limit_days
   */
  history_limit_days: never
  /**
   * Whether to get slim presence or not
   * @deprecated Since Zulip 9.0 (feature level 263), use last_update_id instead
   * @see https://zulip.com/api/update-presence#parameter-slim_presence
   */
  slim_presence?: false
}

/**
 * Ping only parameters for UpdatePresence API
 */
type UpdatePresencePingOnlyBaseParams = {
  /**
   * Whether the client is sending a ping-only request. If true, the server
   * does not send presences data. Default is false
   * @see https://zulip.com/api/update-presence#parameter-ping_only
   */
  ping_only: true
}

/**
 * Not ping only parameters for UpdatePresence API
 */
type UpdatePresenceNotPingOnlyBaseParams = {
  /**
   * Whether the client is sending a ping-only request. If true, the server
   * does not send presences data. Default is false
   * @see https://zulip.com/api/update-presence#parameter-ping_only
   */
  ping_only?: false
}

/**
 * Common parameters for UpdatePresence API
 */
type UpdatePresenceCommonParams = {
  /**
   * Whether the user has interacted with the client since the previous presence
   * request from this client. Default is false
   * @see https://zulip.com/api/update-presence#parameter-new_user_input
   */
  new_user_input?: boolean
  /**
   * The status of the user on this client
   * @see https://zulip.com/api/update-presence#parameter-status
   */
  status: 'idle' | 'active'
}

/**
 * Ping only parameters for UpdatePresence API
 * @see https://zulip.com/api/update-presence#parameters
 */
export type UpdatePresencePingOnlyParams = (
  | UpdatePresenceForInitializeParams
  | UpdatePresenceForUpdateParams
  | UpdatePresenceForUpdateLegacyFullParams
) &
  UpdatePresencePingOnlyBaseParams &
  UpdatePresenceCommonParams

/**
 * Slim presence parameters for UpdatePresence API
 * @see https://zulip.com/api/update-presence#parameters
 */
export type UpdatePresenceSlimParams = (
  | UpdatePresenceForInitializeParams
  | UpdatePresenceForUpdateParams
  | UpdatePresenceForUpdateLegacySlimParams
) &
  UpdatePresenceNotPingOnlyBaseParams &
  UpdatePresenceCommonParams

/**
 * Legacy full presence parameters for UpdatePresence API
 * @deprecated Since Zulip 9.0 (feature level 263), use modern parameters
 * @see https://zulip.com/api/update-presence#parameters
 */
export type UpdatePresenceLegacyParams =
  UpdatePresenceForUpdateLegacyFullParams &
    UpdatePresenceNotPingOnlyBaseParams &
    UpdatePresenceCommonParams

/**
 * Parameters for UpdatePresence API
 * @see https://zulip.com/api/update-presence#parameters
 */
export type UpdatePresenceParams =
  | UpdatePresencePingOnlyParams
  | UpdatePresenceSlimParams
  | UpdatePresenceLegacyParams

/**
 * Base response of UpdatePresence API
 */
type UpdatePresenceResponseCommon = GeneralSuccessResponse & {
  /**
   * The identifier for the latest user presence data returned in the presences data
   * of the response.
   */
  presence_last_update_id: number
}

/**
 * Modern user presence item for UpdatePresence API
 */
type UpdatePresenceResponseModernUserItem = {
  /**
   * The UNIX timestamp of the last time a client connected to Zulip reported
   * that the user was actually present
   */
  active_timestamp: number
  /**
   * The UNIX timestamp of the last time the user had a client connected to Zulip,
   * including idle clients where the user hasn't interacted with the system recently
   */
  idle_timestamp: number
}

/**
 * Ping response of UpdatePresence API
 * @see https://zulip.com/api/update-presence#response
 */
export type UpdatePresenceResponseWithoutPresences =
  UpdatePresenceResponseCommon & {
    /**
     * The time when the server fetched the presences data included in the response
     */
    server_timestamp: never
    /**
     * Presence data. If slim style, key is the user ID, otherwise user email is the key.
     */
    presences: never
  }

/**
 * Modern slim presence response of UpdatePresence API
 * @see https://zulip.com/api/update-presence#response
 */
export type UpdatePresenceResponseWithModernPresence =
  UpdatePresenceResponseCommon & {
    /**
     * The time when the server fetched the presences data included in the response
     */
    server_timestamp: number
    /**
     * Presence data. If slim style, key is the user ID, otherwise user email is the key.
     */
    presences: Record<string, UpdatePresenceResponseModernUserItem>
  }

/**
 * Legacy full presence response of UpdatePresence API
 * @deprecated Zulip 9.0 (feature level 263)
 */
export type UpdatePresenceResponseWithLegacyPresence =
  UpdatePresenceResponseCommon & {
    /**
     * The time when the server fetched the presences data included in the response
     */
    server_timestamp: number
    /**
     * Presence data. If slim style, key is the user ID, otherwise user email is the key.
     */
    presences: Record<string, GetAllUserPresenceUserItem>
  }

/**
 * Response of UpdatePresence API
 * @see https://zulip.com/api/update-presence#response
 */
export type UpdatePresenceResponse =
  | UpdatePresenceResponseWithoutPresences
  | UpdatePresenceResponseWithModernPresence
  | UpdatePresenceResponseWithLegacyPresence

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

/**
 * Update status of the user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @param params API parameters
 * @returns The response of UpdateUserStatus API
 * @since Zulip 11.0 (feature level 407)
 * @see https://zulip.com/api/update-status-for-user
 */
export async function updateUserStatus(
  client: AxiosInstance,
  userId: number,
  params: UpdateUserStatusParams,
) {
  const body = new URLSearchParams(params)

  const resp = await client.post<GeneralSuccessResponse>(
    `/users/${userId}/status`,
    body,
  )

  return resp.data
}

/**
 * Set typing status
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of SetTypingStatus API
 * @see https://zulip.com/api/set-typing-status
 */
export async function setTypingStatus(
  client: AxiosInstance,
  params: SetTypingStatusParams,
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

  const resp = await client.post<GeneralSuccessResponse>('/typing', body)

  return resp.data
}

/**
 * Set typing status for editing message
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param messageId Message ID
 * @param params API parameters
 * @returns The response of SetTypingStatusForEdit API
 * @since Zulip 10.0 (feature level 351)
 * @see https://zulip.com/api/set-typing-status-for-message-edit
 */
export async function setTypingStatusForEdit(
  client: AxiosInstance,
  messageId: number,
  params: SetTypingStatusForEditParams,
) {
  const body = new URLSearchParams(params)

  const resp = await client.post<GeneralSuccessResponse>(
    `/messages/${messageId}/typing`,
    body,
  )

  return resp.data
}

/**
 * Get user presence
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userIdOrEmail ID or email address of the user
 * @returns The response of GetUserPresence API
 * @see https://zulip.com/api/get-user-presence
 */
export async function getUserPresence(
  client: AxiosInstance,
  userIdOrEmail: string | number,
) {
  const resp = await client.get<GetUserPresenceResponse>(
    `/users/${encodeURIComponent(String(userIdOrEmail))}/presence`,
  )

  return resp.data
}

/**
 * Get all user presence data
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetAllUserPresence API
 * @see https://zulip.com/api/get-presence
 */
export async function getAllUserPresence(client: AxiosInstance) {
  const resp = await client.get<GetAllUserPresenceResponse>('/realm/presence')

  return resp.data
}

/**
 * Update presence with ping only
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of UpdatePresence API
 * @see https://zulip.com/api/update-presence
 */
export async function updatePresence(
  client: AxiosInstance,
  params: UpdatePresencePingOnlyParams,
): Promise<UpdatePresenceResponseWithoutPresences>
/**
 * Update presence with getting slim presence data
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of UpdatePresence API
 * @see https://zulip.com/api/update-presence
 */
export async function updatePresence(
  client: AxiosInstance,
  params: UpdatePresenceSlimParams,
): Promise<UpdatePresenceResponseWithModernPresence>
/**
 * Update presence with getting legacy full presence data
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of UpdatePresence API
 * @deprecated Since Zulip 9.0 (feature level 263), use modern presence
 * @see https://zulip.com/api/update-presence
 */
export async function updatePresence(
  client: AxiosInstance,
  params: UpdatePresenceLegacyParams,
): Promise<UpdatePresenceResponseWithLegacyPresence>
export async function updatePresence(
  client: AxiosInstance,
  params: UpdatePresenceParams,
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    body.append(key, String(value))
  }

  const resp = await client.post<UpdatePresenceResponse>(
    '/users/me/presence',
    body,
  )

  return resp.data
}
