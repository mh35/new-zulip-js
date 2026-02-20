import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * The response item of GetSnippets API
 */
export type GetSnippetsResponseItem = {
  id: number
  title: string
  content: string
  date_created: number
}

/**
 * The response of GetSnippets API
 * @since Zulip 10.0 (feature level 297)
 * @see https://zulip.com/api/get-saved-snippets#response
 */
export type GetSnippetsResponse = GeneralSuccessResponse & {
  /**
   * Saved snippets
   */
  saved_snippets: GetSnippetsResponseItem[]
}

/**
 * Get all saved snippets
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetSnippets API
 * @since Zulip 10.0 (feature level 297)
 * @see https://zulip.com/api/get-saved-snippets
 */
export async function getSnippets(client: AxiosInstance) {
  const resp = await client.get<GetSnippetsResponse>('/saved_snippets')

  return resp.data
}
