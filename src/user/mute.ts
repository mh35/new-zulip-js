import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'

/**
 * Mute a user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @returns The response of MuteUser API
 * @since Zulip 4.0 (feature level 48)
 */
export async function muteUser(client: AxiosInstance, userId: number) {
  const resp = await client.post<GeneralSuccessResponse>(
    `/users/me/muted_users/${userId}`,
    new URLSearchParams(),
  )
  return resp.data
}
