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
 * The stream message specific parameters for CreateScheduledMessage API.
 */
type CreateScheduledStreamMessageParams = {
  /**
   * Message destination type.
   * @see https://zulip.com/api/create-scheduled-message#parameter-type
   */
  type: 'stream' | 'channel'
  /**
   * Channel ID for the scheduled message destination.
   * @see https://zulip.com/api/create-scheduled-message#parameter-to
   */
  to: number
  /**
   * Topic name. Required for channel messages.
   * @see https://zulip.com/api/create-scheduled-message#parameter-topic
   */
  topic: string
}

/**
 * The direct message specific parameters for CreateScheduledMessage API.
 */
type CreateScheduledDirectMessageParams = {
  /**
   * Message destination type.
   * @see https://zulip.com/api/create-scheduled-message#parameter-type
   */
  type: 'direct' | 'private'
  /**
   * User IDs for the scheduled direct message destination.
   * @see https://zulip.com/api/create-scheduled-message#parameter-to
   */
  to: number[]
  /**
   * Topic name. Ignored for direct messages.
   * @see https://zulip.com/api/create-scheduled-message#parameter-topic
   */
  topic: never
}

/**
 * Common parameters for CreateScheduledMessage API.
 */
type CreateScheduledMessageBaseParams = {
  /**
   * The content of the message.
   * @see https://zulip.com/api/create-scheduled-message#parameter-content
   */
  content: string
  /**
   * The UNIX timestamp for when the message will be sent.
   * @see https://zulip.com/api/create-scheduled-message#parameter-scheduled_delivery_timestamp
   */
  scheduled_delivery_timestamp: number
  /**
   * Whether the message should be initially marked read by its sender.
   * @see https://zulip.com/api/create-scheduled-message#parameter-read_by_sender
   * @since Zulip 8.0 (feature level 236)
   */
  read_by_sender?: boolean
}

/**
 * CreateScheduledMessage API parameters
 * @since Zulip 7.0 (feature level 179)
 * @see https://zulip.com/api/create-scheduled-message#parameters
 */
export type CreateScheduledMessageParams = (
  | CreateScheduledStreamMessageParams
  | CreateScheduledDirectMessageParams
) &
  CreateScheduledMessageBaseParams

/**
 * The response of CreateScheduledMessage API
 * @since Zulip 7.0 (feature level 179)
 * @see https://zulip.com/api/create-scheduled-message#response
 */
export type CreateScheduledMessageResponse = GeneralSuccessResponse & {
  /**
   * The unique ID of the scheduled message.
   */
  scheduled_message_id: number
}

/**
 * EditScheduledMessage API parameters if turns to stream message.
 */
type EditScheduledMessageEditTypeToStreamParams = {
  /**
   * Message target type.
   *
   * For stream message, type=stream or channel
   *
   * For direct message, type=direct or private
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  type: 'stream' | 'channel'
  /**
   * Target ID or IDs
   *
   * If stream message, the ID of the stream.
   *
   * If direct message, the IDs of target users.
   *
   * You must specify this parameter if you want to change the message type.
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  to: number
  /**
   * Topic name.
   *
   * You must specify this parameter if you want to change the message type to stream.
   *
   * This parameter is ignored if the message type is private.
   * @see https://zulip.com/api/update-scheduled-message#parameter-topic
   */
  topic: string
}

/**
 * EditScheduledMessage API parameters if turns to direct message.
 */
type EditScheduledMessageEditTypeToPrivateParams = {
  /**
   * Message target type.
   *
   * For stream message, type=stream or channel
   *
   * For direct message, type=direct or private
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  type: 'direct' | 'private'
  /**
   * Target ID or IDs
   *
   * If stream message, the ID of the stream.
   *
   * If direct message, the IDs of target users.
   *
   * You must specify this parameter if you want to change the message type.
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  to: number[]
  /**
   * Topic name.
   *
   * You must specify this parameter if you want to change the message type to stream.
   *
   * This parameter is ignored if the message type is private.
   * @see https://zulip.com/api/update-scheduled-message#parameter-topic
   */
  topic: never
}

/**
 * EditScheduledMessage API parameters if changes target stream.
 */
type EditScheduledMessageEditStreamTargetParams = {
  /**
   * Message target type.
   *
   * For stream message, type=stream or channel
   *
   * For direct message, type=direct or private
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  type: never
  /**
   * Target ID or IDs
   *
   * If stream message, the ID of the stream.
   *
   * If direct message, the IDs of target users.
   *
   * You must specify this parameter if you want to change the message type.
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  to: number
  /**
   * Topic name.
   *
   * You must specify this parameter if you want to change the message type to stream.
   *
   * This parameter is ignored if the message type is private.
   * @see https://zulip.com/api/update-scheduled-message#parameter-topic
   */
  topic?: string
}

/**
 * EditScheduledMessage API parameters if changes target users.
 */
type EditScheduledMessageEditPrivateTargetParams = {
  /**
   * Message target type.
   *
   * For stream message, type=stream or channel
   *
   * For direct message, type=direct or private
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  type: never
  /**
   * Target ID or IDs
   *
   * If stream message, the ID of the stream.
   *
   * If direct message, the IDs of target users.
   *
   * You must specify this parameter if you want to change the message type.
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  to: number[]
  /**
   * Topic name.
   *
   * You must specify this parameter if you want to change the message type to stream.
   *
   * This parameter is ignored if the message type is private.
   * @see https://zulip.com/api/update-scheduled-message#parameter-topic
   */
  topic: never
}

/**
 * EditScheduledMessage API parameters if changes topic.
 */
type EditScheduledMessageEditTopicParams = {
  /**
   * Message target type.
   *
   * For stream message, type=stream or channel
   *
   * For direct message, type=direct or private
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  type: never
  /**
   * Target ID or IDs
   *
   * If stream message, the ID of the stream.
   *
   * If direct message, the IDs of target users.
   *
   * You must specify this parameter if you want to change the message type.
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  to: never
  /**
   * Topic name.
   *
   * You must specify this parameter if you want to change the message type to stream.
   *
   * This parameter is ignored if the message type is private.
   * @see https://zulip.com/api/update-scheduled-message#parameter-topic
   */
  topic: string
}

/**
 * EditScheduledMessage API parameters if unchange target.
 */
type EditScheduledMessageNoEditTargetsParams = {
  /**
   * Message target type.
   *
   * For stream message, type=stream or channel
   *
   * For direct message, type=direct or private
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  type: never
  /**
   * Target ID or IDs
   *
   * If stream message, the ID of the stream.
   *
   * If direct message, the IDs of target users.
   *
   * You must specify this parameter if you want to change the message type.
   * @see https://zulip.com/api/update-scheduled-message#parameter-type
   */
  to: never
  /**
   * Topic name.
   *
   * You must specify this parameter if you want to change the message type to stream.
   *
   * This parameter is ignored if the message type is private.
   * @see https://zulip.com/api/update-scheduled-message#parameter-topic
   */
  topic: never
}

/**
 * EditScheduledMessage API additional parameters if changes target.
 */
type EditScheduledMessageEditTargetsAdditionalParams = {
  /**
   * Message content
   * @see https://zulip.com/api/update-scheduled-message#parameter-content
   */
  content?: string
  /**
   * The timestamp when the message delivers
   * @see https://zulip.com/api/update-scheduled-message#parameter-scheduled_delivery_timestamp
   */
  scheduled_delivery_timestamp?: number
}

/**
 * EditScheduledMessage API parameters if changes content
 */
type EditScheduledMessageEditContentParams = {
  /**
   * Message content
   * @see https://zulip.com/api/update-scheduled-message#parameter-content
   */
  content: string
}

/**
 * EditScheduledMessage API parameters if changes delivery time
 */
type EditScheduledMessageEditScheduledDeliveryTimeParams = {
  /**
   * The timestamp when the message delivers
   * @see https://zulip.com/api/update-scheduled-message#parameter-scheduled_delivery_timestamp
   */
  scheduled_delivery_timestamp: number
}

/**
 * EditSchedule Message API parameters
 * @since Zulip 7.0 (feature level 184)
 * @see https://zulip.com/api/update-scheduled-message#parameters
 */
export type EditScheduledMessageParams =
  | ((
      | EditScheduledMessageEditTypeToStreamParams
      | EditScheduledMessageEditTypeToPrivateParams
      | EditScheduledMessageEditStreamTargetParams
      | EditScheduledMessageEditPrivateTargetParams
      | EditScheduledMessageEditTopicParams
    ) &
      EditScheduledMessageEditTargetsAdditionalParams)
  | (EditScheduledMessageNoEditTargetsParams &
      (
        | EditScheduledMessageEditContentParams
        | EditScheduledMessageEditScheduledDeliveryTimeParams
      ))

/**
 * Get scheduled messages.
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

/**
 * Create a schedule message.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params CreateScheduledMessage API parameters
 * @returns The response of CreateScheduledMessage API
 * @since Zulip 7.0 (feature level 179)
 * @see https://zulip.com/api/create-scheduled-message
 */
export async function createScheduledMessage(
  client: AxiosInstance,
  params: CreateScheduledMessageParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      body.append(key, JSON.stringify(value))
    } else if (typeof value === 'boolean') {
      body.append(key, String(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.post<CreateScheduledMessageResponse>(
    '/scheduled_messages',
    body,
  )

  return resp.data
}

/**
 * Edit a scheduled message.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param scheduledMessageId Scheduled message ID
 * @param params API parameters
 * @returns The response of EditScheduledMessage API
 * @since Zulip 7.0 (feature level 184)
 * @see https://zulip.com/api/update-scheduled-message
 */
export async function editScheduledMessage(
  client: AxiosInstance,
  scheduledMessageId: number,
  params: EditScheduledMessageParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      body.append(key, JSON.stringify(value))
    } else if (typeof value === 'boolean') {
      body.append(key, String(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.patch<GeneralSuccessResponse>(
    `/scheduled_messages/${scheduledMessageId}`,
    body,
  )

  return resp.data
}
