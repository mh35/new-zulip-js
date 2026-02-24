import type { AxiosInstance } from 'axios'
import type { ChannelPermissionGroupObj } from './common'
import type { GeneralSuccessResponse } from '../api'
import type { StreamPostPlicyValues } from '../constants'

/**
 * Parameters of GetSubscriptions API
 * @see https://zulip.com/api/get-subscriptions#parameters
 */
export type GetSubscriptionsParams = {
  /**
   * Get subscriber IDs or not. Default is false
   *
   * true: Fetch all subscribers in subscribers field.
   *
   * false: Not fetch subscribers
   *
   * partial: Fetch partial subscribers in partial_subscribers field.
   * @see https://zulip.com/api/get-subscriptions#parameter-include_subscribers
   */
  include_subscribers?: 'true' | 'false' | 'partial'
}

/**
 * Subscribed channel on GetSubscriptions API
 */
export type GetSubscriptionsResponseItem = {
  /**
   * Stream ID
   */
  stream_id: number
  /**
   * Stream name
   */
  name: string
  /**
   * Description in Zulip-flavored Markdown
   */
  description: string
  /**
   * Description reandered as HTML
   */
  rendered_description: string
  /**
   * UNIX timestamp when the channel is created
   * @since Zulip 4.0 (feature level 30)
   */
  date_created: number
  /**
   * ID of the user who created the channel.
   * If null, the reason is one of below.
   *
   * - Channel is too old to record the creator.
   *
   * - Channel was created when the realm was created.
   *
   * - Channel was created via the import tool.
   * @since Zulip 9.0 (feature level 254)
   */
  creator_id: number | null
  /**
   * Whether the channel is private or not
   */
  invite_only: boolean
  /**
   * The IDs of subscribers.
   * This field exists only if include_subscribers=true
   */
  subscribers?: number[]
  /**
   * The ID of partial subscribers
   * This field exists only if include_subscribers=partial
   * @since Zulip 11.0 (feature level 412)
   */
  partial_subscribers?: number[]
  /**
   * Whether desktop notification is enabled or not.
   * null indicates user-level default settings
   */
  desktop_notifications: boolean | null
  /**
   * Whether email notification is enabled or not.
   * null indicates user-level default settings
   */
  email_notifications: boolean | null
  /**
   * Whether wildcard mention triggers notification as you mentioned.
   * null indicates user-level default settings
   */
  wildcard_mentions_notify: boolean | null
  /**
   * Whether push notification is enabled or not.
   * null indicates user-level default settings
   */
  push_notifications: boolean | null
  /**
   * Whether audible notification is enabled or not.
   * null indicates user-level default settings
   */
  audible_notifications: boolean | null
  /**
   * Whether the channel is pinned to the top or not.
   */
  pin_to_top: boolean
  /**
   * Whether the channel is muted or not.
   */
  is_muted: boolean
  /**
   * Invert of is_muted
   * @deprecated Use is_muted instead.
   */
  in_home_view: boolean
  /**
   * Only administrator can post or not
   * @deprecated From Zulip 3.0 (feature level 1), use stream_post_policy.
   * If you use Zulip 10.0 (feature level 333) or later, use can_send_message_group.
   */
  is_announcement_only: boolean
  /**
   * Whether the messages in this channel is public to the web or not.
   */
  is_web_public: boolean
  /**
   * Uesr's personal color of this channel
   */
  color: string
  /**
   * Who can post to the channel.
   *
   * 1: Anyone can post
   *
   * 2: Only administrators can post
   *
   * 3: Only full members can post
   *
   * 4: Only moderators can post
   * @deprecated Since Zulip 10.0 (feature level 333), use can_send_message_group.
   */
  stream_post_policy: StreamPostPlicyValues
  /**
   * The number of days the message is deleted by the message retention policy.
   *
   * If this field is null, inherits from the organization level setting.
   *
   * If this field is -1, the message never expires by the message retention policy.
   */
  message_retention_days: number | null
  /**
   * Whether the history of the channel is public to its subscribers.
   */
  history_public_to_subscribers: boolean
  /**
   * The ID of the first message in the channel.
   *
   * If this field is null, no history is available.
   */
  first_message_id: number | null
  /**
   * The ID of the folder. If null, this channel does not belong any folders.
   * @since Zulip 11.0 (feature level 389)
   */
  folder_id: number | null
  /**
   * Whether empty name topic and named topics are enabled or not.
   *
   * inherit: Inherits from organization-level realm_topics_policy
   *
   * allow_empty_topic: Both empty name topic and named topics are enabled
   *
   * disable_empty_topic: Only named topics are enabled
   *
   * empty_topic_only: Only empty topic name is enabled
   * @since Zulip 11.0 (feature level 392)
   */
  topics_policy:
    | 'inherit'
    | 'allow_empty_topic'
    | 'disable_empty_topic'
    | 'empty_topic_only'
  /**
   * Whether the channel has recent message activity.
   */
  is_recently_active: boolean
  /**
   * The average number of messages sent to the channel per week
   *
   * null indicates there is insufficient data to estimate the average traffic.
   */
  stream_weekly_traffic: number | null
  /**
   * A group-setting value defining the set of users who have permission to
   * add subscribers to this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 10.0 (feature level 342)
   */
  can_add_subscribers_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * remove subscribers from this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 6.0 (feature level 142)
   */
  can_remove_subscribers_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * administer this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 10.0 (feature level 325)
   */
  can_administer_channel_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * delete any messages in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 407)
   */
  can_delete_any_message_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * delete messages the user sent in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 407)
   */
  can_delete_own_message_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * move messages from this channel to another channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 396)
   */
  can_move_messages_out_of_channel_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * move messages from another channel to this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 396)
   */
  can_move_messages_within_channel_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * send messages in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 10.0 (feature level 333)
   */
  can_send_message_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * subscribe this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 10.0 (feature level 357)
   */
  can_subscribe_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * resolve topics in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 11.0 (feature level 402)
   */
  can_resolve_topics_group: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * create topics in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 12.0 (feature level 441)
   */
  can_create_topic_group: number | ChannelPermissionGroupObj
  /**
   * Whether the channel is archived or not.
   * @since Zulip 10.0 (feature level 315)
   */
  is_archived: boolean
  /**
   * The number of subscribers who is not deactivated.
   * @since Zulip 11.0 (feature level 394)
   */
  subscriber_count: number
}

/**
 * The response of GetSubscriptions API
 * @see https://zulip.com/api/get-subscriptions#response
 */
export type GetSubscriptionsResponse = GeneralSuccessResponse & {
  /**
   * The list of subscribed channels
   */
  subscriptions: GetSubscriptionsResponseItem[]
}

/**
 * Subscription target item of SubscribeChannels API
 * @see https://zulip.com/api/subscribe#parameter-subscriptions
 */
export type SubscribeChannelsSubscriptionItem = {
  /**
   * The name of the channel
   */
  name: string
  /**
   * The description of the channel in Zulip-flavored Markdown.
   * Used only when creating new channels.
   */
  description?: string
}

/**
 * A dictionary where key is user ID and value is channel names.
 */
type SubscribeChannelsMap = Record<string, string[]>

/**
 * Parameters of SubscribeChannels API
 * @see https://zulip.com/api/subscribe#parameters
 */
export type SubscribeChannelsParams = {
  /**
   * The list of channels to subscribe
   * @see https://zulip.com/api/subscribe#parameter-subscriptions
   */
  subscriptions: SubscribeChannelsSubscriptionItem[]
  /**
   * Users to subscribe. If omitted, subscribe the requesting user.
   * The default value is only current user.
   * @see https://zulip.com/api/subscribe#parameter-principals
   */
  principals?: number[] | string[]
  /**
   * Treat authorization errors as fatal or not.
   * The default value is true.
   * @see https://zulip.com/api/subscribe#parameter-authorization_errors_fatal
   */
  authorization_errors_fatal?: boolean
  /**
   * Send a notification-bot announcement when creating new channels.
   * The default value is false.
   * @see https://zulip.com/api/subscribe#parameter-announce
   */
  announce?: boolean
  /**
   * Whether newly created channels are private. The default value is false.
   * @see https://zulip.com/api/subscribe#parameter-invite_only
   */
  invite_only?: boolean
  /**
   * Whether newly created channels are web-public. The default value is false.
   * @since Zulip 5.0 (feature level 98)
   * @see https://zulip.com/api/subscribe#parameter-is_web_public
   */
  is_web_public?: boolean
  /**
   * Whether newly created channels are default channels.
   * The default value is false.
   * @since Zulip 8.0 (feature level 200)
   * @see https://zulip.com/api/subscribe#parameter-is_default_stream
   */
  is_default_stream?: boolean
  /**
   * Whether history is available to newly subscribed users.
   * @see https://zulip.com/api/subscribe#parameter-history_public_to_subscribers
   */
  history_public_to_subscribers?: boolean
  /**
   * The channel-level message retention policy.
   *
   * If number, retain for that number of days.
   *
   * realm_default: Use organization-level policy.
   *
   * unlimited: Never delete by retention policy.
   * @since Zulip 3.0 (feature level 17)
   * @see https://zulip.com/api/subscribe#parameter-message_retention_days
   */
  message_retention_days?: number | 'realm_default' | 'unlimited'
  /**
   * Topic policy setting for newly created channels.
   * @since Zulip 11.0 (feature level 392)
   * @see https://zulip.com/api/subscribe#parameter-topics_policy
   */
  topics_policy?:
    | 'inherit'
    | 'allow_empty_topic'
    | 'disable_empty_topic'
    | 'empty_topic_only'
  /**
   * Group setting for add-subscribers permission.
   * @since Zulip 10.0 (feature level 342)
   */
  can_add_subscribers_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for remove-subscribers permission.
   * @since Zulip 6.0 (feature level 142)
   */
  can_remove_subscribers_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for channel-administer permission.
   * @since Zulip 10.0 (feature level 325)
   */
  can_administer_channel_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for deleting any message.
   * @since Zulip 11.0 (feature level 407)
   */
  can_delete_any_message_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for deleting own messages.
   * @since Zulip 11.0 (feature level 407)
   */
  can_delete_own_message_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for moving messages out of channel.
   * @since Zulip 11.0 (feature level 396)
   */
  can_move_messages_out_of_channel_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for moving messages within channel.
   * @since Zulip 11.0 (feature level 396)
   */
  can_move_messages_within_channel_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for sending messages.
   * @since Zulip 10.0 (feature level 333)
   */
  can_send_message_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for subscribing to channel.
   * @since Zulip 10.0 (feature level 357)
   */
  can_subscribe_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for resolving topics.
   * @since Zulip 11.0 (feature level 402)
   */
  can_resolve_topics_group?: number | ChannelPermissionGroupObj
  /**
   * Group setting for creating topics.
   * @since Zulip 12.0 (feature level 441)
   */
  can_create_topic_group?: number | ChannelPermissionGroupObj
  /**
   * Add newly created channel to this folder.
   * @since Zulip 11.0 (feature level 389)
   * @see https://zulip.com/api/subscribe#parameter-folder_id
   */
  folder_id?: number
  /**
   * Send notification-bot direct messages to newly subscribed users.
   * The default value is true.
   * @see https://zulip.com/api/subscribe#parameter-send_new_subscription_messages
   */
  send_new_subscription_messages?: boolean
}

/**
 * Response of SubscribeChannels API
 * @see https://zulip.com/api/subscribe#response
 */
export type SubscribeChannelsResponse = GeneralSuccessResponse & {
  /**
   * Subscriptions added by this request
   */
  subscribed: SubscribeChannelsMap
  /**
   * Subscriptions that already existed
   */
  already_subscribed: SubscribeChannelsMap
  /**
   * Unauthorized channel names.
   * Exists only if authorization_errors_fatal=false.
   */
  unauthorized?: string[]
  /**
   * Whether Notification Bot DMs were sent.
   * Exists only if send_new_subscription_messages=true.
   * @since Zulip 11.0 (feature level 397)
   */
  new_subscription_messages_sent?: boolean
}

/**
 * Parameters of UnsubscribeChannels API
 * @see https://zulip.com/api/unsubscribe#parameters
 */
export type UnsubscribeChannelsParams = {
  /**
   * The list of channels to unsubscribe
   * @see https://zulip.com/api/unsubscribe#parameter-subscriptions
   */
  subscriptions: string[]
  /**
   * Users to unsubscribe. If omitted, unsubscribe the requesting user.
   * @see https://zulip.com/api/unsubscribe#parameter-principals
   */
  principals?: number[] | string[]
}

/**
 * Response of UnsubscribeChannels API
 * @see https://zulip.com/api/unsubscribe#response
 */
export type UnsubscribeChannelsResponse = GeneralSuccessResponse & {
  /**
   * A list of channels unsubscribed by this request.
   */
  removed: string[]
  /**
   * A list of channels that were already unsubscribed.
   */
  not_removed: string[]
}

/**
 * The response of GetSubscriptionStatus API
 * @see https://zulip.com/api/get-subscription-status#response
 */
export type GetSubscriptionStatusResponse = GeneralSuccessResponse & {
  /**
   * Whether the user is subscribed the channel or not
   */
  is_subscribed: boolean
}

/**
 * The response of GetSubscribers API
 * @see https://zulip.com/api/get-subscribers#response
 */
export type GetSubscribersResponse = GeneralSuccessResponse & {
  /**
   * User IDs of subscribers
   */
  subscribers: number[]
}

/**
 * The response of GetUserChannels API
 * @since Zulip 12.0 (feature level 440)
 * @see https://zulip.com/api/get-user-channels#response
 */
export type GetUserChannelsResponse = GeneralSuccessResponse & {
  /**
   * Subscribed channel IDs
   */
  subscribed_channel_ids: number[]
}

/**
 *
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of GetSubscriptions API
 * @see https://zulip.com/api/get-subscriptions
 */
export async function getSubscriptions(
  client: AxiosInstance,
  params: GetSubscriptionsParams,
) {
  const resp = await client.get<GetSubscriptionsResponse>(
    '/users/me/subscriptions',
    {
      params,
    },
  )
  return resp.data
}

/**
 * Subscribe one or more users to one or more channels.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of SubscribeChannels API
 * @see https://zulip.com/api/subscribe
 */
export async function subscribeChannels(
  client: AxiosInstance,
  params: SubscribeChannelsParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value) || typeof value === 'object') {
      body.append(key, JSON.stringify(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.post<SubscribeChannelsResponse>(
    '/users/me/subscriptions',
    body,
  )

  return resp.data
}

/**
 * Unsubscribe one or more users from one or more channels.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of UnsubscribeChannels API
 * @see https://zulip.com/api/unsubscribe
 */
export async function unsubscribeChannels(
  client: AxiosInstance,
  params: UnsubscribeChannelsParams,
) {
  const body = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value) || typeof value === 'object') {
      body.append(key, JSON.stringify(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.delete<UnsubscribeChannelsResponse>(
    '/users/me/subscriptions',
    {
      data: body,
    },
  )

  return resp.data
}

/**
 * Check whether the user subscribes a channel or not
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @param streamId Stream ID
 * @returns The response of GetSubscriptionStatus API
 * @see https://zulip.com/api/get-subscription-status
 */
export async function getSubscriptionStatus(
  client: AxiosInstance,
  userId: number,
  streamId: number,
) {
  const resp = await client.get<GetSubscriptionStatusResponse>(
    `/users/${userId}/subscriptions/${streamId}`,
  )
  return resp.data
}

/**
 * Get the IDs of subscribers
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param streamId Stream ID
 * @returns The response of GetSubscribers API
 * @see https://zulip.com/api/get-subscribers
 */
export async function getSubscribers(client: AxiosInstance, streamId: number) {
  const resp = await client.get<GetSubscribersResponse>(
    `/streams/${streamId}/members`,
  )
  return resp.data
}

/**
 * Get IDs of channels that the user subscribes
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param userId User ID
 * @returns The response of GetUserChannels API
 * @since Zulip 12.0 (feature level 440)
 * @see https://zulip.com/api/get-user-channels
 */
export async function getUserChannels(client: AxiosInstance, userId: number) {
  const resp = await client.get<GetUserChannelsResponse>(
    `/users/${userId}/channels`,
  )
  return resp.data
}
