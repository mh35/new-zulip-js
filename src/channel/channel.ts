import type { AxiosInstance } from 'axios'
import type { ChannelPermissionGroupObj } from './common'
import type { GeneralSuccessResponse } from '../api'
import type { StreamPostPlicyValues } from '../constants'

/**
 * Parameters of GetChannels API
 * @see https://zulip.com/api/get-streams#parameters
 */
export type GetChannelsParams = {
  /**
   * Include all public channels. The default is true
   * @see https://zulip.com/api/get-streams#parameter-include_public
   */
  include_public?: boolean
  /**
   * Include all web-public channels. The default is false
   * @see https://zulip.com/api/get-streams#parameter-include_web_public
   */
  include_web_public?: boolean
  /**
   * Include all channels that the user is subscribed to. The default is true.
   * @see https://zulip.com/api/get-streams#parameter-include_subscribed
   */
  include_subscribed?: boolean
  /**
   * Whether to exclude archived streams from the results. The default is true.
   * @since Zulip 10.0 (feature level 315)
   * @see https://zulip.com/api/get-streams#parameter-exclude_archived
   */
  exclude_archived?: boolean
  /**
   * Include all channels that the user has metadata access to.
   * The default is false.
   * @since Zulip 10.0 (feature level 356)
   * @see https://zulip.com/api/get-streams#parameter-include_all
   */
  include_all?: boolean
  /**
   * Include all default channels for the user's realm. The default is false.
   * @see https://zulip.com/api/get-streams#parameter-include_default
   */
  include_default?: boolean
  /**
   * If the user is a bot, include all channels that the bot's owner is
   * subscribed to. The default is false.
   * @see https://zulip.com/api/get-streams#parameter-include_owner_subscribed
   */
  include_owner_subscribed?: boolean
  /**
   * Include all the channels that the user has content access to.
   * The default is false.
   * @since Zulip 10.0 (feature level 356)
   * @see https://zulip.com/api/get-streams#parameter-include_can_access_content
   */
  include_can_access_content?: boolean
  /**
   * Include all channels. The default is false.
   * The user must have administrative privileges to use this parameter.
   * @deprecated Since Zulip 10.0 (feature level 356), use include_all
   * parameter and exclude_archived parameter.
   * @see https://zulip.com/api/get-streams#parameter-include_all_active
   */
  include_all_active?: boolean
}

/**
 * The channel item of GetChannels API
 */
export type GetChannelsChannel = {
  /**
   * Stream ID
   */
  stream_id: number
  /**
   * Stream name
   */
  name: string
  /**
   * Whether the channel is archived or not.
   * @since Zulip 10.0 (feature level 315)
   */
  is_archived: boolean
  /**
   * Description in Zulip-flavored Markdown
   */
  description: string
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
   * Description reandered as HTML
   */
  rendered_description: string
  /**
   * Whether the messages in this channel is public to the web or not.
   * @since Zulip 2.1.0
   */
  is_web_public: boolean
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
   * @since Zulip 3.0 (feature level 17)
   */
  message_retention_days: number | null
  /**
   * Whether the history of the channel is public to its subscribers.
   */
  history_public_to_subscribers: boolean
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
   * Whether the channel has recent message activity.
   * @since Zulip 10.0 (feature level 323)
   */
  is_recently_active: boolean
  /**
   * Only administrator can post or not
   * @deprecated From Zulip 3.0 (feature level 1), use stream_post_policy.
   * If you use Zulip 10.0 (feature level 333) or later, use can_send_message_group.
   */
  is_announcement_only: boolean
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
   * The number of subscribers who is not deactivated.
   * @since Zulip 11.0 (feature level 394)
   */
  subscriber_count: number
  /**
   * The average number of messages sent to the channel per week
   *
   * null indicates there is insufficient data to estimate the average traffic.
   * @since Zulip 8.0 (feature level 199)
   */
  stream_weekly_traffic: number | null
  /**
   * Whether this stream is the default stream or not. This field is available
   * only if include_default=true
   */
  is_default?: boolean
}

/**
 * The response of GetChannels API
 * @see https://zulip.com/api/get-streams#response
 */
export type GetChannelsResponse = GeneralSuccessResponse & {
  /**
   * List of channels
   */
  streams: GetChannelsChannel[]
}

/**
 * Channel object in GetChannelById API response
 */
export type GetChannelByIdChannel = {
  /**
   * Stream ID
   */
  stream_id: number
  /**
   * Stream name
   */
  name: string
  /**
   * Whether the channel is archived or not.
   * @since Zulip 10.0 (feature level 315)
   */
  is_archived: boolean
  /**
   * Description in Zulip-flavored Markdown
   */
  description: string
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
   * Description reandered as HTML
   */
  rendered_description: string
  /**
   * Whether the messages in this channel is public to the web or not.
   * @since Zulip 2.1.0
   */
  is_web_public: boolean
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
   * @since Zulip 3.0 (feature level 17)
   */
  message_retention_days: number | null
  /**
   * Whether the history of the channel is public to its subscribers.
   */
  history_public_to_subscribers: boolean
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
   * Whether the channel has recent message activity.
   * @since Zulip 10.0 (feature level 323)
   */
  is_recently_active: boolean
  /**
   * Only administrator can post or not
   * @deprecated From Zulip 3.0 (feature level 1), use stream_post_policy.
   * If you use Zulip 10.0 (feature level 333) or later, use can_send_message_group.
   */
  is_announcement_only: boolean
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
   * The number of subscribers who is not deactivated.
   * @since Zulip 11.0 (feature level 394)
   */
  subscriber_count: number
  /**
   * The average number of messages sent to the channel per week
   *
   * null indicates there is insufficient data to estimate the average traffic.
   * @since Zulip 8.0 (feature level 199)
   */
  stream_weekly_traffic: number | null
}

/**
 * The response of GetChannelById
 * @since Zulip 6.0 (feature level 132)
 * @see https://zulip.com/api/get-stream-by-id#response
 */
export type GetChannelByIdResponse = GeneralSuccessResponse & {
  /**
   * The channel
   */
  stream: GetChannelByIdChannel
}

/**
 * Parameters of GetChannelId API
 * @see https://zulip.com/api/get-stream-id#parameters
 */
export type GetChannelIdParams = {
  /**
   * The channel name
   * @see https://zulip.com/api/get-stream-id#parameter-stream
   */
  stream: string
}

/**
 * The response of GetChannelId API
 * @see https://zulip.com/api/get-stream-id#response
 */
export type GetChannelIdResponse = GeneralSuccessResponse & {
  /**
   * The channel ID
   */
  stream_id: number
}

/**
 * Request parameters of CreateChannel API
 * @since Zulip 11.0 (feature level 417)
 */
export type CreateChannelParams = {
  /**
   * The channel name
   * @see https://zulip.com/api/create-channel#parameter-name
   */
  name: string
  /**
   * The channel description
   * @see https://zulip.com/api/create-channel#parameter-description
   */
  description?: string
  /**
   * The IDs of users who subscribe the new channel first.
   * @see https://zulip.com/api/create-channel#parameter-subscribers
   */
  subscribers: number[]
  /**
   * Whether the notification bot announces the creation of the new channel.
   * Default is false
   * @see https://zulip.com/api/create-channel#parameter-announce
   */
  announce?: boolean
  /**
   * Whether the channel is private or not. Default is false
   * @see https://zulip.com/api/create-channel#parameter-invite_only
   */
  invite_only?: boolean
  /**
   * Whether the messages in this channel is public to the web or not.
   * Default is false
   * @see https://zulip.com/api/create-channel#parameter-is_web_public
   */
  is_web_public?: boolean
  /**
   * Whether this stream is the default stream or not. Default is false
   * @see https://zulip.com/api/create-channel#parameter-is_default_stream
   */
  is_default_stream?: boolean
  /**
   * The ID of the channel folder
   * @see https://zulip.com/api/create-channel#parameter-folder_id
   */
  folder_id?: number
  /**
   * Whether empty name topic and named topics are enabled or not.
   * Default is inherit
   *
   * inherit: Inherits from organization-level realm_topics_policy
   *
   * allow_empty_topic: Both empty name topic and named topics are enabled
   *
   * disable_empty_topic: Only named topics are enabled
   *
   * empty_topic_only: Only empty topic name is enabled
   * @see https://zulip.com/api/create-channel#parameter-topics_policy
   */
  topics_policy?:
    | 'inherit'
    | 'allow_empty_topic'
    | 'disable_empty_topic'
    | 'empty_topic_only'
  /**
   * Whether the history of the channel is public to its subscribers.
   * @see https://zulip.com/api/create-channel#parameter-history_public_to_subscribers
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
   * @see https://zulip.com/api/create-channel#parameter-message_retention_days
   */
  message_retention_days?: number | 'realm_default' | 'unlimited'
  /**
   * A group-setting value defining the set of users who have permission to
   * add subscribers to this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_add_subscribers_group
   */
  can_add_subscribers_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * create topics in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @since Zulip 12.0 (feature level 441)
   * @see https://zulip.com/api/create-channel#parameter-can_create_topic_group
   */
  can_create_topic_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * delete any messages in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_delete_any_message_group
   */
  can_delete_any_message_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * delete messages the user sent in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_delete_own_message_group
   */
  can_delete_own_message_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * remove subscribers from this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_remove_subscribers_group
   */
  can_remove_subscribers_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * administer this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_administer_channel_group
   */
  can_administer_channel_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * move messages from this channel to another channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_move_messages_out_of_channel_group
   */
  can_move_messages_out_of_channel_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * move messages from another channel to this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_move_messages_within_channel_group
   */
  can_move_messages_within_channel_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * send messages in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_send_message_group
   */
  can_send_message_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * subscribe this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_subscribe_group
   */
  can_subscribe_group?: number | ChannelPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to
   * resolve topics in this channel.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   * @see https://zulip.com/api/create-channel#parameter-can_resolve_topics_group
   */
  can_resolve_topics_group?: number | ChannelPermissionGroupObj
}

/**
 * The response of CreateChannel API
 * @since Zulip 11.0 (feature level 417)
 * @see https://zulip.com/api/create-channel#response
 */
export type CreateChannelResponse = GeneralSuccessResponse & {
  /**
   * The channel ID
   */
  id: number
}

/**
 * Permission settings object for UpdateChannel API
 */
export type UpdateChannelPermissionSetting = {
  /**
   * New permission settings.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   */
  new: number | ChannelPermissionGroupObj
  /**
   * Old expected permission settings.
   *
   * - If number, the ID of the user group
   *
   * - If object, the permission group object
   */
  old?: number | ChannelPermissionGroupObj
}

/**
 * Change description parameters for UpdateChannel API
 */
type UpdateChannelChangeDescriptionParams = {
  /**
   * The new description
   * @see https://zulip.com/api/update-stream#parameter-description
   */
  description: string
}

/**
 * Change name parameters for UpdateChannel API
 */
type UpdateChannelChangeNameParams = {
  /**
   * The new name
   * @see https://zulip.com/api/update-stream#parameter-new_name
   */
  new_name: string
}

/**
 * Change private channel settings parameters for UpdateChannel API
 */
type UpdateChannelChangePrivateParams = {
  /**
   * Whether the channel is private or not
   * @see https://zulip.com/api/update-stream#parameter-is_private
   */
  is_private: boolean
}

/**
 * Change web publicity settings parameters for UpdateChannel API
 */
type UpdateChannelChangeWebPublicParams = {
  /**
   * Whether the channel is public for web or not
   * @since Zulip 5.0 (feature level 98)
   * @see https://zulip.com/api/update-stream#parameter-is_web_public
   */
  is_web_public: boolean
}

/**
 * Change history publicity settings parameters for UpdateChannel API
 */
type UpdateChannelChangeHistoryPublicParams = {
  /**
   * Whether the history of the channel is public to its subscribers.
   * @see https://zulip.com/api/update-stream#parameter-history_public_to_subscribers
   */
  history_public_to_subscribers: boolean
}

/**
 * Change default channel settings parameters for UpdateChannel API
 */
type UpdateChannelChangeDefaultChannelParams = {
  /**
   * Whether this stream is the default stream or not
   * @since Zulip 8.0 (feature level 200)
   * @see https://zulip.com/api/update-stream#parameter-is_default_stream
   */
  is_default_stream: boolean
}

/**
 * Change message retention settings parameters for UpdateChannel API
 */
type UpdateChannelChangeRetentionParams = {
  /**
   * The channel-level message retention policy.
   *
   * If number, retain for that number of days.
   *
   * realm_default: Use organization-level policy.
   *
   * unlimited: Never delete by retention policy.
   * @see https://zulip.com/api/update-stream#parameter-message_retention_days
   */
  message_retention_days: number | 'realm_default' | 'unlimited'
}

/**
 * Unarchive channel parameters for UpdateChannel API
 */
type UpdateChannelUnarchiveParams = {
  /**
   * Whether the channel is archived or not.
   * In UpdateChannel API, only unarchive channel is supported.
   * If you want to archive channel, use ArchiveChannel API instead.
   * @since Zulip 11.0 (feature level 388)
   * @see https://zulip.com/api/update-stream#parameter-is_archived
   */
  is_archived: false
}

/**
 * Change folder parameters for UpdateChannel API
 */
type UpdateChannelChangeFolderParams = {
  /**
   * Folder ID. If null, removes from current folder.
   * @since Zulip 11.0 (feature level 389)
   * @see https://zulip.com/api/update-stream#parameter-folder_id
   */
  folder_id: number | null
}

/**
 * Change topics policy parameters for UpdateChannel API
 */
type UpdateChannelChangeTopicsPolicyParams = {
  /**
   * Whether empty name topic and named topics are enabled or not.
   * Default is inherit
   *
   * inherit: Inherits from organization-level realm_topics_policy
   *
   * allow_empty_topic: Both empty name topic and named topics are enabled
   *
   * disable_empty_topic: Only named topics are enabled
   *
   * empty_topic_only: Only empty topic name is enabled
   * @since Zulip 11.0 (feature level 392)
   * @see https://zulip.com/api/update-stream#parameter-topics_policy
   */
  topics_policy:
    | 'inherit'
    | 'allow_empty_topic'
    | 'disable_empty_topic'
    | 'empty_topic_only'
}

/**
 * Change add subscribers permission settings parameters for UpdateChannel API
 */
type UpdateChannelChangeAddSubscribersPermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * add subscribers to this channel.
   * @since Zulip 10.0 (feature level 342)
   * @see https://zulip.com/api/update-stream#parameter-can_add_subscribers_group
   */
  can_add_subscribers_group: UpdateChannelPermissionSetting
}

/**
 * Change remove subscribers permission settings parameters for UpdateChannel API
 */
type UpdateChannelChangeRemoveSubscribersPermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * remove subscribers from this channel.
   * @since Zulip 7.0 (feature level 161)
   * @see https://zulip.com/api/update-stream#parameter-can_remove_subscribers_group
   */
  can_remove_subscribers_group: UpdateChannelPermissionSetting
}

/**
 * Change administraotr permission settings parameters for UpdateChannel API
 */
type UpdateChannelChangeAdminPermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * move messages from this channel to another channel.
   * @since Zulip 10.0 (feature level 325)
   * @see https://zulip.com/api/update-stream#parameter-can_administer_channel_group
   */
  can_administer_channel_group: UpdateChannelPermissionSetting
}

/**
 * Change remove any messages permission settings parameters for UpdateChannel API
 */
type UpdateChannelChangeRemoveAnyMessagePermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * delete any messages in this channel.
   * @since Zulip 11.0 (feature level 407)
   * @see https://zulip.com/api/update-stream#parameter-can_delete_any_message_group
   */
  can_delete_any_message_group: UpdateChannelPermissionSetting
}

/**
 * Change remove own messages permission settings parameters for UpdateChannel API
 */
type UpdateChannelChangeRemoveOwnMessagePermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * delete messages the user sent in this channel.
   * @since Zulip 11.0 (feature level 407)
   * @see https://zulip.com/api/update-stream#parameter-can_delete_own_message_group
   */
  can_delete_own_message_group: UpdateChannelPermissionSetting
}

/**
 * Change moving message outside the channel permission settings parameters
 * for UpdateChannel API
 */
type UpdateChannelChangeMoveMessageOutsidePermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * move messages from this channel to another channel.
   * @since Zulip 11.0 (feature level 396)
   * @see https://zulip.com/api/update-stream#parameter-can_move_messages_out_of_channel_group
   */
  can_move_messages_out_of_channel_group: UpdateChannelPermissionSetting
}

/**
 * Change moving message into the channel permission settings parameters
 * for UpdateChannel API
 */
type UpdateChannelChangeMoveMessageInsidePermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * move messages from another channel to this channel.
   * @since Zulip 11.0 (feature level 396)
   * @see https://zulip.com/api/update-stream#parameter-can_move_messages_within_channel_group
   */
  can_move_messages_within_channel_group: UpdateChannelPermissionSetting
}

/**
 * Change sending message permission settings parameters for UpdateChannel API
 */
type UpdateChannelChangeSendMessagePermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * send messages in this channel.
   * @since Zulip 10.0 (feature level 333)
   * @see https://zulip.com/api/update-stream#parameter-can_send_message_group
   */
  can_send_message_group: UpdateChannelPermissionSetting
}

/**
 * Change subscribing channel permission settings parameters for UpdateChannel API
 */
type UpdateChannelChangeSubscribePermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * subscribe this channel.
   * @since Zulip 10.0 (feature level 357)
   * @see https://zulip.com/api/update-stream#parameter-can_subscribe_group
   */
  can_subscribe_group: UpdateChannelPermissionSetting
}

/**
 * Change resolving topics permission settings parameters for UpdateChannel API
 */
type UpdateChannelChangeResolveTopicsPermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * resolve topics in this channel.
   * @since Zulip 11.0 (feature level 402)
   * @see https://zulip.com/api/update-stream#parameter-can_resolve_topics_group
   */
  can_resolve_topics_group: UpdateChannelPermissionSetting
}

type UpdateChannelChangeCreateTopicPermissionParams = {
  /**
   * A group-setting value defining the set of users who have permission to
   * create topics in this channel.
   * @since Zulip 12.0 (feature level 441)
   * @see https://zulip.com/api/update-stream#parameter-can_create_topic_group
   */
  can_create_topic_group: UpdateChannelPermissionSetting
}

/**
 * Parameters for UpdateChannel API
 * @see https://zulip.com/api/update-stream#parameters
 */
export type UpdateChannelParams =
  | UpdateChannelChangeDescriptionParams
  | UpdateChannelChangeNameParams
  | UpdateChannelChangePrivateParams
  | UpdateChannelChangeWebPublicParams
  | UpdateChannelChangeHistoryPublicParams
  | UpdateChannelChangeDefaultChannelParams
  | UpdateChannelChangeRetentionParams
  | UpdateChannelUnarchiveParams
  | UpdateChannelChangeFolderParams
  | UpdateChannelChangeTopicsPolicyParams
  | UpdateChannelChangeAddSubscribersPermissionParams
  | UpdateChannelChangeRemoveSubscribersPermissionParams
  | UpdateChannelChangeAdminPermissionParams
  | UpdateChannelChangeRemoveAnyMessagePermissionParams
  | UpdateChannelChangeRemoveOwnMessagePermissionParams
  | UpdateChannelChangeMoveMessageOutsidePermissionParams
  | UpdateChannelChangeMoveMessageInsidePermissionParams
  | UpdateChannelChangeSendMessagePermissionParams
  | UpdateChannelChangeSubscribePermissionParams
  | UpdateChannelChangeResolveTopicsPermissionParams
  | UpdateChannelChangeCreateTopicPermissionParams

/**
 * Get channels.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of GetChannels API
 * @see https://zulip.com/api/get-streams
 */
export async function getChannels(
  client: AxiosInstance,
  params: GetChannelsParams,
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      // Encode arrays as JSON strings
      sendParams[key] = JSON.stringify(value)
    } else if (typeof value === 'boolean') {
      // Encode booleans as strings
      sendParams[key] = String(value)
    } else {
      // Other values (strings, numbers)
      sendParams[key] = String(value)
    }
  }

  const resp = await client.get<GetChannelsResponse>('/streams', {
    params: sendParams,
  })

  return resp.data
}

/**
 * Get a channel by ID
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param streamId Channel ID
 * @returns The response of GetChannelById API
 * @since Zulip 6.0 (feature level 132)
 * @see https://zulip.com/api/get-stream-by-id
 */
export async function getChannelById(client: AxiosInstance, streamId: number) {
  const resp = await client.get<GetChannelByIdResponse>(`/streams/${streamId}`)

  return resp.data
}

/**
 * Get the ID of the channel named as specified.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of GetChannelId API
 * @see https://zulip.com/api/get-stream-id
 */
export async function getChannelId(
  client: AxiosInstance,
  params: GetChannelIdParams,
) {
  const resp = await client.get<GetChannelIdResponse>('/get_stream_id', {
    params,
  })

  return resp.data
}

/**
 * Create a channel
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateChannel API
 * @since Zulip 11.0 (feature level 417)
 * @see https://zulip.com/api/create-channel
 */
export async function createChannel(
  client: AxiosInstance,
  params: CreateChannelParams,
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

  const resp = await client.post<CreateChannelResponse>(
    '/channels/create',
    body,
  )

  return resp.data
}

/**
 * Update a channel
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param streamId Stream ID
 * @param params API parameters
 * @returns The response of UpdateChannel API
 * @see https://zulip.com/api/update-stream
 */
export async function updateChannel(
  client: AxiosInstance,
  streamId: number,
  params: UpdateChannelParams,
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

  const resp = await client.patch<GeneralSuccessResponse>(
    `/streams/${streamId}`,
    body,
  )

  return resp.data
}

/**
 * Archive a channel
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param streamId Stream ID
 * @returns The response of ArchiveChannel API
 * @see https://zulip.com/api/archive-stream
 */
export async function archiveChannel(client: AxiosInstance, streamId: number) {
  const resp = await client.delete<GeneralSuccessResponse>(
    `/streams/${streamId}`,
  )

  return resp.data
}
