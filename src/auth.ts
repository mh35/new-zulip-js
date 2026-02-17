import axios from 'axios'

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