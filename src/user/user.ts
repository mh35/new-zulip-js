import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'
import type { BotTypeValues, UserRoleValues } from '../constants'

export type GetUserByIdParams = {
  client_gravatar?: boolean
  include_custom_profile_fields?: boolean
}

export type GetUserByIdResponseUserFieldValue = {
  value: string
  rendered_value?: string
}

export type GetUserByIdResponseUser = {
  user_id: number
  delivery_email: string | null
  email: string
  full_name: string
  date_joined: string
  is_active: boolean
  is_owner: boolean
  is_admin: boolean
  is_guest: boolean
  is_bot: boolean
  bot_type?: BotTypeValues
  bot_owner_id?: number
  role: UserRoleValues
  timezone: string
  avatar_url: string | null
  avatar_version: number
  is_imported_stub: boolean
}
