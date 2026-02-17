import type { AxiosInstance } from "axios"
import type { GeneralSuccessResponse } from './api'
import type { TopicVisibilityValues } from "./constants"

type SendStreamMessageParams = {
  /**
   * Message destination type
   * @see https://zulip.com/api/send-message#parameter-type
   */
  type: 'stream' | 'channel'
  /**
   * Message destination
   * If string, this is the stream name.
   * If integer, this is the stream ID.
   * @see https://zulip.com/api/send-message#parameter-to
   */
  to: string | number
  /**
   * Topic name. Required for stream messages.
   * @see https://zulip.com/api/send-message#parameter-topic
   */
  topic: string
}

type SendDirectMessageParams = {
  /**
   * Message destination type
   * @see https://zulip.com/api/send-message#parameter-type
   */
  type: 'direct' | 'private'
  /**
   * Message destination
   * If array of string, these are the email addresses of Zulip users emails.
   * If array of number, these are the user IDs.
   * @see https://zulip.com/api/send-message#parameter-to
   */
  to: string[] | number[]
  /**
   * Topic name. Ignored if direct message.

   * @see https://zulip.com/api/send-message#parameter-topic
   */
  topic: never
}

type SendMessageDestinationParams = SendStreamMessageParams | SendDirectMessageParams

type SendMessageWithQueueParams = {
  /**
   * Event queue ID.
   * @see https://zulip.com/api/send-message#parameter-queue_id
   */
  queue_id: string
  /**
   * Local ID chosen by client. Required if queue_id is specified.
   * @see https://zulip.com/api/send-message#parameter-local_id
   */
  local_id: string
}

type SendMessageWithoutQueueParams = {
  /**
   * Event queue ID.
   * @see https://zulip.com/api/send-message#parameter-queue_id
   */
  queue_id: never
  /**
   * Local ID chosen by client. You must not specify local_id unless you specify queue_id.
   * @see https://zulip.com/api/send-message#parameter-local_id
   */
  local_id: never
}

type SendMessageQueueParams = SendMessageWithQueueParams | SendMessageWithoutQueueParams

/**
 * SendMessage API parameters
 * @see https://zulip.com/api/send-message#parameters
 */
export type SendMessageParams = SendMessageDestinationParams & SendMessageQueueParams & {
  /**
   * Message content.
   * @see https://zulip.com/api/send-message#parameter-content
   */
  content: string
  /**
   * Whether mark as read by sender. If not specified, the server uses heuristic based on client name.
   * @see https://zulip.com/api/send-message#parameter-read_by_sender
   */
  read_by_sender?: boolean
}

/**
 * SendMessage API response body
 * @see https://zulip.com/api/send-message#response
 */
export type SendMessageResponse = GeneralSuccessResponse & {
  id: number
  automatic_new_visibility_policy?: TopicVisibilityValues
}

/**
 * UploadFile API response body
 * https://zulip.com/api/upload-file#response
 */
export type UploadFileResponse = GeneralSuccessResponse & {
  /**
   * The URI of the file.
   * @deprecated Deprecated from Zulip 9.0 (feature level 272). Use url field instead.
   */
  uri: string
  /**
   * The URL of the file.
   * @since Zulip 9.0 (feature level 272)
   */
  url: string
  /**
   * The name of the file.
   * @since Zulip 10.0 (feature level 285)
   */
  filename: string
}

/**
 * Send a message.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of SendMessage API.
 * @see https://zulip.com/api/send-message
 */
export async function sendMessage(client: AxiosInstance, params: SendMessageParams) {
  const body = new URLSearchParams()
  
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    
    if (Array.isArray(value)) {
      // Encode arrays as JSON strings
      body.append(key, JSON.stringify(value))
    } else if (typeof value === 'boolean') {
      // Encode booleans as strings
      body.append(key, String(value))
    } else {
      // Other values (strings, numbers)
      body.append(key, String(value))
    }
  }
  
  const response = await client.post<SendMessageResponse>('/messages', body)
  
  return response.data
}

/**
 * Upload a file.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param file Upload target file
 * @returns The response of UploadFile API.
 * @see https://zulip.com/api/upload-file
 */
export async function uploadFile(client: AxiosInstance, file: File) {
  const formData = new FormData()
  formData.append('filename', file)
  
  const response = await client.post<UploadFileResponse>('/user_uploads', formData)
  
  return response.data
}
