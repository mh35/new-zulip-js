import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * The response item of GetSnippets API
 */
export type GetSnippetsResponseItem = {
  /**
   * The ID of the snippet
   */
  id: number
  /**
   * The title of the snippet
   */
  title: string
  /**
   * The content of the snippet
   */
  content: string
  /**
   * The UNIX timestamp when the snippet was created
   */
  date_created: number
}

/**
 * The response of GetSnippets API
 * @since Zulip 10.0 (feature level 297)
 * @see https://zulip.com/api/get-saved-snippets#response
 */
export type GetSnippetsResponse = GeneralSuccessResponse & {
  /**
   * Saved snippets
   */
  saved_snippets: GetSnippetsResponseItem[]
}

/**
 * Parameters of CreateSnippet API
 * @since Zulip 10.0 (feature level 297)
 * @see https://zulip.com/api/create-saved-snippet#parameters
 */
export type CreateSnippetParams = {
  /**
   * The title of the snippet
   * @see https://zulip.com/api/create-saved-snippet#parameter-title
   */
  title: string
  /**
   * The content of the snippet
   * @see https://zulip.com/api/create-saved-snippet#parameter-content
   */
  content: string
}

/**
 * The response of CreateSnippet API
 * @since Zulip 10.0 (feature level 297)
 * @see https://zulip.com/api/create-saved-snippet#response
 */
export type CreateSnippetResponse = GeneralSuccessResponse & {
  /**
   * The ID of the saved snippet
   */
  saved_snippet_id: number
}

/**
 * EditSnippet API parameters to edit title
 */
type EditSnippetEditTitleParams = {
  /**
   * The title of the snippet
   * @see https://zulip.com/api/edit-saved-snippet#parameter-title
   */
  title: string
}

/**
 * EditSnippet API parameters to edit content
 */
type EditSnippetEditContentParams = {
  /**
   * The content of the snippet
   * @see https://zulip.com/api/edit-saved-snippet#parameter-content
   */
  content: string
}

/**
 * The parameters for EditSnippet API
 * @since Zulip 10.0 (feature level 368)
 * @see https://zulip.com/api/edit-saved-snippet#parameters
 */
export type EditSnippetParams =
  | EditSnippetEditTitleParams
  | EditSnippetEditContentParams

/**
 * Get all saved snippets
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of GetSnippets API
 * @since Zulip 10.0 (feature level 297)
 * @see https://zulip.com/api/get-saved-snippets
 */
export async function getSnippets(client: AxiosInstance) {
  const resp = await client.get<GetSnippetsResponse>('/saved_snippets')

  return resp.data
}

/**
 * Create a saved snippet
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateSnippet API
 * @since Zulip 10.0 (feature level 297)
 * @see https://zulip.com/api/create-saved-snippet
 */
export async function createSnippet(
  client: AxiosInstance,
  params: CreateSnippetParams,
) {
  const body = new URLSearchParams(params)

  const resp = await client.post<CreateSnippetResponse>('/saved_snippets', body)

  return resp.data
}

/**
 * Edit a snippet
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param snippetId Snippet ID
 * @param params API parameters
 * @returns The response of EditSnippet API
 * @since Zulip 10.0 (feature level 368)
 * @see https://zulip.com/api/edit-saved-snippet
 */
export async function editSnippet(
  client: AxiosInstance,
  snippetId: number,
  params: EditSnippetParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    body.append(key, String(value))
  }

  const resp = await client.patch<GeneralSuccessResponse>(
    `/saved_snippets/${snippetId}`,
    body,
  )

  return resp.data
}
