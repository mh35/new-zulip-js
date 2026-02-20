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
