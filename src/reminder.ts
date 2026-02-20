import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * Parameters of CreateReminder API
 * @since Zulip 11.0 (feature level 381)
 * @see https://zulip.com/api/create-message-reminder#parameters
 */
export type CreateReminderParams = {
  /**
   * Message ID
   * @see https://zulip.com/api/create-message-reminder#parameter-message_id
   */
  message_id: number
  /**
   * The UNIX timestamp for when the reminder will be sent
   * @see https://zulip.com/api/create-message-reminder#parameter-scheduled_delivery_timestamp
   */
  scheduled_delivery_timestamp: number
  /**
   * A note associated with the reminder shown in the Notification Bot message.
   * @since Zulip 11.0 (feature level 415)
   * @see https://zulip.com/api/create-message-reminder#parameter-note
   */
  note?: string
}

/**
 * Response of CreateReminder API
 * @since Zulip 11.0 (feature level 381)
 * @see https://zulip.com/api/create-message-reminder#response
 */
export type CreateReminderResponse = GeneralSuccessResponse & {
  /**
   * Reminder ID
   */
  reminder_id: number
}

/**
 * The reminder item of GetReminders API response
 */
export type GetRemindersResponseItem = {
  /**
   * Reminder ID
   */
  reminder_id: number
  /**
   * Message type. Always be private
   */
  type: 'private'
  /**
   * Target user IDs. This contains the ID of the user who created the reminder,
   * and the ID of the user who is the target.
   */
  to: number[]
  /**
   * The raw Zulip-flavored Markdown content
   */
  content: string
  /**
   * The rendered HTMl content
   */
  rendered_content: string
  /**
   * The UNIX timestamp for when the reminder will be sent
   */
  scheduled_delivery_timestamp: number
  /**
   * Whether sending the reminder failed or not
   */
  failed: boolean
  /**
   * Target message ID
   */
  reminder_target_message_id: number
}

/**
 * The response of GetReminders API
 * @since Zulip 11.0 (feature level 399)
 * @see https://zulip.com/api/get-reminders#response
 */
export type GetRemindersResponse = GeneralSuccessResponse & {
  reminders: GetRemindersResponseItem[]
}

/**
 * Create a reminder.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateReminder API
 * @since Zulip 11.0 (feature level 381)
 * @see https://zulip.com/api/create-message-reminder
 */
export async function createReminder(
  client: AxiosInstance,
  params: CreateReminderParams,
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

  const resp = await client.post<CreateReminderResponse>('/reminders', body)

  return resp.data
}

/**
 * Get reminders
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetReminders API
 * @since Zulip 11.0 (feature level 399)
 * @see https://zulip.com/api/get-reminders
 */
export async function getReminders(client: AxiosInstance) {
  const resp = await client.get<GetRemindersResponse>('/reminders')

  return resp.data
}
