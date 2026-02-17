import axios from 'axios'

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
