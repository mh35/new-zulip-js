import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'

/**
 * Parameters for SendTestMobileNotification API
 * @since Zulip 8.0 (feature level 217)
 * @deprecated From Zulip 11.0 (feature level 420), use E2EE notification instead
 * @see https://zulip.com/api/test-notify#parameters
 */
export type SendTestMobileNotificationParams = {
  /**
   * The push token for the device to which to send the test notification
   * @see https://zulip.com/api/test-notify#parameter-token
   */
  token?: string
}

/**
 * Parameters for RegisterApnsToken API
 * @deprecated From Zulip 11.0 (feature level 406), use E2EE notification instead
 * @see https://zulip.com/api/add-apns-token#parameters
 */
export type RegisterApnsTokenParams = {
  /**
   * The token provided by the device
   * @see https://zulip.com/api/add-apns-token#parameter-token
   */
  token: string
  /**
   * The ID of the Zulip app that is making the request
   * @see https://zulip.com/api/add-apns-token#parameter-appid
   */
  appid: string
}

/**
 * Parameters for UnregisterApnsToken API
 * @deprecated From Zulip 11.0 (feature level 406), use E2EE notification instead
 * @see https://zulip.com/api/remove-apns-token#parameters
 */
export type UnregisterApnsTokenParams = {
  /**
   * The token provided by the device
   * @see https://zulip.com/api/remove-apns-token#parameter-token
   */
  token: string
}

/**
 * Send a test notification to the target device or all devices
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of SendTestMobileNotification API
 * @since Zulip 8.0 (feature level 217)
 * @deprecated From Zulip 11.0 (feature level 420), use E2EE notification instead
 * @see https://zulip.com/api/test-notify
 */
export async function sendTestMobileNotification(
  client: AxiosInstance,
  params: SendTestMobileNotificationParams = {},
) {
  const body = new URLSearchParams()
  if (params.token !== undefined) {
    body.append('token', params.token)
  }

  const resp = await client.post<GeneralSuccessResponse>(
    '/mobile_push/test_notification',
    body,
  )

  return resp.data
}

/**
 * Register an APNs token to receive iOS push notification
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of RegisterApnsToken API
 * @deprecated From Zulip 11.0 (feature level 406), use E2EE notification instead
 * @see https://zulip.com/api/add-apns-token
 */
export async function registerApnsToken(
  client: AxiosInstance,
  params: RegisterApnsTokenParams,
) {
  const body = new URLSearchParams(params)

  const resp = await client.post<GeneralSuccessResponse>(
    '/users/me/apns_device_token',
    body,
  )

  return resp.data
}

/**
 * Unregister an APNs token
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of UnregisterApnsToken API
 * @deprecated From Zulip 11.0 (feature level 406), use E2EE notification instead
 * @see https://zulip.com/api/remove-apns-token
 */
export async function unregisterApnsToken(
  client: AxiosInstance,
  params: UnregisterApnsTokenParams,
) {
  const body = new URLSearchParams(params)

  const resp = await client.delete<GeneralSuccessResponse>(
    '/users/me/apns_device_token',
    {
      data: body,
    },
  )

  return resp.data
}
