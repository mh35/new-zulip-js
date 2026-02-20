import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * Stream message specific fields for the item of GetScheduledMessages API
 */
type GetScheduleMessagesResponseStreamItem = {
  /**
   * Message type. Either stream or private
   */
  type: 'stream'
  /**
   * The destination of the message.
   *
   * If stream message, the ID of the stream. If private message,
   * the ID of the user or IDs of users.
   */
  to: number
  /**
   * Topic of the message. Only exists in stream message.
   */
  topic: string
}

/**
 * Private message specific fields for the item of GetScheduledMessages API
 */
type GetScheduleMessagesResponsePrivateItem = {
  /**
   * Message type. Either stream or private
   */
  type: 'private'
  /**
   * The destination of the message.
   *
   * If stream message, the ID of the stream. If private message,
   * the ID of the user or IDs of users.
   */
  to: number[]
  /**
   * Topic of the message. Only exists in stream message.
   */
  topic: never
}

/**
 * Schedule message item of GetScheduledMessages API
 */
export type GetScheduleMessagesResponseItem = (
  | GetScheduleMessagesResponseStreamItem
  | GetScheduleMessagesResponsePrivateItem
) & {
  /**
   * The unique ID for scheduled message.
   */
  scheduled_message_id: number
  /**
   * The raw content in Zulip-flavored Markdown format.
   */
  content: string
  /**
   * The rendered content in HTML format.
   */
  rendered_content: string
  /**
   * The UNIX timestamp when the message will send.
   */
  scheduled_delivery_timestamp: number
  /**
   * Whether the server has tried to send the scheduled message and it
   * failed to successfully send.
   * @since Zulip 7.0 (feature level 181)
   */
  failed: boolean
}

/**
 * The response of GetScheduleMessages API
 * @since Zulip 7.0 (feature level 173)
 * @see http://zulip.com/api/get-scheduled-messages#response
 */
export type GetScheduleMessagesResponse = GeneralSuccessResponse & {
  /**
   * Scheduled messages.
   */
  scheduled_messages: GetScheduleMessagesResponseItem[]
}

/**
 *
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetScheduleMessages API
 * @since Zulip 7.0 (feature level 173)
 * @see https://zulip.com/api/get-scheduled-messages
 */
export async function getScheduledMessages(client: AxiosInstance) {
  const resp = await client.get<GetScheduleMessagesResponse>(
    '/scheduled_messages',
  )

  return resp.data
}
