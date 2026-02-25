import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'

/**
 * Parameters for CreateChannelFolder API
 * @since Zulip 11.0 (feature level 389)
 * @see https://zulip.com/api/create-channel-folder#parameters
 */
export type CreateChannelFolderParams = {
  /**
   * Folder name
   * @see https://zulip.com/api/create-channel-folder#parameter-name
   */
  name: string
  /**
   * Folder description
   * @see https://zulip.com/api/create-channel-folder#parameter-description
   */
  description?: string
}

/**
 * The response of CreateChannelFolder API
 * @since Zulip 11.0 (feature level 389)
 * @see https://zulip.com/api/create-channel-folder#response
 */
export type CreateChannelFolderResponse = GeneralSuccessResponse & {
  /**
   * Channel folder ID
   */
  channel_folder_id: number
}

/**
 * Parameters for GetChannelFolders API
 * @since Zulip 11.0 (feature level 389)
 * @see https://zulip.com/api/get-channel-folders#parameters
 */
export type GetChannelFoldersParams = {
  /**
   * Whether including arhchived folders or not. Default is false
   * @see https://zulip.com/api/get-channel-folders#parameter-include_archived
   */
  include_archived?: boolean
}

/**
 * The item of GetChannelFolders response
 */
export type GetChannelFoldersResponseItem = {
  /**
   * The ID of the folder
   */
  id: number
  /**
   * The name of the folder
   */
  name: string
  /**
   * The order number starting from 0.
   *
   * The UI must show folders lower to higher order.
   */
  order: number
  /**
   * The UNIX timestamp for when the channel folder was created
   */
  date_created: number | null
  /**
   * The ID of the user who created the channel folder
   */
  creator_id: number | null
  /**
   * The description of the channel folder in Markdown format
   */
  description: string
  /**
   * The description of the channel folder rendered as HTML
   */
  rendered_description: string
  /**
   * Whether the channel folder is archived or not
   */
  is_archived: boolean
}

/**
 * The response of GetChannelFolders API
 * @since Zulip 11.0 (feature level 389)
 * @see https://zulip.com/api/get-channel-folders#response
 */
export type GetChannelFoldersResponse = GeneralSuccessResponse & {
  /**
   * Channel folders
   */
  channel_folders: GetChannelFoldersResponseItem
}

/**
 * Parameters for ReorderChannelFolders API
 * @since Zulip 11.0 (feature level 414)
 * @see https://zulip.com/api/patch-channel-folders#parameters
 */
export type ReorderChannelFoldersParams = {
  /**
   * The order of the IDs of channel folders. All IDs of folders including
   * archived folders must be included.
   *
   * @see https://zulip.com/api/patch-channel-folders#parameter-order
   */
  order: number[]
}

/**
 * Create a channel folder
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateChannelFolder API
 * @since Zulip 11.0 (feature level 389)
 * @see https://zulip.com/api/create-channel-folder
 */
export async function createChannelFolder(
  client: AxiosInstance,
  params: CreateChannelFolderParams,
) {
  const body = new URLSearchParams(params)

  const resp = await client.post<CreateChannelFolderResponse>(
    '/channel_folders/create',
    body,
  )

  return resp.data
}

/**
 * Get channel folders
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The respoonse of GetChannelFolders API
 * @since Zulip 11.0 (feature level 389)
 * @see https://zulip.com/api/get-channel-folders
 */
export async function getChannelFolders(
  client: AxiosInstance,
  params: GetChannelFoldersParams = {},
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    sendParams[key] = String(value)
  }

  const resp = await client.get<GetChannelFoldersResponse>('/channel_folders', {
    params: sendParams,
  })

  return resp.data
}

/**
 * Reorder channel folders
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of ReorderChannelFolders API
 * @since Zulip 11.0 (feature level 414)
 * @see https://zulip.com/api/patch-channel-folders
 */
export async function reorderChannelFolders(
  client: AxiosInstance,
  params: ReorderChannelFoldersParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    body.append(key, JSON.stringify(value))
  }

  const resp = await client.patch<GeneralSuccessResponse>(
    '/channel_folders',
    body,
  )

  return resp.data
}
