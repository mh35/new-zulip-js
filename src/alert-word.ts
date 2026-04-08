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
 * Parameters for RemoveAlertWords API
 * @see https://zulip.com/api/remove-alert-words#parameters
 */
export type RemoveAlertWordsParams = {
  /**
   * Words to remove from the alert words list
   * @see https://zulip.com/api/remove-alert-words#parameter-alert_words
   */
  alert_words: string[]
}

/**
 * The response of RemoveAlertWords API
 * @see https://zulip.com/api/remove-alert-words#response
 */
export type RemoveAlertWordsResponse = GetAlertWordsResponse

/**
 * Get all alert words set by the user
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetAlertWords API
 * @see https://zulip.com/api/get-alert-words
 * @param signal AbortSignal to cancel the request
 */
export async function getAlertWords(
  client: AxiosInstance,
  signal?: AbortSignal,
) {
  const resp = await client.get<GetAlertWordsResponse>('/users/me/alert_words', {
    signal,
  })

  return resp.data
}

/**
 * Add alert words
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of AddAlertWords API
 * @see https://zulip.com/api/add-alert-words
 * @param signal AbortSignal to cancel the request
 */
export async function addAlertWords(
  client: AxiosInstance,
  params: AddAlertWordsParams,
  signal?: AbortSignal,
) {
  const body = new URLSearchParams({
    alert_words: JSON.stringify(params.alert_words),
  })

  const resp = await client.post<AddAlertWordsResponse>(
    '/users/me/alert_words',
    body,
    { signal },
  )

  return resp.data
}

/**
 * Remove alert words
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of RemoveAlertWords API
 * @see https://zulip.com/api/remove-alert-words
 * @param signal AbortSignal to cancel the request
 */
export async function removeAlertWords(
  client: AxiosInstance,
  params: RemoveAlertWordsParams,
  signal?: AbortSignal,
) {
  const body = new URLSearchParams({
    alert_words: JSON.stringify(params.alert_words),
  })

  const resp = await client.delete<RemoveAlertWordsResponse>(
    '/users/me/alert_words',
    {
      data: body,
      signal,
    },
  )
  return resp.data
}
