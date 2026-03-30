import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'

/**
 * Parameters for SendE2eeTestNotification API
 * @since Zulip 11.0 (feature level 420)
 * @see https://zulip.com/api/e2ee-test-notify#parameters
 */
export type SendE2eeTestNotificationParams = {
  /**
   * Device ID
   * @since Zulip 12.0 (feature level 468)
   * @see https://zulip.com/api/e2ee-test-notify#parameter-device_id
   */
  device_id?: number
}

/**
 * Send E2EE test notification to the target device or all devices
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of SendE2eeTestNotification API
 * @since Zulip 11.0 (feature level 420)
 * @see https://zulip.com/api/e2ee-test-notify
 */
export async function sendE2eeTestNotification(
  client: AxiosInstance,
  params: SendE2eeTestNotificationParams = {},
) {
  const body = new URLSearchParams()
  if (params.device_id !== undefined) {
    body.append('device_id', String(params.device_id))
  }

  const resp = await client.post<GeneralSuccessResponse>(
    '/mobile_push/e2ee/test_notification',
    body,
  )

  return resp.data
}
