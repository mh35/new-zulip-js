import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * Parameters for AddCodePlayground API
 * @since Zulip 4.0 (feature level 49)
 * @see https://zulip.com/api/add-code-playground#parameters
 */
export type AddCodePlaygroundParams = {
  /**
   * The user-visible display name of the playground
   * @see https://zulip.com/api/add-code-playground#parameter-name
   */
  name: string
  /**
   * The name of the Pygments language lexer
   * @see https://zulip.com/api/add-code-playground#parameter-pygments_language
   */
  pygments_language: string
  /**
   * URL template for the playground
   * @since Zulip 8.0 (feature level 196)
   * @see https://zulip.com/api/add-code-playground#parameter-url_template
   */
  url_template: string
}

/**
 * The response of AddCodePlayground API
 * @since Zulip 4.0 (feature level 49)
 * @see https://zulip.com/api/add-code-playground#response
 */
export type AddCodePlaygroundResponse = GeneralSuccessResponse & {
  /**
   * Code playground ID
   */
  id: number
}

/**
 * Add a code playground
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of AddCodePlayground API
 * @since Zulip 4.0 (feature level 49)
 * @see https://zulip.com/api/add-code-playground
 */
export async function addCodePlayground(
  client: AxiosInstance,
  params: AddCodePlaygroundParams,
) {
  const body = new URLSearchParams(params)

  const resp = await client.post<AddCodePlaygroundParams>(
    '/realm/playgrounds',
    body,
  )

  return resp.data
}
