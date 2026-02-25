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
