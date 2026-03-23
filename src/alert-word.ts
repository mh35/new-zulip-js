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
 * Parameters for AddAlertWords API
 * @see https://zulip.com/api/add-alert-words#parameters
 */
export type AddAlertWordsParams = {
  /**
   * Words to add to the alert words list
   * @see https://zulip.com/api/add-alert-words#parameter-alert_words
   */
  alert_words: string[]
}

/**
 * The response of AddAlertWords API
 * @see https://zulip.com/api/add-alert-words#response
 */
export type AddAlertWordsResponse = GetAlertWordsResponse

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

/**
 * Add alert words
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of AddAlertWords API
 * @see https://zulip.com/api/add-alert-words
 */
export async function addAlertWords(
  client: AxiosInstance,
  params: AddAlertWordsParams,
) {
  const body = new URLSearchParams({
    alert_words: JSON.stringify(params.alert_words),
  })

  const resp = await client.post<AddAlertWordsResponse>(
    '/users/me/alert_words',
    body,
  )

  return resp.data
}
