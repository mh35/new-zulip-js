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

export type GetInvitationsResponse = GeneralSuccessResponse & {
  invites: GetInvitationsResponseItem[]
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
