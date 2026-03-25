import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'
import type { UserSettingsEmailAddressVisibilityValues } from './constants'

/**
 * Export type values
 * @since Zulip 10.0 (feature level 304)
 */
export type ExportTypeValues =
  | 'public'
  | 'full_with_consent'
  | 'full_without_consent'

/**
 * Export item of the response of GetExports API
 */
export type GetExportsResponseItem = {
  /**
   * The ID of the export
   */
  id: number
  /**
   * The ID of the user who created the export
   */
  acting_user_id: number
  /**
   * The UNIX timestamp of when the data export was started
   */
  export_time: number
  /**
   * The UNIX timestamp of when the data export was deleted.
   * null indicates the backup is not deleted
   */
  deleted_timestamp: number | null
  /**
   * The UNIX timestamp of when the data export failed.
   * null indicates the export was successfully completed, or is in progress
   */
  failed_timestamp: number | null
  /**
   * The URL to download the generated data export.
   * null indicates the export failed or is in progress
   */
  export_url: string | null
  /**
   * Whether the data export is pending
   */
  pending: boolean
  /**
   * Whether the data export is public, full with consent, or full without consent
   * @since Zulip 10.0 (feature level 304)
   */
  export_type: ExportTypeValues
}

/**
 * The response of GetExports API
 * @see https://zulip.com/api/get-realm-exports#response
 */
export type GetExportsResponse = GeneralSuccessResponse & {
  /**
   * List of exports
   */
  exports: GetExportsResponseItem[]
}

/**
 * Parameters for CreateExport API
 * @see https://zulip.com/api/export-realm
 */
export type CreateExportParams = {
  /**
   * The type of export to create.
   * Defaults to 'public' if not specified.
   * @since Zulip 10.0 (feature level 304)
   */
  export_type?: ExportTypeValues
}

/**
 * The response of CreateExport API
 * @see https://zulip.com/api/export-realm#response
 */
export type CreateExportResponse = GeneralSuccessResponse & {
  /**
   * The ID of the export
   * @since Zulip 7.0 (feature level 182)
   */
  id: number
}

/**
 * Export consent state item
 * @since Zulip 10.0 (feature level 304)
 * @see https://zulip.com/api/get-realm-export-consents#response
 */
export type ExportConsentStateItem = {
  /**
   * The ID of the user
   */
  user_id: number
  /**
   * Whether the user has consented to export their private data
   */
  consented: boolean
  /**
   * The email address visibility policy for the user
   */
  email_address_visibility: UserSettingsEmailAddressVisibilityValues
}

/**
 * The response of GetExportConsentState API
 * @since Zulip 10.0 (feature level 304)
 * @see https://zulip.com/api/get-realm-export-consents#response
 */
export type GetExportConsentStateResponse = GeneralSuccessResponse & {
  /**
   * List of export consent states for users in the realm
   */
  export_consents: ExportConsentStateItem[]
}

/**
 * Get all exports in the realm
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetExports API
 * @since Zulip 2.1
 * @see https://zulip.com/api/get-realm-exports
 */
export async function getExports(client: AxiosInstance) {
  const resp = await client.get<GetExportsResponse>('/export/realm')

  return resp.data
}

/**
 * Create a new data export
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params Parameters for the export
 * @returns The response of CreateExport API
 * @since Zulip 2.1
 * @see https://zulip.com/api/export-realm
 */
export async function createExport(
  client: AxiosInstance,
  params: CreateExportParams = {},
) {
  const body = new URLSearchParams()
  if (params.export_type !== undefined) {
    body.append('export_type', params.export_type)
  }
  const resp = await client.post<CreateExportResponse>('/export/realm', body)

  return resp.data
}

/**
 * Get the export consent state for all users in the realm
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetExportConsentState API
 * @since Zulip 10.0 (feature level 304)
 * @see https://zulip.com/api/get-realm-export-consents
 */
export async function getExportConsentState(client: AxiosInstance) {
  const resp = await client.get<GetExportConsentStateResponse>(
    '/export/realm/consents',
  )

  return resp.data
}
