import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * The item of GetLinkifiers API
 */
export type GetLinkifiersItem = {
  /**
   * The string regex pattern which represents the pattern that should be
   * linkified by this linkifier
   */
  pattern: string
  /**
   * URL template to be used for linkifying matches
   * @since Zulip 7.0 (feature level 176)
   */
  url_template: string
  /**
   * The ID of the linkifier
   */
  id: number
  /**
   * An example input string that matches the linkifier's pattern
   * @since Zulip 12.0 (feature level 471)
   */
  example_input: string | null
  /**
   * A simple template using {variable} for variables that can be used to generate the
   * Markdown linkifier syntax, given a URL matching the URL template
   * @since Zulip 12.0 (feature level 471)
   */
  reverse_template: string | null
  /**
   * An array of additional URL template strings that are used for reverse
   * linkification
   * @since Zulip 12.0 (feature level e2b257)
   */
  alternative_url_templates: string[]
}

/**
 * The response of GetLinkifiers API
 * @since Zulip 4.0 (feature level 54)
 * @see https://zulip.com/api/get-linkifiers#response
 */
export type GetLinkifiersResponse = GeneralSuccessResponse & {
  /**
   * The ordered list of linkifiers
   */
  linkifiers: GetLinkifiersItem[]
}

/**
 * Get linkifiers
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetLinkifiers API
 * @since Zulip 4.0 (feature level 54)
 * @see https://zulip.com/api/get-linkifiers
 */
export async function getLinkifiers(client: AxiosInstance) {
  const resp = await client.get<GetLinkifiersResponse>('/realm/linkifiers')

  return resp.data
}
