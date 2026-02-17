import axios from 'axios'

/**
 * Authenticate user by email and password to get API key
 * @param serverUrl Server URL
 * @param email User email
 * @param password User password
 * @returns API key for authenticated user
 * @see https://zulip.com/api/fetch-api-key
 */
export async function authByPassword(serverUrl: string, email: string, password: string) {
  const response = await axios.post<{
    result: string
    msg: string
    api_key: string
  }>(`${serverUrl.replace(/\/+$/, '')}/api/v1/login`, new URLSearchParams({
    username: email,
    password
  }))
  return response.data.api_key
}

/**
 * Authenticate user by email to get API key (development only)
 * @param serverUrl Server URL
 * @param email User email
 * @returns API key for authenticated user
 * @see https://zulip.com/api/dev-fetch-api-key
 */
export async function authDev(serverUrl: string, email: string) {
  const response = await axios.post<{
    result: string
    msg: string
    api_key: string
  }>(`${serverUrl.replace(/\/+$/, '')}/api/v1/dev_fetch_api_key`, new URLSearchParams({
    username: email,
  }))
  return response.data.api_key
}

/**
 * Authenticate user by JWT to get API key
 * @param serverUrl Server URL
 * @param jwt User JWT containing email field
 * @returns API key for authenticated user
 * @see https://zulip.readthedocs.io/en/stable/production/authentication-methods.html#json-web-tokens-jwt
 */
export async function authByJwt(serverUrl: string, jwt: string) {
  const response = await axios.post<{
    result: string
    msg: string
    api_key: string
  }>(`${serverUrl.replace(/\/+$/, '')}/api/v1/fetch_api_key`, new URLSearchParams({
    token: jwt,
  }))
  return response.data.api_key
}
