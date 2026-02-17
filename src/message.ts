import type { AxiosInstance } from "axios"
import type { GeneralSuccessResponse } from './api'
import type { TopicVisibilityValues } from "./constants"

/**
 * Narrow item for filtering messages
 * @see https://zulip.com/api/get-messages
 */
export type GetMessagesNarrowItem = 
  | {
      operator: 'channel' | 'stream' | 'id' | 'sender' | 'group-pm-with' | 'dm-including' | 'with'
      operand: string | number
      negated?: boolean
    }
  | {
      operator: 'pm-with' | 'dm'
      operand: string | number[]
      negated?: boolean
    }
  | {
      operator: string
      operand: string
      negated?: boolean
    }

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

type EditMessageContentParams = {
  /**
   * The message of the content.
   * If you specify, you cannot change channel in the same request.
   * @see https://zulip.com/api/update-message#parameter-content
   */
  content: string
  /**
   * The new channel ID.
   * If you specify, you cannot change the content in the same request.
   * @see https://zulip.com/api/update-message#parameter-stream_id
   */
  stream_id: never
}

type EditMessageStreamParams = {
  /**
   * The message of the content.
   * If you specify, you cannot change channel in the same request.
   * @see https://zulip.com/api/update-message#parameter-content
   */
  content: never
  /**
   * The new channel ID.
   * If you specify, you cannot change the content in the same request.
   * @see https://zulip.com/api/update-message#parameter-stream_id
   */
  stream_id: number
}

type EditMessageWithoutContentAndStreamParams = {
  /**
   * The message of the content.
   * If you specify, you cannot change channel in the same request.
   * @see https://zulip.com/api/update-message#parameter-content
   */
  content: never
  /**
   * The new channel ID.
   * If you specify, you cannot change the content in the same request.
   * @see https://zulip.com/api/update-message#parameter-stream_id
   */
  stream_id: never
}

type EditMessageContentStreamParams = EditMessageContentParams |
  EditMessageStreamParams | EditMessageWithoutContentAndStreamParams

/**
 * EditMessage API parameters
 * @see https://zulip.com/api/update-message#parameters
 */
export type EditMessageParams = EditMessageContentStreamParams & {
  /**
   * The new topic name.
   * @see https://zulip.com/api/update-message#parameter-topic
   */
  topic?: string
  /**
   * Propagation mode. The default value is change_one.
   * If you modify only message content, you cannot specify other than change_one.
   * 
   * change_later: The target message and all following messages.
   * 
   * change_one: Only the target message.
   * 
   * change_all: All messages in this topic.
   * @see https://zulip.com/api/update-message#parameter-propagate_mode
   */
  propagate_mode?: 'change_later' | 'change_one' | 'change_all'
  /**
   * Whether to send an automated message to the old topic. The default value is false.
   * @see https://zulip.com/api/update-message#parameter-send_notification_to_old_thread
   * @since Zulip 3.0 (feature level 9)
   */
  send_notification_to_old_thread?: boolean
  /**
   * Whether to send an automated message to the new topic. The default value is true.
   * @see https://zulip.com/api/update-message#parameter-send_notification_to_new_thread
   * @since Zulip 3.0 (feature level 9)
   */
  send_notification_to_new_thread?: boolean
  /**
   * The SHA256 of the previous content of the message.
   * If you provide, the server reports error if the digest does not match
   * the one of the content in the database.
   * @see https://zulip.com/api/update-message#parameter-prev_content_sha256
   * @since Zulip 11.0 (feature level 379)
   */
  prev_content_sha256?: string
}

/**
 * messages field content item of detached_uploads field content item of the EditMessage API response.
 */
export type EditMessageDetachedUploadItemMessageItem = {
  /**
   * Time when the message was sent as a UNIX timestamp.
   * 
   * If the server is Zulip 12.0 (feature level 443) or later, this field is the
   * seconds from the Epoch.
   * If the server is before Zulip 12.0 (feature level 443), this field is the
   * milliseconds from the Epoch.
   */
  date_sent: number
  /**
   * The unique message ID.
   */
  id: number
}

/**
 * detached_uploads field content item of the EditMessage API response.
 */
export type EditMessageDetachedUploadItem = {
  /**
   * The unique ID for the attachment.
   */
  id: number
  /**
   * Name of the uploaded file.
   */
  name: string
  /**
   * A representation of the path of the file within the repository of user-uploaded files.
   */
  path_id: string
  /**
   * Size of the file in bytes.
   */
  size: number
  /**
   * Time when the attachment was uploaded as a UNIX timestamp.
   * 
   * If the server is Zulip 12.0 (feature level 443) or later, this field is the
   * seconds from the Epoch.
   * If the server is before Zulip 12.0 (feature level 443), this field is the
   * milliseconds from the Epoch.
   */
  create_time: number
  /**
   * Basic details on any Zulip messages that have been sent referencing this uploaded file. 
   */
  messages: EditMessageDetachedUploadItemMessageItem[]
}

/**
 * EditMessage API response
 * @see https://zulip.com/api/update-message#response
 */
export type EditMessageResponse = GeneralSuccessResponse & {
  /**
   * Details on all files uploaded by the acting user whose only references were removed
   * when editing this message.
   * @since Zulip 10.0 (API level 285)
   */
  detached_uploads?: EditMessageDetachedUploadItem[]
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

/**
 * Edit a message.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param messageId Message ID
 * @param params EditMessage API parameters.
 * @returns The response of the EditMessage API.
 * @see https://zulip.com/api/update-message
 */
export async function editMesssage(client: AxiosInstance, messageId: number, params: EditMessageParams) {
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
  
  const response = await client.patch<EditMessageResponse>(`/messages/${messageId}`, body)
  
  return response.data
}

/**
 * Delete a message.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param messageId Message ID
 * @returns The response of the DeleteMessage API.
 * @see https://zulip.com/api/delete-message
 */
export async function deleteMessage(client: AxiosInstance, messageId: number) {
  const response = await client.delete<GeneralSuccessResponse>(`/messages/${messageId}`)

  return response
}
