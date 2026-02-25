import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'

/**
 * Parameters of GetChannelTopics API
 * @see https://zulip.com/api/get-stream-topics#parameters
 */
export type GetChannelTopicsParams = {
  /**
   * Allow empty topic name or not. Default is false
   * @since Zulip 10.0 (feature level 334)
   * @see https://zulip.com/api/get-stream-topics#parameter-allow_empty_topic_name
   */
  allow_empty_topic_name?: boolean
}

/**
 * The topic item in the response of GetChannelTopics API
 */
export type GetChannelTopicsResponseItem = {
  /**
   * The ID of the message in the topic
   */
  max_id: number
  /**
   * The topic name
   */
  name: string
}

/**
 * The response of GetChannelTopics API
 * @see https://zulip.com/api/get-stream-topics#response
 */
export type GetChannelTopicsResponse = GeneralSuccessResponse & {
  /**
   * Topics
   */
  topics: GetChannelTopicsResponseItem[]
}

/**
 * Get topics in a channel
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param streamId Stream ID
 * @param params API parameters
 * @returns The response of GetChannelTopics API
 * @see https://zulip.com/api/get-stream-topics
 */
export async function getChannelTopics(
  client: AxiosInstance,
  streamId: number,
  params: GetChannelTopicsParams = {},
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    sendParams[key] = String(value)
  }

  const resp = await client.get<GetChannelTopicsResponse>(
    `/users/me/${streamId}/topics`,
    {
      params: sendParams,
    },
  )

  return resp.data
}
