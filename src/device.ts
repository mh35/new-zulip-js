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
 * Parameters of UnregisterDevice API
 * @since Zulip 12.0 (feature level 470)
 * @see https://zulip.com/api/remove-client-device#parameters
 */
export type UnregisterDeviceParams = {
  /**
   * Device ID
   * @see https://zulip.com/api/remove-client-device#parameter-device_id
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

/**
 * Unregister a logged-in device to remove records created by RegisterDevice API
 * to log out.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of UnregisterDevice API
 * @since Zulip 12.0 (feature level 470)
 * @see https://zulip.com/api/remove-client-device
 */
export async function unregisterDevice(
  client: AxiosInstance,
  params: UnregisterDeviceParams,
) {
  const body = new URLSearchParams({ device_id: String(params.device_id) })

  const resp = await client.post<GeneralSuccessResponse>(
    '/remove_client_device',
    body,
  )

  return resp.data
}
