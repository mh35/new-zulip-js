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
 * Stream ID parameter for MuteTopic API
 */
type MuteTopicByIdParams = {
  /**
   * Stream ID. You must specify either stream ID or name, but you must not
   * specify both.
   * @see https://zulip.com/api/mute-topic#parameter-stream_id
   */
  stream_id: number
  /**
   * Stream name. You must specify either stream ID or name, but you must not
   * specify both.
   * @see https://zulip.com/api/mute-topic#parameter-stream
   */
  stream: never
}

/**
 * Stream name parameter for MuteTopic API
 */
type MuteTopicByNameParams = {
  /**
   * Stream ID. You must specify either stream ID or name, but you must not
   * specify both.
   * @see https://zulip.com/api/mute-topic#parameter-stream_id
   */
  stream_id: never
  /**
   * Stream name. You must specify either stream ID or name, but you must not
   * specify both.
   * @see https://zulip.com/api/mute-topic#parameter-stream
   */
  stream: string
}

/**
 * The parameters for MuteTopic API
 * @deprecated From Zulip 7.0 (feature level 170), use UpdateUserTopic API instead.
 * @see https://zulip.com/api/mute-topic#parameters
 */
export type MuteTopicParams = (MuteTopicByIdParams | MuteTopicByNameParams) & {
  /**
   * The topic name to mute or unmute.
   * @see https://zulip.com/api/mute-topic#parameter-topic
   */
  topic: string
  /**
   * To mute(add) or unmute(remove).
   * @see https://zulip.com/api/mute-topic#parameter-op
   */
  op: 'add' | 'remove'
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

/**
 * Mute or unmute a topic
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of MuteTopic API
 * @deprecated From Zulip 7.0 (feature level 170), use UpdateUserTopic API instead.
 * @see https://zulip.com/api/mute-topic
 */
export async function muteTopic(
  client: AxiosInstance,
  params: MuteTopicParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    body.append(key, String(value))
  }

  const resp = await client.patch<GeneralSuccessResponse>(
    '/users/me/subscriptions/muted_topics',
    body,
  )

  return resp.data
}
