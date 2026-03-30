import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * The response of RegisterDevice API
 * @since Zulip 12.0 (feature level 468)
 * @see https://zulip.com/api/register-client-device#response
 */
export type RegisterDeviceResponse = GeneralSuccessResponse & {
  /**
   * Device ID
   */
  device_id: number
}

/**
 * Register a logged-in device to prepare to register E2EE push notifications.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of RegisterDevice API
 * @since Zulip 12.0 (feature level 468)
 * @see https://zulip.com/api/register-client-device
 */
export async function registerDevice(client: AxiosInstance) {
  const resp = await client.post<RegisterDeviceResponse>(
    '/register_client_device',
    new URLSearchParams(),
  )

  return resp.data
}
