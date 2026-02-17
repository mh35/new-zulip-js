import axios from 'axios'

/**
 * Create an axios instance with basic auth for API calls
 * @param serverUrl Server URL
 * @param email User email
 * @param apiKey API key for authentication
 * @returns Axios instance configured with basic auth
 */
export function generateCallApi(serverUrl: string, email: string, apiKey: string) {
  const instance = axios.create({
    baseURL: `${serverUrl.replace(/\/+$/, '')}/api/v1/`,
    auth: {
      username: email,
      password: apiKey
    }
  })
  return instance
}
