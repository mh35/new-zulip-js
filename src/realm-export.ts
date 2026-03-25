import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

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
