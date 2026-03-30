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
