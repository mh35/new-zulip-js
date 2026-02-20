import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * The item of GetDrafts API response
 */
export type GetDraftsResponseItem = {
  /**
   * The ID of the draft
   */
  id: number
  /**
   * The type of message
   */
  type: '' | 'stream' | 'private'
  /**
   * The target stream or user IDs.
   */
  to: number[]
  /**
   * The topic of the message.
   *
   * If direct message, empty string
   */
  topic: string
  /**
   * The content of the draft
   */
  content: string
  /**
   * Last modified UNIX timestamp
   */
  timestamp: number
}

/**
 * The response of GetDrafts API
 * @see https://zulip.com/api/get-drafts#response
 */
export type GetDraftsResponse = GeneralSuccessResponse & {
  /**
   * The number of drafts
   */
  count: number
  /**
   * Drafts
   */
  drafts: GetDraftsResponseItem[]
}

/**
 * Get all drafts
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetDrafts API
 * @see https://zulip.com/api/get-drafts
 */
export async function getDrafts(client: AxiosInstance) {
  const resp = await client.get<GetDraftsResponse>('/drafts')

  return resp.data
}
