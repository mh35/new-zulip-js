import axios from 'axios'

export async function authByPassword(serverUrl: string, username: string, password: string) {
    const response = await axios.post<{
        result: string
        msg: string
        api_key: string
    }>(`${serverUrl.replace(/\/+$/, '')}/api/v1/login`, new URLSearchParams({
        username,
        password
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return response.data.api_key
}
