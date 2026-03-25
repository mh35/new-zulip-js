import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

export type GetEmojisResponseItem = {
  /**
   * The ID of the emoji
   */
  id: string
  /**
   * The user-friendly name for the emoji
   */
  name: string
  /**
   * The path relative to the organization's URL where the emoji's image can be found
   */
  source_url: string
  /**
   * The path relative to the organization's URL where a still version of the emoji
   * can be found. If this emoji is not animated, this value is null
   * @since Zulip 5.0 (feature level 97)
   */
  still_url: string | null
  /**
   * Whether the emoji is deactivated or not
   */
  deactivated: boolean
  /**
   * The user ID of the user who uploaded the custom emoji
   * @since Zulip 3.0 (feature level 7)
   */
  author_id: number | null
}

/**
 * The response of GetEmojis API
 * @see https://zulip.com/api/get-custom-emoji#response
 */
export type GetEmojisResponse = GeneralSuccessResponse & {
  /**
   * The all emojis based on id-key and value of emoji information
   */
  emoji: { [key: string]: GetEmojisResponseItem }
}

/**
 * Get all the custom emojis in the realm
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetEmojis API
 * @see https://zulip.com/api/get-custom-emoji
 */
export async function getEmojis(client: AxiosInstance) {
  const resp = await client.get<GetEmojisResponse>('/realm/emoji')

  return resp.data
}

/**
 * Deactivate a custom emoji
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param emojiName The name of the custom emoji to deactivate
 * @returns The response of DeactivateEmoji API
 * @see https://zulip.com/api/deactivate-custom-emoji
 */
export async function deactivateEmoji(
  client: AxiosInstance,
  emojiName: string,
) {
  const resp = await client.delete<GeneralSuccessResponse>(
    `/realm/emoji/${emojiName}`,
  )

  return resp.data
}
