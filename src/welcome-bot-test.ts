import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * Parameters for TestWelcomeBotCustomMessage API
 * @since Zulip 11.0 (feature level 416)
 * @see https://zulip.com/api/test-welcome-bot-custom-message#parameters
 */
export type TestWelcomeBotCustomMessageParams = {
  /**
   * Custom text. The max length is 8000.
   * @see https://zulip.com/api/test-welcome-bot-custom-message#parameter-welcome_message_custom_text
   */
  welcome_message_custom_text: string
}

/**
 * The response of TestWelcomeBotCustomMessage API
 * @since Zulip 11.0 (feature level 416)
 * @see https://zulip.com/api/test-welcome-bot-custom-message#response
 */
export type TestWelcomeBotCustomMessageResponse = GeneralSuccessResponse & {
  /**
   * The ID of the message
   */
  message_id: number
}

/**
 * Sends a test Welcome Bot custom message to the acting administrator
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of TestWelcomeBotCustomMessage API
 * @since Zulip 11.0 (feature level 416)
 * @see https://zulip.com/api/test-welcome-bot-custom-message
 */
export async function testWelcomeBotCustomMessage(
  client: AxiosInstance,
  params: TestWelcomeBotCustomMessageParams,
) {
  const body = new URLSearchParams(params)

  const resp = await client.post<TestWelcomeBotCustomMessageResponse>(
    '/realm/test_welcome_bot_custom_message',
    body,
  )

  return resp.data
}
