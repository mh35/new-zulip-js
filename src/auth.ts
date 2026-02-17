import axios from 'axios'

export async function authByPassword(serverUrl: string, username: string, password: string) {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)
    
    const response = await axios.post<{
        result: string
        msg: string
        api_key: string
        email: string
        user_id: number
    }>(`${serverUrl.replace(/\/+$/, '')}/api/v1/fetch_api_key`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    
    if (response.data.result !== 'success') {
        throw new Error(`Authentication failed: ${response.data.msg}`)
    }
    
    return response.data.api_key
}
