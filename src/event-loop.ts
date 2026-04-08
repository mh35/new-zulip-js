import type { AxiosInstance } from 'axios'
import * as eventQueue from './event-queue'
import * as eventTypes from './event-types'

/**
 * Zulip event wrapper for DOM event
 */
export class ZulipEventEvent extends Event {
  /**
   * Zulip event data
   */
  data: eventTypes.ZulipEvent
  constructor(data: eventTypes.ZulipEvent, options?: EventInit) {
    super(data.type + ('op' in data ? '-' + data.op : ''), options)
    this.data = data
  }
}

export async function createQueue(
  client: AxiosInstance,
  params: eventQueue.RegisterEventQueueParams = {},
  signal?: AbortSignal,
) {
  if (params.fetch_event_types && !params.fetch_event_types.includes('realm')) {
    params.fetch_event_types.push('realm')
  }
  const registerResp = await eventQueue.registerEventQueue(client, params, signal)
  const queueId = registerResp.queue_id
  if (queueId === null) {
    throw new Error('Queue ID does not exist')
  }
}
