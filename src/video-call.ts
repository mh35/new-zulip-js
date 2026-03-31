import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from './api'

/**
 * Parameters for CreateBigBlueButtonCall API
 * @see https://zulip.com/api/create-big-blue-button-video-call#parameters
 */
export type CreateBigBlueButtonCallParams = {
  /**
   * Meeting name for the BigBlueButton video call
   */
  meeting_name: string
  /**
   * Configures whether the call is voice-only
   * @since Zulip 10.0 (feature level 337)
   */
  voice_only?: boolean
}

/**
 * The response of CreateBigBlueButtonCall API
 * @see https://zulip.com/api/create-big-blue-button-video-call#response
 */
export type CreateBigBlueButtonCallResponse = GeneralSuccessResponse & {
  /**
   * The URL for the BigBlueButton video call
   */
  url: string
}

/**
 * The response of ConstructorGroupsCall API
 * @since Zulip 12.0 (feature level 460)
 * @see https://zulip.com/api/create-constructor-groups-video-call#response
 */
export type CreateConstructorGroupsCallResponse = GeneralSuccessResponse & {
  /**
   * The URL for the Constructor Groups video call
   */
  url: string
}

/**
 * Create a video call URL for a BigBlueButton video call
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateBigBlueButtonCall API
 * @see https://zulip.com/api/create-big-blue-button-video-call
 */
export async function createBigBlueButtonCall(
  client: AxiosInstance,
  params: CreateBigBlueButtonCallParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue
    } else if (value === null) {
      body.append(key, 'null')
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

  const resp = await client.post<CreateBigBlueButtonCallResponse>(
    '/calls/bigbluebutton/create',
    body,
  )

  return resp.data
}

/**
 * Create a video call URL for a Constructor Groups video call
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @returns The response of ConstructorGroupsCall API
 * @since Zulip 12.0 (feature level 460)
 * @see https://zulip.com/api/create-constructor-groups-video-call
 */
export async function createConstructorGroupsCall(client: AxiosInstance) {
  const resp = await client.post<CreateConstructorGroupsCallResponse>(
    '/calls/constructorgroups/create',
    new URLSearchParams(),
  )

  return resp.data
}
