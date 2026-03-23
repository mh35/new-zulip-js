import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * The response of GetBotApiKey API
 * @see https://zulip.com/api/get-bot-api-key#response
 * @since Zulip 12.0 (feature level 463)
 */
export type GetBotApiKeyResponse = GeneralSuccessResponse & {
  /**
   * API key of the bot
   */
  api_key: string
}

/**
 * The response of RegenerateBotApiKey API
 * @see
 */
export type RegenerateBotApiKeyResponse = GetBotApiKeyResponse

/**
 * Get the API key for the bot
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param botUserId User ID of the bot
 * @returns The response of GetBotApiKey API
 * @since Zulip 12.0 (feature level 463)
 * @see https://zulip.com/api/get-bot-api-key
 */
export async function getBotApiKey(client: AxiosInstance, botUserId: number) {
  const resp = await client.get<GetBotApiKeyResponse>(
    `/bots/${botUserId}/api_key`,
  )

  return resp.data
}

/**
 * Regenerate the API key for the bot
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param botUserId User ID of the bot
 * @returns The response of RegenerateBotApiKey response
 * @see https://zulip.com/api/regenerate-bot-api-key
 */
export async function regenerateBotApiKey(
  client: AxiosInstance,
  botUserId: number,
) {
  const resp = await client.post<RegenerateBotApiKeyResponse>(
    `/bots/${botUserId}/api_key/regenerate`,
    new URLSearchParams(),
  )

  return resp.data
}
