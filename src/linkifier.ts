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
 * Parameters for AddLinkifier API
 * @see https://zulip.com/api/add-linkifier#parameters
 */
export type AddLinkifierParams = {
  /**
   * The Python regular expression that should trigger the linkifier
   * @see https://zulip.com/api/add-linkifier#parameter-pattern
   * @see https://docs.python.org/3/howto/regex.html
   */
  pattern: string
  /**
   * URL template used for the link
   * @see https://zulip.com/api/add-linkifier#parameter-url_template
   */
  url_template: string
  /**
   * An example input string that matches the linkifier's pattern.
   * This is required for reverse linkifiers
   * @since Zulip 12.0 (feature level 471)
   * @see https://zulip.com/api/add-linkifier#parameter-example_input
   */
  example_input?: string | null
  /**
   * A simple template using {variable} for variables that can be used to generate the
   * Markdown linkifier syntax, given a URL matching the URL template
   * @since Zulip 12.0 (feature level 471)
   * @see https://zulip.com/api/add-linkifier#parameter-reverse_template
   */
  reverse_template?: string | null
  /**
   * An array of additional URL template strings that are used for reverse
   * linkification
   * @since Zulip 12.0 (feature level e2b257)
   * @see https://zulip.com/api/add-linkifier#parameter-alternative_url_templates
   */
  alternative_url_templates?: string[]
}

/**
 * The response of AddLinkifier API
 * @see https://zulip.com/api/add-linkifier#response
 */
export type AddLinkifierResponse = GeneralSuccessResponse & {
  /**
   * The ID of the new linkifier
   */
  id: number
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

/**
 * Add a linkifier
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of AddLinkifier API
 * @see https://zulip.com/api/add-linkifier
 */
export async function addLinkifier(
  client: AxiosInstance,
  params: AddLinkifierParams,
) {
  //
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
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.post<AddLinkifierResponse>('/realm/filters', body)

  return resp.data
}
