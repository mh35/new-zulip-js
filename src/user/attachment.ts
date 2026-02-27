import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'

/**
 * Message in the attachment item in GetAttachments response
 */
export type GetAttachmentsAttatchedMessage = {
  /**
   * When the message was sent.
   *
   * Before Zulip 12.0 (feature level 443), this field is in milliseconds.
   *
   * Since Zulip 12.0 (feature level 443), this field is in seconds.
   */
  date_sent: number
  /**
   * Message ID
   */
  id: number
}

export type GetAttachmentsResponseItem = {
  /**
   * The attachment ID
   */
  id: number
  /**
   * The attachment filename
   */
  name: string
  /**
   * A representation of the path of the file within the repository of user-uploaded files
   */
  path_id: string
  /**
   * Size of the file in bytes
   */
  size: number
  /**
   * Time when the attachment was uploaded as a UNIX timestamp.
   *
   * Before Zulip 12.0 (feature level 443), this field is in milliseconds.
   *
   * Since Zulip 12.0 (feature level 443), this field is in seconds.
   */
  create_time: number
  /**
   * Attached message information
   */
  messages: GetAttachmentsAttatchedMessage[]
}

/**
 * The response of GetAttachments API
 * @see https://zulip.com/api/get-attachments
 */
export type GetAttachmentsResponse = GeneralSuccessResponse & {
  /**
   * Attachment files
   */
  attachments: GetAttachmentsResponseItem[]
  /**
   * The total size of all files uploaded by users in the organization in the bytes
   */
  upload_space_used: number
}

/**
 * Get all attachments current user uploaded
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetAttachments API
 * @see https://zulip.com/api/get-attachments
 */
export async function getAttachments(client: AxiosInstance) {
  const resp = await client.get<GetAttachmentsResponse>('/attachments')

  return resp.data
}
