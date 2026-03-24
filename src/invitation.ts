import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'
import type { UserRoleValues } from './constants'

/**
 * Fields for single invitation item of GetInvitations API
 */
type GetInvitationsResponseItemSingleUse = {
  /**
   * Email address. Not present if multi-use
   */
  email: string
  /**
   * Link URL. Not present if single-use
   */
  link_url: never
  /**
   * Whether the invitation is multi-use or not
   */
  is_multiuse: false
}

/**
 * Fields for multiple invitation item of GetInvitations API
 */
type GetInvitationsResponseItemMultiUse = {
  /**
   * Email address. Not present if multi-use
   */
  email: never
  /**
   * Link URL. Not present if single-use
   */
  link_url: string
  /**
   * Whether the invitation is multi-use or not
   */
  is_multiuse: true
}

/**
 * Invitation item of GetInvitations API
 */
export type GetInvitationsResponseItem = {
  /**
   * Invitation ID. This ID is unique if is_multiuse is same.
   */
  id: number
  /**
   * The ID of the user who invited
   */
  invited_by_user_id: number
  /**
   * UNIX timestamp in seconds when the invitation is created
   */
  invited: number
  /**
   * When the invitation expires in the format of UNIX timestamp in seconds.
   *
   * If null, this invitation never expires.
   */
  expiry_date: number | null
  /**
   * Organization-level role of the user when the invitation is accepted
   */
  invited_as: UserRoleValues
  /**
   * Whether the referrer has opted to receive a direct message from notification bot
   * when a user account is created using this invitation
   *
   * @since Zulip 9.0 (feature level 267)
   */
  notify_referrer_on_join: boolean
} & (GetInvitationsResponseItemSingleUse | GetInvitationsResponseItemMultiUse)

/**
 * The response of GetInvitations API
 * @see https://zulip.com/api/get-invites#response
 */
export type GetInvitationsResponse = GeneralSuccessResponse & {
  /**
   * List of invitations
   */
  invites: GetInvitationsResponseItem[]
}

/**
 * Parameters of SendInvitations API
 * @see https://zulip.com/api/send-invites#parameters
 */
export type SendInvitationParams = {
  /**
   * Email addresses to send invitations. If you want to send multiple targets,
   * you must separate email addresses by commas or new lines.
   * @see https://zulip.com/api/send-invites#parameter-invitee_emails
   */
  invitee_emails: string
  /**
   * The number of minutes after which the invitation expires.
   * If you specify null, the invitation never expires.
   * If you does not specify this, the default value (10 days) are used.
   * @since Zulip 6.0 (feature level 126)
   * @see https://zulip.com/api/send-invites#parameter-invite_expires_in_minutes
   */
  invite_expires_in_minutes?: number | null
  /**
   * The user role when the user is created.
   * @see https://zulip.com/api/send-invites#parameter-invite_as
   */
  invite_as?: UserRoleValues
  /**
   * IDs of channels which the user will subscribe when the user joins.
   * @see https://zulip.com/api/send-invites#parameter-stream_ids
   */
  stream_ids: number[]
  /**
   * IDs of groups which the user will be added when the user joins.
   * @since Zulip 10.0 (feature level 322)
   * @see https://zulip.com/api/send-invites#parameter-group_ids
   */
  group_ids?: number[]
  /**
   * Whether the newly created user should be subscribed to the default channels.
   * Default is false
   * @since Zulip 9.0 (feature level 261)
   * @see https://zulip.com/api/send-invites#parameter-include_realm_default_subscriptions
   */
  include_realm_default_subscriptions?: boolean
  /**
   * Whether the referrer has opted to receive a direct message from notification bot
   * when a user account is created using this invitation. Default is true
   * @since Zulip 9.0 (feature level 267)
   * @see https://zulip.com/api/send-invites#parameter-notify_referrer_on_join
   */
  notify_referrer_on_join?: boolean
  /**
   * Welcome message text.
   *
   * - If you specify null, the default message. This is the default behavior.
   * - If you specify empty string, welcome message will not be sent.
   * - If you specify not empty string, the string is used as welcome message.
   *
   * Only organization administrators can use this feature.
   * @since Zulip 11.0 (feature level 416)
   * @see https://zulip.com/api/send-invites#parameter-welcome_message_custom_text
   */
  welcome_message_custom_text?: string | null
}

/**
 * Parameters of CreateInvitationLink API
 * @see https://zulip.com/api/create-invite-link#parameters
 */
export type CreateInvitationLinkParams = {
  /**
   * The number of minutes after which the invitation expires.
   * If you specify null, the invitation never expires.
   * If you does not specify this, the default value (10 days) are used.
   * @since Zulip 6.0 (feature level 126)
   * @see https://zulip.com/api/create-invite-link#parameter-invite_expires_in_minutes
   */
  invite_expires_in_minutes?: number | null
  /**
   * The user role when the user is created.
   * @see https://zulip.com/api/create-invite-link#parameter-invite_as
   */
  invite_as?: UserRoleValues
  /**
   * IDs of channels which the user will subscribe when the user joins.
   * @see https://zulip.com/api/create-invite-link#parameter-stream_ids
   */
  stream_ids?: number[]
  /**
   * IDs of groups which the user will be added when the user joins.
   * @since Zulip 10.0 (feature level 322)
   * @see https://zulip.com/api/create-invite-link#parameter-group_ids
   */
  group_ids?: number[]
  /**
   * Whether the newly created user should be subscribed to the default channels.
   * Default is false
   * @since Zulip 9.0 (feature level 261)
   * @see https://zulip.com/api/create-invite-link#parameter-include_realm_default_subscriptions
   */
  include_realm_default_subscriptions?: boolean
  /**
   * Welcome message text.
   *
   * - If you specify null, the default message. This is the default behavior.
   * - If you specify empty string, welcome message will not be sent.
   * - If you specify not empty string, the string is used as welcome message.
   *
   * Only organization administrators can use this feature.
   * @since Zulip 11.0 (feature level 416)
   * @see https://zulip.com/api/create-invite-link#parameter-welcome_message_custom_text
   */
  welcome_message_custom_text?: string | null
}

/**
 * The response of CreateInvitationLink API
 * @see https://zulip.com/api/create-invite-link#response
 */
export type CreateInvitationLinkResponse = GeneralSuccessResponse & {
  /**
   * The URL of the invitation link
   */
  invite_link: string
}

/**
 * Get all invitations
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetInvitations API
 * @see https://zulip.com/api/get-invites
 */
export async function getInvitations(client: AxiosInstance) {
  const resp = await client.get<GetInvitationsResponse>('/invites')

  return resp.data
}

/**
 * Send invitations
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of SendInvitation API
 * @see https://zulip.com/api/send-invites
 */
export async function sendInvitation(
  client: AxiosInstance,
  params: SendInvitationParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue
    } else if (value === null) {
      body.append(key, 'null')
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

  const resp = await client.post<GeneralSuccessResponse>('/invites', body)

  return resp.data
}

/**
 * Create an invitation link
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateInvitationLink API
 * @see https://zulip.com/api/create-invite-link
 */
export async function createInvitationLink(
  client: AxiosInstance,
  params: CreateInvitationLinkParams = {},
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue
    } else if (value === null) {
      body.append(key, 'null')
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

  const resp = await client.post<CreateInvitationLinkResponse>(
    '/invites/multiuse',
    body,
  )

  return resp.data
}

/**
 * Resend an Email invitation
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param invitationId Invitation ID
 * @returns The response of ResendEmailInvitation API
 * @see https://zulip.com/api/resend-email-invite
 */
export async function resendEmailInvitation(
  client: AxiosInstance,
  invitationId: number,
) {
  const resp = await client.post<GeneralSuccessResponse>(
    `/invites/${invitationId}/resend`,
    new URLSearchParams(),
  )

  return resp.data
}

/**
 * Revoke an Email invitation
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param invitationId Invitation ID
 * @returns The response of RevokeEmailInvitation API
 * @see https://zulip.com/api/revoke-email-invite
 */
export async function revokeEmailInvitation(
  client: AxiosInstance,
  invitationId: number,
) {
  const resp = await client.delete<GeneralSuccessResponse>(
    `/invites/${invitationId}`,
  )

  return resp.data
}

/**
 * Revoke an invitation link
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param invitationId Invitation ID
 * @returns The response of RevokeInvitationLink API
 * @see https://zulip.com/api/revoke-invite-link
 */
export async function revokeInvitationLink(
  client: AxiosInstance,
  invitationId: number,
) {
  const resp = await client.delete<GeneralSuccessResponse>(
    `/invites/multiuse/${invitationId}`,
  )

  return resp.data
}
