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

export async function getNavigationViews(client: AxiosInstance) {
  const resp = await client.get<GetNavigationViewsResponse>('/navigation_views')

  return resp.data
}
