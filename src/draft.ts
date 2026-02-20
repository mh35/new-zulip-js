import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * The item of GetDrafts API response
 */
export type GetDraftsResponseItem = {
  /**
   * The ID of the draft
   */
  id: number
  /**
   * The type of message
   */
  type: '' | 'stream' | 'private'
  /**
   * The target stream or user IDs.
   */
  to: number[]
  /**
   * The topic of the message.
   *
   * If direct message, empty string
   */
  topic: string
  /**
   * The content of the draft
   */
  content: string
  /**
   * Last modified UNIX timestamp
   */
  timestamp: number
}

/**
 * The response of GetDrafts API
 * @see https://zulip.com/api/get-drafts#response
 */
export type GetDraftsResponse = GeneralSuccessResponse & {
  /**
   * The number of drafts
   */
  count: number
  /**
   * Drafts
   */
  drafts: GetDraftsResponseItem[]
}

/**
 * Create drafts parameter draft item.
 */
export type CreateDraftsParamItem = {
  /**
   * The type of message
   */
  type: '' | 'stream' | 'private'
  /**
   * The target stream or user IDs.
   */
  to: number[]
  /**
   * The topic of the message.
   *
   * If direct message, empty string
   */
  topic: string
  /**
   * The content of the draft
   */
  content: string
}

/**
 * The API parameters for CreateDrafts API
 * @see https://zulip.com/api/create-drafts#parameters
 */
export type CreateDraftsParams = {
  /**
   * Drafts to create
   * @see https://zulip.com/api/create-drafts#parameter-drafts
   */
  drafts: CreateDraftsParamItem[]
}

/**
 * The API response for CreateDrafts API
 * @see https://zulip.com/api/create-drafts#response
 */
export type CreateDraftsResponse = GeneralSuccessResponse & {
  /**
   * Draft IDs. The order is the same as the request.
   */
  ids: number[]
}

/**
 * Draft in EditDraft API parameters
 */
export type EditDraftParamDraft = CreateDraftsParamItem

/**
 * EditDraft API parameters
 * @see https://zulip.com/api/edit-draft#parameters
 */
export type EditDraftParams = {
  /**
   * The draft data
   * @see https://zulip.com/api/edit-draft#parameter-draft
   */
  draft: EditDraftParamDraft
}

/**
 * Get all drafts
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetDrafts API
 * @see https://zulip.com/api/get-drafts
 */
export async function getDrafts(client: AxiosInstance) {
  const resp = await client.get<GetDraftsResponse>('/drafts')

  return resp.data
}

/**
 * Create drafts
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateDrafts API
 * @see https://zulip.com/api/create-drafts
 */
export async function createDrafts(
  client: AxiosInstance,
  params: CreateDraftsParams,
) {
  const body = new URLSearchParams()

  body.append('drafts', JSON.stringify(params.drafts))

  const resp = await client.post<CreateDraftsResponse>('/drafts', body)

  return resp.data
}

/**
 * Edit a draft
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param draftId Draft ID
 * @param params API parameters
 * @returns The response of EditDraft API
 * @see https://zulip.com/api/edit-draft
 */
export async function editDraft(
  client: AxiosInstance,
  draftId: number,
  params: EditDraftParams,
) {
  const body = new URLSearchParams()

  body.append('draft', JSON.stringify(params.draft))

  const resp = await client.patch<GeneralSuccessResponse>(
    `/drafts/${draftId}`,
    body,
  )

  return resp.data
}

/**
 * Delete a draft
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param draftId Draft ID
 * @returns The response of DeleteDraft API
 * @see https://zulip.com/api/delete-draft
 */
export async function deleteDraft(client: AxiosInstance, draftId: number) {
  const resp = await client.delete<GeneralSuccessResponse>(`/drafts/${draftId}`)

  return resp.data
}
