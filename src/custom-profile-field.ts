import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'
import type {
  CustomFieldTypeValues,
  CustomFieldExternalAccountPlatforms,
} from './constants'

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
   * Whether the custom profile field displays in a summary section.
   * Occurs only if the value is true
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
 * Parameters for ReorderCustomProfileFields API
 * @see https://zulip.com/api/reorder-custom-profile-fields#parameters
 */
export type ReorderCustomProfileFieldsParams = {
  /**
   * The IDs of all custom profile fields, in the order you want them to appear
   * @see https://zulip.com/api/reorder-custom-profile-fields#parameter-order
   */
  order: number[]
}

/**
 * Field data item for Dropdown custom field in CreateCustomProfileField API
 */
export type CreateCustomProfileFieldDropdownFieldDataItem = {
  /**
   * Pulldown value display text
   */
  text: string
  /**
   * Pulldown order number string
   */
  order: string
}

/**
 * Field data for external account custom field in CreateCustomProfileField API
 * @see https://github.com/zulip/zulip/blob/main/zerver/lib/external_accounts.py#L177-L188
 */
export type CreateCustomProfileFieldExternalAccountData = {
  /**
   * External account platform name
   */
  subtype: CustomFieldExternalAccountPlatforms
  /**
   * URL pattern of the platform
   */
  url_pattern: string
}

/**
 * Common fields in parameters of CreateCustomField API
 */
type CreateCustomProfileFieldBaseParams = {
  /**
   * The name of the custom field
   * @see https://zulip.com/api/create-custom-profile-field#parameter-name
   */
  name?: string
  /**
   * The help text
   * @see https://zulip.com/api/create-custom-profile-field#parameter-hint
   */
  hint?: string
  /**
   * Whether the field is required or not
   * @since Zulip 9.0 (feature level 244)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-required
   */
  required?: boolean
  /**
   * Whether the field is editable by normal user
   * @since Zulip 10.0 (feature level 296)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-editable_by_user
   */
  editable_by_user?: boolean
}

type CreateCustomProfileFieldShortTextParams = {
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
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_type
   */
  type: 1
  /**
   * Additional configuration data for dropdown or external account
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_data
   */
  field_data: never
  /**
   * Whether the custom profile field displays in a summary section.
   * You can specify at most two profile fields to display in a summary section
   * @since Zulip 6.0 (feature level 146)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-display_in_profile_summary
   */
  display_in_profile_summary?: boolean
  /**
   * Whether this custom profile field should be used to match users in typeahead suggestions.
   * You must specify only if this value is true
   * @since Zulip 12.0 (feature level 455)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-use_for_user_matching
   */
  use_for_user_matching?: true
}

type CreateCustomProfileFieldDropdownParams = {
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
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_type
   */
  type: 3
  /**
   * Additional configuration data for dropdown or external account
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_data
   */
  field_data: { [key: string]: CreateCustomProfileFieldDropdownFieldDataItem }
  /**
   * Whether the custom profile field displays in a summary section.
   * You can specify at most two profile fields to display in a summary section
   * @since Zulip 6.0 (feature level 146)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-display_in_profile_summary
   */
  display_in_profile_summary?: boolean
  /**
   * Whether this custom profile field should be used to match users in typeahead suggestions.
   * You must specify only if this value is true
   * @since Zulip 12.0 (feature level 455)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-use_for_user_matching
   */
  use_for_user_matching: never
}

type CreateCustomProfileFieldPersonPickerParams = {
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
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_type
   */
  type: 6
  /**
   * Additional configuration data for dropdown or external account
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_data
   */
  field_data: never
  /**
   * Whether the custom profile field displays in a summary section.
   * You can specify at most two profile fields to display in a summary section
   * @since Zulip 6.0 (feature level 146)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-display_in_profile_summary
   */
  display_in_profile_summary: never
  /**
   * Whether this custom profile field should be used to match users in typeahead suggestions.
   * You must specify only if this value is true
   * @since Zulip 12.0 (feature level 455)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-use_for_user_matching
   */
  use_for_user_matching: never
}

type CreateCustomProfileFieldExternalAccountParams = {
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
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_type
   */
  type: 7
  /**
   * Additional configuration data for dropdown or external account
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_data
   */
  field_data: CreateCustomProfileFieldExternalAccountData
  /**
   * Whether the custom profile field displays in a summary section.
   * You can specify at most two profile fields to display in a summary section
   * @since Zulip 6.0 (feature level 146)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-display_in_profile_summary
   */
  display_in_profile_summary?: boolean
  /**
   * Whether this custom profile field should be used to match users in typeahead suggestions.
   * You must specify only if this value is true
   * @since Zulip 12.0 (feature level 455)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-use_for_user_matching
   */
  use_for_user_matching?: true
}

type CreateCustomProfileFieldOtherTypeParams = {
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
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_type
   */
  type: Exclude<CustomFieldTypeValues, 1 | 3 | 6 | 7>
  /**
   * Additional configuration data for dropdown or external account
   * @see https://zulip.com/api/create-custom-profile-field#parameter-field_data
   */
  field_data: never
  /**
   * Whether the custom profile field displays in a summary section.
   * You can specify at most two profile fields to display in a summary section
   * @since Zulip 6.0 (feature level 146)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-display_in_profile_summary
   */
  display_in_profile_summary?: boolean
  /**
   * Whether this custom profile field should be used to match users in typeahead suggestions.
   * You must specify only if this value is true
   * @since Zulip 12.0 (feature level 455)
   * @see https://zulip.com/api/create-custom-profile-field#parameter-use_for_user_matching
   */
  use_for_user_matching: never
}

/**
 * Parameters for CreateCustomProfileField API
 * @see https://zulip.com/api/create-custom-profile-field#parameters
 */
export type CreateCustomProfileFieldParams =
  CreateCustomProfileFieldBaseParams &
    (
      | CreateCustomProfileFieldShortTextParams
      | CreateCustomProfileFieldDropdownParams
      | CreateCustomProfileFieldPersonPickerParams
      | CreateCustomProfileFieldExternalAccountParams
      | CreateCustomProfileFieldOtherTypeParams
    )

/**
 * The response of CreateCustomProfileField API
 * @see https://zulip.com/api/create-custom-profile-field#response
 */
export type CreateCustomProfileFieldResponse = GeneralSuccessResponse & {
  /**
   * Custom field ID
   */
  id: number
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

/**
 * Reorder custom profile fields
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of ReorderCustomProfileFields API
 * @see https://zulip.com/api/reorder-custom-profile-fields
 */
export async function reorderCustomProfileFields(
  client: AxiosInstance,
  params: ReorderCustomProfileFieldsParams,
) {
  const body = new URLSearchParams({
    order: JSON.stringify(params.order),
  })

  const resp = await client.patch<GeneralSuccessResponse>(
    '/realm/profile_fields',
    body,
  )

  return resp.data
}

/**
 * Create a custom profile field
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateCustomProfileField API
 * @see https://zulip.com/api/create-custom-profile-field
 */
export async function createCustomProfileField(
  client: AxiosInstance,
  params: CreateCustomProfileFieldParams,
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value) || typeof value === 'object') {
      body.append(key, JSON.stringify(value))
    } else if (typeof value === 'boolean') {
      body.append(key, String(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.post<CreateCustomProfileFieldResponse>(
    '/realm/profile_fields',
    body,
  )

  return resp.data
}
