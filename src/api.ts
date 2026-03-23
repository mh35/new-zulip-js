import axios, { type AxiosInstance } from 'axios'

/**
 * Create an axios instance with basic auth for API calls
 * @param serverUrl Server URL
 * @param email User email
 * @param apiKey API key for authentication
 * @returns Axios instance configured with basic auth
 */
export function generateCallApi(
  serverUrl: string,
  email: string,
  apiKey: string,
) {
  const instance = axios.create({
    baseURL: `${serverUrl.replace(/\/+$/, '')}/api/v1/`,
    auth: {
      username: email,
      password: apiKey,
    },
  })
  return instance
}

/**
 * General success response
 * @see https://zulip.com/api/rest-error-handling
 */
export type GeneralSuccessResponse = {
  /**
   * The result of API call.
   */
  result: 'success'
  /**
   * Human-readable error message.
   * If there are no errors, this is an empty string.
   */
  msg: ''
  /**
   * Parameters which are ignored because the server does not support.
   */
  ignored_parameters_unsupported?: string[]
}

/**
 * General error response
 * @see https://zulip.com/api/rest-error-handling
 */
export type GeneralErrorResponse = {
  /**
   * The result of API call.
   */
  result: 'error'
  /**
   * Human-readable error message.
   */
  msg: string
  /**
   * Machine-readable error string.
   */
  code: string
}

/**
 * The response of RegenerateApiKey API
 * @see https://zulip.com/api/regenerate-api-key#response
 */
export type RegenerateApiKeyResponse = GeneralSuccessResponse & {
  /**
   * New API key
   */
  api_key: string
}

/**
 * Regenerate API key and reset API key
 * @param client Axios client initialized by generateCallApi function
 * @returns The response of RegenerateApiKey function
 * @see https://zulip.com/api/regenerate-api-key
 */
export async function regenerateApiKey(client: AxiosInstance) {
  const resp = await client.post<RegenerateApiKeyResponse>(
    '/users/me/api_key/regenerate',
    new URLSearchParams(),
  )

  const ret = resp.data
  if (client.defaults.auth) {
    client.defaults.auth.password = ret.api_key
  }
  return ret
}
