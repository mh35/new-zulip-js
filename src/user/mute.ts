import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'

/**
 * Mute a user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @returns The response of MuteUser API
 * @since Zulip 4.0 (feature level 48)
 * @see https://zulip.com/api/mute-user
 */
export async function muteUser(client: AxiosInstance, userId: number) {
  const resp = await client.post<GeneralSuccessResponse>(
    `/users/me/muted_users/${userId}`,
    new URLSearchParams(),
  )
  return resp.data
}

/**
 * Unmute a user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @returns The response of UnmuteUser API
 * @since Zulip 4.0 (feature level 48)
 * @see https://zulip.com/api/unmute-user
 */
export async function unmuteUser(client: AxiosInstance, userId: number) {
  const resp = await client.delete<GeneralSuccessResponse>(
    `/users/me/muted_users/${userId}`,
  )
  return resp.data
}
