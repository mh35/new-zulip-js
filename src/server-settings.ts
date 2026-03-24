import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * Supporting auth methods information for GetServerSettings API
 * @deprecated Zulip 2.1.0
 */
export type ServerSettingsAuthMethods = {
  /**
   * Whether password auth is supported or not
   */
  password: boolean
  /**
   * Whether development API key can use or not
   */
  dev: boolean
  /**
   * Whether the user can authenticate using email address or not
   */
  email: boolean
  /**
   * Whether the user can authenticate using LDAP or not
   */
  ldap: boolean
  /**
   * Whether the user can authenticate using REMOTE_USER or not
   */
  remoteuser: boolean
  /**
   * Whether the user can authenticate using GitHub account or not
   */
  github: boolean
  /**
   * Whether the user can authenticate using Microsoft Entra ID account or not
   */
  azuread: boolean
  /**
   * Whether the user can authenticate using GitLab account or not
   * @since Zulip 3.0 (feature level 1)
   */
  gitlab: boolean
  /**
   * Whether the user can authenticate using Apple account or not
   */
  apple: boolean
  /**
   * Whether the user can authenticate using Google account or not
   */
  google: boolean
  /**
   * Whether the user can authenticate using SAML or not
   */
  saml: boolean
  /**
   * Whether the user can authenticate using OpenID Connect or not
   */
  'openid connect': boolean
}

/**
 * External authentication method item for GetServerSettings API
 */
export type ServerSettingsExternalAuthMethodItem = {
  /**
   * The name of the authentication method
   */
  name: string
  /**
   * Display name of the authentication method
   */
  display_name: string
  /**
   * The icon URL of the authentication method. null indicates no icon.
   */
  display_icon: string | null
  /**
   * URL for sign in
   */
  login_url: string
  /**
   * URL for singup
   */
  signup_url: string
}

/**
 * The response of GetServerSettings API
 * @see https://zulip.com/api/get-server-settings#response
 */
export type GetServerSettingsResponse = GeneralSuccessResponse & {
  /**
   * What authentication methods are supported by this server
   * @deprecated From Zulip 2.1.0, use external_authentication_methods instead
   */
  authentication_methods: ServerSettingsAuthMethods
  /**
   * The list of external authentication methods
   * @since Zulip 2.1.0
   */
  external_authentication_methods?: ServerSettingsExternalAuthMethodItem[]
  /**
   * The feature level of the Zulip.
   * @since Zulip 3.0 (feature level 1)
   */
  zulip_feature_level: number
  /**
   * The version number of the Zulip
   */
  zulip_version: string
  /**
   * The git merge-base between zulip_version and official branches in the
   * public Zulip server and web app repository
   * @since Zulip 5.0 (feature level 88)
   */
  zulip_merge_base: string
  /**
   * Whether mobile/push notification is enabled or not
   */
  push_notifications_enabled: boolean
  /**
   * Whether the Zulip client that has sent a request to this endpoint is
   * deemed incompatible with the server
   */
  is_incompatible: boolean
  /**
   * Whether email-password authentication is enabled or not
   */
  email_auth_enabled?: boolean
  /**
   * Whether all valid usernames for authentication to this organization will be
   * email addresses
   */
  require_email_format_usernames: boolean
  /**
   * The organization's canonical URL
   * @deprecated From Zulip 9.0 (feature level 257), use realm_url instead
   */
  realm_uri?: string
  /**
   * The organization's canonical URL
   * @since Zulip 9.0 (feature level 257)
   */
  realm_url?: string
  /**
   * The organization's name
   */
  realm_name?: string
  /**
   * The URL for the organization's logo formatted as a square image
   */
  realm_icon?: string
  /**
   * HTML description of the organization
   */
  realm_description?: string
  /**
   * Whether the organization has enabled the creation of web-public channels and
   * at least one web-public channel on the server currently exists
   * @since Zulip 5.0 (feature level 116)
   */
  realm_web_public_access_enabled?: boolean
}

/**
 * Get the server settings. This function does not require authentication.
 * @param client Axios client initialized by generateCallApi function or
 * generateCallApiWithoutAuth function in api.ts
 * @returns The response of GetServerSettings API
 * @see https://zulip.com/api/get-server-settings
 */
export async function getServerSettings(client: AxiosInstance) {
  const resp = await client.get<GetServerSettingsResponse>('/server_settings')

  return resp.data
}
