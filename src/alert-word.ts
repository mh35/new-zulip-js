import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * The response of GetAlertWords API
 * @see https://zulip.com/api/get-alert-words#response
 */
export type GetAlertWordsResponse = GeneralSuccessResponse & {
  /**
   * Alert words
   */
  alert_words: string[]
}

/**
 * Get all alert words set by the user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetAlertWords API
 * @see https://zulip.com/api/get-alert-words
 */
export async function getAlertWords(client: AxiosInstance) {
  const resp = await client.get<GetAlertWordsResponse>('/users/me/alert_words')

  return resp.data
}
