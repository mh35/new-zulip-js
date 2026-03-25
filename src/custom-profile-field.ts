import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'
import type { CustomFieldTypeValues } from './constants'

/**
 * Common fields for the item in the response of GetCustomProfileFields API
 */
type GetCustomProfileFieldsItemCommon = {
  /**
   * The ID of the custom field
   */
  id: number
  /**
   * The order number of the custom field. The UI must show custom fields
   * in ascending order by this field
   */
  order: number
  /**
   * The name of the field
   */
  name: string
  /**
   * The help text of the field
   */
  hint: string
  /**
   * Whether the field is required or not
   * @since Zulip 9.0 (feature level 244)
   */
  required: boolean
  /**
   * Whether regular users can edit this field or not
   * @since Zulip 10.0 (feature level 296)
   */
  editable_by_user: boolean
}

/**
 * Short text specific fields for the item in the response of GetCustomProfileFields API
 */
type GetCustomProfileFieldsItemShortText = {
  /**
   * The type of the field.
   *
   * - 1 - Short text
   * - 2 - Paragraph
   * - 3 - Dropdown
   * - 4 - Date picker
   * - 5 - Link
   * - 6 - Person picker
   * - 7 - External account
   * - 8 - Pronouns
   */
  type: 1
  /**
   * Additional configuration data for dropdown or external account
   */
  field_data: ''
  /**
   * Whether the custom profile field. Occurs only if the value is true
   * @since Zulip 6.0 (feature level 146)
   */
  display_in_profile_summary?: true
  /**
   * Whether this custom profile field should be used to match users in
   * typeahead suggestions. Occurs only if the value is true
   * @since Zulip 12.0 (feature level 455)
   */
  use_for_user_matching?: boolean
}

/**
 * Dropdown specific fields for the item in the response of GetCustomProfileFields API
 */
type GetCustomProfileFieldsItemDropdown = {
  /**
   * The type of the field.
   *
   * - 1 - Short text
   * - 2 - Paragraph
   * - 3 - Dropdown
   * - 4 - Date picker
   * - 5 - Link
   * - 6 - Person picker
   * - 7 - External account
   * - 8 - Pronouns
   */
  type: 3
  /**
   * Additional configuration data for dropdown or external account
   */
  field_data: string
  /**
   * Whether the custom profile field. Occurs only if the value is true
   * @since Zulip 6.0 (feature level 146)
   */
  display_in_profile_summary?: true
  /**
   * Whether this custom profile field should be used to match users in
   * typeahead suggestions. Occurs only if the value is true
   * @since Zulip 12.0 (feature level 455)
   */
  use_for_user_matching: never
}

type GetCustomProfileFieldsItemPersonPicker = {
  /**
   * The type of the field.
   *
   * - 1 - Short text
   * - 2 - Paragraph
   * - 3 - Dropdown
   * - 4 - Date picker
   * - 5 - Link
   * - 6 - Person picker
   * - 7 - External account
   * - 8 - Pronouns
   */
  type: 6
  /**
   * Additional configuration data for dropdown or external account
   */
  field_data: ''
  /**
   * Whether the custom profile field. Occurs only if the value is true
   * @since Zulip 6.0 (feature level 146)
   */
  display_in_profile_summary: never
  /**
   * Whether this custom profile field should be used to match users in
   * typeahead suggestions. Occurs only if the value is true
   * @since Zulip 12.0 (feature level 455)
   */
  use_for_user_matching: never
}

/**
 * External account specific fields for the item in the response of GetCustomProfileFields API
 */
type GetCustomProfileFieldsItemExternalAccount = {
  /**
   * The type of the field.
   *
   * - 1 - Short text
   * - 2 - Paragraph
   * - 3 - Dropdown
   * - 4 - Date picker
   * - 5 - Link
   * - 6 - Person picker
   * - 7 - External account
   * - 8 - Pronouns
   */
  type: 7
  /**
   * Additional configuration data for dropdown or external account
   */
  field_data: string
  /**
   * Whether the custom profile field. Occurs only if the value is true
   * @since Zulip 6.0 (feature level 146)
   */
  display_in_profile_summary?: true
  /**
   * Whether this custom profile field should be used to match users in
   * typeahead suggestions. Occurs only if the value is true
   * @since Zulip 12.0 (feature level 455)
   */
  use_for_user_matching?: boolean
}

/**
 * Other types specific fields for the item in the response of GetCustomProfileFields API
 */
type GetCustomProfileFieldsItemOther = {
  /**
   * The type of the field.
   *
   * - 1 - Short text
   * - 2 - Paragraph
   * - 3 - Dropdown
   * - 4 - Date picker
   * - 5 - Link
   * - 6 - Person picker
   * - 7 - External account
   * - 8 - Pronouns
   */
  type: Exclude<CustomFieldTypeValues, 1 | 3 | 6 | 7>
  /**
   * Additional configuration data for dropdown or external account
   */
  field_data: ''
  /**
   * Whether the custom profile field. Occurs only if the value is true
   * @since Zulip 6.0 (feature level 146)
   */
  display_in_profile_summary?: true
  /**
   * Whether this custom profile field should be used to match users in
   * typeahead suggestions. Occurs only if the value is true
   * @since Zulip 12.0 (feature level 455)
   */
  use_for_user_matching: never
}

/**
 * Items in the response of GetCustomProfileFields API
 */
export type GetCustomProfileFieldsItem = GetCustomProfileFieldsItemCommon &
  (
    | GetCustomProfileFieldsItemShortText
    | GetCustomProfileFieldsItemDropdown
    | GetCustomProfileFieldsItemPersonPicker
    | GetCustomProfileFieldsItemExternalAccount
    | GetCustomProfileFieldsItemOther
  )

/**
 * The response of GetCustomProfileFields API
 * @see https://zulip.com/api/get-custom-profile-fields#response
 */
export type GetCusomProfileFieldsResponse = GeneralSuccessResponse & {
  /**
   * The list of custom fields
   */
  custom_fields: GetCustomProfileFieldsItem[]
}

/**
 * Get all custom profile fields information
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetCustomProfileFields API
 * @see https://zulip.com/api/get-custom-profile-fields
 */
export async function getCustomProfileFields(client: AxiosInstance) {
  const resp = await client.get<GetCusomProfileFieldsResponse>(
    '/realm/profile_fields',
  )

  return resp.data
}
