import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * The item of the response of GetNavigationViews API
 */
export type GetNavigationViewsResponseItem = {
  /**
   * A unique identifier for the view
   */
  fragment: string
  /**
   * Whether the view appears directly in the sidebar or hidden in the "More Views" menu
   */
  is_pinned: boolean
  /**
   * The user-facing name for custom navigation views.
   *
   * If built-in views, omit this field.
   */
  name?: string | null
}

/**
 * The response of GetNavigationViews API
 * @since Zulip 11.0 (feature level 390)
 * @see https://zulip.com/api/get-navigation-views#response
 */
export type GetNavigationViewsResponse = GeneralSuccessResponse & {
  navigation_views: GetNavigationViewsResponseItem[]
}

/**
 * Parameters of AddNavigationView API
 * @since Zulip 11.0 (feature level 390)
 * @see https://zulip.com/api/add-navigation-view#parameters
 */
export type AddNavigationViewParams = {
  /**
   * A unique identifier for the view
   * @see https://zulip.com/api/add-navigation-view#parameter-fragment
   */
  fragment: string
  /**
   * Whether the view appears directly in the sidebar or hidden in the "More Views" menu
   * @see https://zulip.com/api/add-navigation-view#parameter-is_pinned
   */
  is_pinned: boolean
  /**
   * The user-facing name for custom navigation views.
   *
   * If built-in views, omit this field.
   * @see https://zulip.com/api/add-navigation-view#parameter-name
   */
  name?: string | null
}

type EditNavigationViewEditIsPinnedParams = {
  /**
   * Determines whether the view is pinned (true) or hidden in the menu (false)
   * @see https://zulip.com/api/edit-navigation-view#parameter-is_pinned
   */
  is_pinned: boolean
}

type EditNavigationViewEditNameParams = {
  /**
   * The user-facing name for custom navigation views
   * @see https://zulip.com/api/edit-navigation-view#parameter-name
   */
  name: string
}

/**
 * Parameters of EditNavigationView API
 * @since Zulip 11.0 (feature level 390)
 * @see https://zulip.com/api/edit-navigation-view#parameters
 */
export type EditNavigationViewParams =
  | EditNavigationViewEditIsPinnedParams
  | EditNavigationViewEditNameParams

/**
 * Get all navigation views
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetNavigationViews API
 * @since Zulip 11.0 (feature level 390)
 * @see https://zulip.com/api/get-navigation-views
 */
export async function getNavigationViews(client: AxiosInstance) {
  const resp = await client.get<GetNavigationViewsResponse>('/navigation_views')

  return resp.data
}

/**
 * Create a navigation view
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of AddNavigationView API
 * @since Zulip 11.0 (feature level 390)
 * @see https://zulip.com/api/add-navigation-view
 */
export async function addNavigationView(
  client: AxiosInstance,
  params: AddNavigationViewParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      body.append(key, JSON.stringify(value))
    } else if (typeof value === 'boolean') {
      body.append(key, String(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.post<GeneralSuccessResponse>(
    '/navigation_views',
    body,
  )

  return resp.data
}

/**
 * Edit a navigation view
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param fragment Navigation view fragment
 * @param params API parameters
 * @returns The response of EditNavigationView API
 * @since Zulip 11.0 (feature level 390)
 * @see https://zulip.com/api/edit-navigation-view
 */
export async function editNavigationView(
  client: AxiosInstance,
  fragment: string,
  params: EditNavigationViewParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      body.append(key, JSON.stringify(value))
    } else if (typeof value === 'boolean') {
      body.append(key, String(value))
    } else {
      body.append(key, String(value))
    }
  }
  const resp = await client.patch<GeneralSuccessResponse>(
    `/navigation_views/${encodeURIComponent(fragment)}`,
    body,
  )

  return resp.data
}

/**
 * Remove a navigation view
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param fragment Navigation view fragment
 * @returns The response of RemoveNavigationView API
 * @since Zulip 11.0 (feature level 390)
 * @see https://zulip.com/api/remove-navigation-view
 */
export async function removeNavigationView(
  client: AxiosInstance,
  fragment: string,
) {
  const resp = await client.delete<GeneralSuccessResponse>(
    `/navigation_views/${encodeURIComponent(fragment)}`,
  )

  return resp.data
}
