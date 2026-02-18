import type { AxiosInstance } from "axios"
import type { GeneralSuccessResponse } from './api'
import type { TopicVisibilityValues } from "./constants"

type SendStreamMessageParams = {
  /**
   * Message destination type
   * @see https://zulip.com/api/send-message#parameter-type
   */
  type: 'stream' | 'channel'
  /**
   * Message destination
   * If string, this is the stream name.
   * If integer, this is the stream ID.
   * @see https://zulip.com/api/send-message#parameter-to
   */
  to: string | number
  /**
   * Topic name. Required for stream messages.
   * @see https://zulip.com/api/send-message#parameter-topic
   */
  topic: string
}

type SendDirectMessageParams = {
  /**
   * Message destination type
   * @see https://zulip.com/api/send-message#parameter-type
   */
  type: 'direct' | 'private'
  /**
   * Message destination
   * If array of string, these are the email addresses of Zulip users emails.
   * If array of number, these are the user IDs.
   * @see https://zulip.com/api/send-message#parameter-to
   */
  to: string[] | number[]
  /**
   * Topic name. Ignored if direct message.

   * @see https://zulip.com/api/send-message#parameter-topic
   */
  topic: never
}

type SendMessageDestinationParams = SendStreamMessageParams | SendDirectMessageParams

type SendMessageWithQueueParams = {
  /**
   * Event queue ID.
   * @see https://zulip.com/api/send-message#parameter-queue_id
   */
  queue_id: string
  /**
   * Local ID chosen by client. Required if queue_id is specified.
   * @see https://zulip.com/api/send-message#parameter-local_id
   */
  local_id: string
}

type SendMessageWithoutQueueParams = {
  /**
   * Event queue ID.
   * @see https://zulip.com/api/send-message#parameter-queue_id
   */
  queue_id: never
  /**
   * Local ID chosen by client. You must not specify local_id unless you specify queue_id.
   * @see https://zulip.com/api/send-message#parameter-local_id
   */
  local_id: never
}

type SendMessageQueueParams = SendMessageWithQueueParams | SendMessageWithoutQueueParams

/**
 * SendMessage API parameters
 * @see https://zulip.com/api/send-message#parameters
 */
export type SendMessageParams = SendMessageDestinationParams & SendMessageQueueParams & {
  /**
   * Message content.
   * @see https://zulip.com/api/send-message#parameter-content
   */
  content: string
  /**
   * Whether mark as read by sender. If not specified, the server uses heuristic based on client name.
   * @see https://zulip.com/api/send-message#parameter-read_by_sender
   */
  read_by_sender?: boolean
}

/**
 * SendMessage API response body
 * @see https://zulip.com/api/send-message#response
 */
export type SendMessageResponse = GeneralSuccessResponse & {
  id: number
  automatic_new_visibility_policy?: TopicVisibilityValues
}

/**
 * UploadFile API response body
 * https://zulip.com/api/upload-file#response
 */
export type UploadFileResponse = GeneralSuccessResponse & {
  /**
   * The URI of the file.
   * @deprecated Deprecated from Zulip 9.0 (feature level 272). Use url field instead.
   */
  uri: string
  /**
   * The URL of the file.
   * @since Zulip 9.0 (feature level 272)
   */
  url: string
  /**
   * The name of the file.
   * @since Zulip 10.0 (feature level 285)
   */
  filename: string
}

type EditMessageContentParams = {
  /**
   * The message of the content.
   * If you specify, you cannot change channel in the same request.
   * @see https://zulip.com/api/update-message#parameter-content
   */
  content: string
  /**
   * The new channel ID.
   * If you specify, you cannot change the content in the same request.
   * @see https://zulip.com/api/update-message#parameter-stream_id
   */
  stream_id: never
}

type EditMessageStreamParams = {
  /**
   * The message of the content.
   * If you specify, you cannot change channel in the same request.
   * @see https://zulip.com/api/update-message#parameter-content
   */
  content: never
  /**
   * The new channel ID.
   * If you specify, you cannot change the content in the same request.
   * @see https://zulip.com/api/update-message#parameter-stream_id
   */
  stream_id: number
}

type EditMessageWithoutContentAndStreamParams = {
  /**
   * The message of the content.
   * If you specify, you cannot change channel in the same request.
   * @see https://zulip.com/api/update-message#parameter-content
   */
  content: never
  /**
   * The new channel ID.
   * If you specify, you cannot change the content in the same request.
   * @see https://zulip.com/api/update-message#parameter-stream_id
   */
  stream_id: never
}

type EditMessageContentStreamParams = EditMessageContentParams |
  EditMessageStreamParams | EditMessageWithoutContentAndStreamParams

/**
 * EditMessage API parameters
 * @see https://zulip.com/api/update-message#parameters
 */
export type EditMessageParams = EditMessageContentStreamParams & {
  /**
   * The new topic name.
   * @see https://zulip.com/api/update-message#parameter-topic
   */
  topic?: string
  /**
   * Propagation mode. The default value is change_one.
   * If you modify only message content, you cannot specify other than change_one.
   * 
   * change_later: The target message and all following messages.
   * 
   * change_one: Only the target message.
   * 
   * change_all: All messages in this topic.
   * @see https://zulip.com/api/update-message#parameter-propagate_mode
   */
  propagate_mode?: 'change_later' | 'change_one' | 'change_all'
  /**
   * Whether to send an automated message to the old topic. The default value is false.
   * @see https://zulip.com/api/update-message#parameter-send_notification_to_old_thread
   * @since Zulip 3.0 (feature level 9)
   */
  send_notification_to_old_thread?: boolean
  /**
   * Whether to send an automated message to the new topic. The default value is true.
   * @see https://zulip.com/api/update-message#parameter-send_notification_to_new_thread
   * @since Zulip 3.0 (feature level 9)
   */
  send_notification_to_new_thread?: boolean
  /**
   * The SHA256 of the previous content of the message.
   * If you provide, the server reports error if the digest does not match
   * the one of the content in the database.
   * @see https://zulip.com/api/update-message#parameter-prev_content_sha256
   * @since Zulip 11.0 (feature level 379)
   */
  prev_content_sha256?: string
}

/**
 * messages field content item of detached_uploads field content item of the EditMessage API response.
 */
export type EditMessageDetachedUploadItemMessageItem = {
  /**
   * Time when the message was sent as a UNIX timestamp.
   * 
   * If the server is Zulip 12.0 (feature level 443) or later, this field is the
   * seconds from the Epoch.
   * If the server is before Zulip 12.0 (feature level 443), this field is the
   * milliseconds from the Epoch.
   */
  date_sent: number
  /**
   * The unique message ID.
   */
  id: number
}

/**
 * detached_uploads field content item of the EditMessage API response.
 */
export type EditMessageDetachedUploadItem = {
  /**
   * The unique ID for the attachment.
   */
  id: number
  /**
   * Name of the uploaded file.
   */
  name: string
  /**
   * A representation of the path of the file within the repository of user-uploaded files.
   */
  path_id: string
  /**
   * Size of the file in bytes.
   */
  size: number
  /**
   * Time when the attachment was uploaded as a UNIX timestamp.
   * 
   * If the server is Zulip 12.0 (feature level 443) or later, this field is the
   * seconds from the Epoch.
   * If the server is before Zulip 12.0 (feature level 443), this field is the
   * milliseconds from the Epoch.
   */
  create_time: number
  /**
   * Basic details on any Zulip messages that have been sent referencing this uploaded file. 
   */
  messages: EditMessageDetachedUploadItemMessageItem[]
}

/**
 * EditMessage API response
 * @see https://zulip.com/api/update-message#response
 */
export type EditMessageResponse = GeneralSuccessResponse & {
  /**
   * Details on all files uploaded by the acting user whose only references were removed
   * when editing this message.
   * @since Zulip 10.0 (API level 285)
   */
  detached_uploads?: EditMessageDetachedUploadItem[]
}

/**
 * Channel narrow operators
 * @see https://github.com/zulip/zulip/blob/main/zerver/lib/narrow_predicate.py#L11
 */
type ChannelNarrowOperators = 'channel' | 'stream'

/**
 * Operators which supports ID operand.
 * @see https://github.com/zulip/zulip/blob/main/zerver/lib/narrow.py#L119
 */
type SupportingIdNarrowOperators = ChannelNarrowOperators | 'id' | 'sender' |
  'group-pm-with' | 'dm-including' | 'with'

/**
 * Operators which supports IDs operand.
 * @see https://github.com/zulip/zulip/blob/main/zerver/lib/narrow.py#L128
 */
type SupportingIdsNarrowOperators = 'pm-with' | 'dm'

/**
 * Narrow item for filtering messages
 * @see https://zulip.com/api/construct-narrow
 */
export type GetMessagesNarrowItem = 
  | {
      /**
       * Narrow operator
       */
      operator: SupportingIdNarrowOperators
      /**
       * Narrow operand
       */
      operand: string | number
      /**
       * Whether invert condition or not. Default is false.
       */
      negated?: boolean
    }
  | {
      /**
       * Narrow operator
       */
      operator: SupportingIdsNarrowOperators
      /**
       * Narrow operand
       */
      operand: string | number[]
      /**
       * Whether invert condition or not. Default is false.
       */
      negated?: boolean
    }
  | {
      /**
       * Narrow operator
       */
      operator: Exclude<string, SupportingIdNarrowOperators | SupportingIdsNarrowOperators>
      /**
       * Narrow operand
       */
      operand: string
      /**
       * Whether invert condition or not. Default is false.
       */
      negated?: boolean
    }

/**
 * Get messages with message ID parameters.
 * If you specify message IDs, you cannot specify anchor parameters.
 * @since Zulip 10.0 (feature level 300)
 * @see https://zulip.com/api/get-messages#parameter-message_ids
 */
type GetMessagesWithMessageIdParams = {
  /**
   * Message retrieve base anchor. Whether message ID or some special strings.
   * 
   * newest: The most recent message.
   * 
   * oldest: The oldest message.
   * 
   * first_unread: If there are some messages which matches the query, the message which
   * is the oldest and matches the query. Otherwise, the most recent message.
   * 
   * date: If there are some messages that are on or after the datetime indicated by the anchor_date,
   * the newest message among them. Otherwise, the most recent message.
   * This value supports since Zulip 12.0 (feature level 445).
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-anchor
   */
  anchor: never
  /**
   * Fetch message which is the anchor or not.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-include_anchor
   */
  include_anchor: never
  /**
   * Anchor date value. This value is not used unless you specify anchor=date.
   * 
   * @since Zulip 12.0 (feature level 445)
   * @see https://zulip.com/api/get-messages#parameter-anchor_date
   */
  anchor_date: never
  /**
   * The number of messages to retrieve which ID is less than the anchor.
   * 
   * You must specify this parameter if you do not specify message IDs.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-num_before
   */
  num_before: never
  /**
   * The number of messages to retrieve which ID is more than the anchor.
   * 
   * You must specify this parameter if you do not specify message IDs.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-num_after
   */
  num_after: never
  /**
   * The message IDs to retrieve.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * 
   * @since Zulip 10.0 (feature level 300)
   * @see https://zulip.com/api/get-messages#parameter-message_ids
   */
  message_ids : number[]
  /**
   * Legacy way to specify "anchor": "first_unread" in Zulip 2.1.x and older.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * 
   * @deprecated Zulip 3.0 (feature level 1)
   * @see https://zulip.com/api/get-messages#parameter-use_first_unread_anchor
   */
  use_first_unread_anchor: never
}

/**
 * Get messages by date parameters.
 * If you specify anchor, you cannot specify message IDs parameter.
 * @since Zulip 12.0 (feature level 445)
 */
type GetMessagesWithAnchorDateParams = {
  /**
   * Message retrieve base anchor. Whether message ID or some special strings.
   * 
   * newest: The most recent message.
   * 
   * oldest: The oldest message.
   * 
   * first_unread: If there are some messages which matches the query, the message which
   * is the oldest and matches the query. Otherwise, the most recent message.
   * 
   * date: If there are some messages that are on or after the datetime indicated by the anchor_date,
   * the newest message which is in them. Otherwise, the most recent message.
   * This value supports since Zulip 12.0 (feature level 445).
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-anchor
   */
  anchor: 'date'
  /**
   * Fetch message which is the anchor or not.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-include_anchor
   */
  include_anchor?: boolean
  /**
   * Anchor date value. This value is not used unless you specify anchor=date.
   * 
   * @since Zulip 12.0 (feature level 445)
   * @see https://zulip.com/api/get-messages#parameter-anchor_date
   */
  anchor_date: string
  /**
   * The number of messages to retrieve which ID is less than the anchor.
   * 
   * You must specify this parameter if you do not specify message IDs.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-num_before
   */
  num_before: number
  /**
   * The number of messages to retrieve which ID is more than the anchor.
   * 
   * You must specify this parameter if you do not specify message IDs.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-num_after
   */
  num_after: number
  /**
   * The message IDs to retrieve.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * 
   * @since Zulip 10.0 (feature level 300)
   * @see https://zulip.com/api/get-messages#parameter-message_ids
   */
  message_ids: never
  /**
   * Legacy way to specify "anchor": "first_unread" in Zulip 2.1.x and older.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * 
   * @deprecated Zulip 3.0 (feature level 1)
   * @see https://zulip.com/api/get-messages#parameter-use_first_unread_anchor
   */
  use_first_unread_anchor: never
}

/**
 * Get messages by anchor parameters which is not the date anchor.
 * If you specify anchor, you cannot specify message IDs parameter.
 */
type GetMessagesWithAnchorNotDateParams = {
  /**
   * Message retrieve base anchor. Whether message ID or some special strings.
   * 
   * newest: The most recent message.
   * 
   * oldest: The oldest message.
   * 
   * first_unread: If there are some messages which matches the query, the message which
   * is the oldest and matches the query. Otherwise, the most recent message.
   * 
   * date: If there are any messages that are on or after the datetime indicated by anchor_date,
   * the newest of those messages. Otherwise, the most recent message.
   * This value supports since Zulip 12.0 (feature level 445).
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-anchor
   */
  anchor: Exclude<string, 'date'> | number
  /**
   * Fetch message which is the anchor or not.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-include_anchor
   */
  include_anchor?: boolean
  /**
   * Anchor date value. This value is not used unless you specify anchor=date.
   * 
   * @since Zulip 12.0 (feature level 445)
   * @see https://zulip.com/api/get-messages#parameter-anchor_date
   */
  anchor_date: never
  /**
   * The number of messages to retrieve which ID is less than the anchor.
   * 
   * You must specify this parameter if you does not specify message IDs.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-num_before
   */
  num_before: number
  /**
   * The number of messages to retrieve which ID is more than the anchor.
   * 
   * You must specify this parameter if you does not specify message IDs.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-num_after
   */
  num_after: number
  /**
   * The message IDs to retrieve.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * 
   * @since Zulip 10.0 (feature level 300)
   * @see https://zulip.com/api/get-messages#parameter-message_ids
   */
  message_ids: never
  /**
   * Legacy way to specify "anchor": "first_unread" in Zulip 2.1.x and older.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * 
   * @deprecated Zulip 3.0 (feature level 1)
   * @see https://zulip.com/api/get-messages#parameter-use_first_unread_anchor
   */
  use_first_unread_anchor: never
}

/**
 * Legacy unread message anchor parameters.
 * If you specify anchor, you cannot specify message IDs parameter.
 * @deprecated Zulip 3.0 (feature level 1)
 */
type GetMessagesOldFirstUnreadParams = {
  /**
   * Message retrieve base anchor. Whether message ID or some special strings.
   * 
   * newest: The most recent message.
   * 
   * oldest: The oldest message.
   * 
   * first_unread: If there are some messages which matches the query, the message which
   * is the oldest and matches the query. Otherwise, the most recent message.
   * 
   * date: If there are some messages that are on or after the datetime indicated by the anchor_date,
   * the newest message which is in them. Otherwise, the most recent message.
   * This value supports since Zulip 12.0 (feature level 445).
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-anchor
   */
  anchor: never
  /**
   * Fetch message which is the anchor or not.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-include_anchor
   */
  include_anchor?: boolean
  /**
   * Anchor date value. This value is not used unless you specify anchor=date.
   * 
   * @since Zulip 12.0 (feature level 445)
   * @see https://zulip.com/api/get-messages#parameter-anchor_date
   */
  anchor_date: never
  /**
   * The number of messages to retrieve which ID is less than the anchor.
   * 
   * You must specify this parameter if you does not specify message IDs.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-num_before
   */
  num_before: number
  /**
   * The number of messages to retrieve which ID is more than the anchor.
   * 
   * You must specify this parameter if you does not specify message IDs.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * @see https://zulip.com/api/get-messages#parameter-num_after
   */
  num_after: number
  /**
   * The message IDs to retrieve.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * 
   * @since Zulip 10.0 (feature level 300)
   * @see https://zulip.com/api/get-messages#parameter-message_ids
   */
  message_ids: never
  /**
   * Legacy way to specify "anchor": "first_unread" in Zulip 2.1.x and older.
   * 
   * You cannot specify both of anchor parameters and message IDs.
   * 
   * @deprecated Zulip 3.0 (feature level 1)
   * @see https://zulip.com/api/get-messages#parameter-use_first_unread_anchor
   */
  use_first_unread_anchor: true
}

type GetMessagesBaseParams = GetMessagesWithMessageIdParams | GetMessagesWithAnchorDateParams |
  GetMessagesWithAnchorNotDateParams | GetMessagesOldFirstUnreadParams

/**
 * GetMessages API parameters.
 * @see https://zulip.com/api/get-messages#parameters
 */
export type GetMessagesParams = GetMessagesBaseParams & {
  /**
   * The narrow which filters messages. The default is empty array.
   * @see https://zulip.com/api/get-messages#parameter-narrow
   */
  narrow?: (GetMessagesNarrowItem | [string, string])[]
  /**
   * Whether the client supports Gravater URL or not. The default is true.
   * @see https://zulip.com/api/get-messages#parameter-client_gravatar
   */
  client_gravatar?: boolean
  /**
   * Apply markdown to the content or not. If false, the server returns
   * the message content as raw Markdown. The default is true.
   * @see https://zulip.com/api/get-messages#parameter-apply_markdown
   */
  apply_markdown?: boolean
  /**
   * Whether the client allows the empty topic name. The default is false.
   * @since Zulip 10.0 (feature level 334)
   * @see https://zulip.com/api/get-messages#parameter-allow_empty_topic_name
   */
  allow_empty_topic_name?: boolean
}

/**
 * Emoji types
 * 
 * unicode_emoji: Emoji in Unicode namespace.
 * 
 * realm_emoji: Emoji uploaded to realm as custom emoji.
 * 
 * zulip_extra_emoji: Special emoji included with Zulip
 */
export type EmojiTypes = 'unicode_emoji' | 'realm_emoji' | 'zulip_extra_emoji'

/**
 * Message flags
 * 
 * read: The user has read the message.
 * 
 * starred: Whether the user has starred the message or not.
 * 
 * collapsed: Whether the user has collapsed the message or not.
 * 
 * mentioned: Whether the current user was mentioned in the message.
 * 
 * stream_wildcard_mentioned: Whether the message contains a channel
 * wildcard mention or not. New in Zulip 8.0 (feature level 224).
 * 
 * topic_wildcard_mentioned: Whether the message contains a topic
 * wildcard mention or not. New in Zulip 8.0 (feature level 224).
 * 
 * has_alert_word: Whether the message contains an alert word
 * which the current user configured.
 * 
 * historical: The current user did not receive the message when
 * it sent, but later the message was added to the user's history.
 * 
 * wildcard_mentioned: Whether the message contains a channel or topic
 * wildcard mention or not. Deprecated from Zulip 8.0 (feature level 224).
 * Use stream_wildcard_mentioned and topic_wildcard_mentioned instead.
 * 
 * You can flag manually only read, starred, and collapsed.
 * @see https://zulip.com/api/update-message-flags#available-flags
 */
export type MessageFlags = 'read' | 'starred' | 'collapsed' | 'mentioned' |
  'stream_wildcard_mentioned' | 'topic_wildcard_mentioned' |
  'has_alert_word' | 'historical' | 'wildcard_mentioned'

/**
 * Display recipients field item as object in GetMessages API.
 */
export type GetMassagesResponseMessageItemDisplayRecipientObjItem = {
  /**
   * The ID of the user.
   */
  id: number
  /**
   * The email address of the user.
   */
  email: string
  /**
   * The full name of the user.
   */
  full_name: string
  /**
   * Whether the user is a mirror dummy.
   */
  is_mirror_dummy: boolean
}

/**
 * The field of the item of edit history which is the content edit.
 */
type GetMessagesResponseMessageItemEditHistoryEditContentItem = {
  /**
   * Previous content
   */
  prev_content: string
  /**
   * Previous rendered content
   */
  prev_rendered_content: string
}

/**
 * The field of the item of edit history which is the change of the topic.
 */
type GetMessagesResponseMessageItemEditHistoryEditTopicItem = {
  /**
   * Previous topic name.
   * @since Zulip 5.0 (feature level 118)
   */
  prev_topic: string
  /**
   * New topic name.
   * @since Zulip 5.0 (feature level 118)
   */
  topic: string
}

/**
 * The field of the item of edit history which is the change of the stream.
 */
type GetMessagesResponseMessageItemEditHistoryMoveStreamItem = {
  /**
   * Previous stream ID
   * @since Zulip 3.0 (feature level 1)
   */
  prev_stream: number
  /**
   * New stream ID
   * @since Zulip 5.0 (feature level 118)
   */
  stream: number
}

/**
 * Edit history item of the message in GetMessages API
 */
export type GetMessagesResponseMessageItemEditHistoryItem = (
  GetMessagesResponseMessageItemEditHistoryEditContentItem |
  GetMessagesResponseMessageItemEditHistoryEditTopicItem |
  GetMessagesResponseMessageItemEditHistoryMoveStreamItem
) & {
  /**
   * The UNIX timestamp when the message was edited.
   */
  timestamp: number
  /**
   * The user ID who edited. This field is only be null if the edit was done
   * before March 2017.
   * 
   * If this field is null, this edit was taken by the sender (content edit)
   * or the unknown user (topic edit).
   */
  user_id: number | null
}

/**
 * Reaction in GetMessages API
 */
export type GetMessagesResponseMessageItemReactionItem = {
  /**
   * Emoji name
   */
  emoji_name: string
  /**
   * Emoji code
   */
  emoji_code: string
  /**
   * Reaction type
   */
  reaction_type: EmojiTypes
  /**
   * Reaction user ID
   */
  user_id: number
}

export type GetMessagesResponseMessageItemSubmessageItem = {
  /**
   * The type of the message.
   */
  msg_type: string
  /**
   * The new content of the submessage.
   */
  content: string
  /**
   * The ID of the message to which the submessage has been added.
   */
  message_id: number
  /**
   * The ID of the user who sent the message.
   */
  sender_id: number
  /**
   * The ID of the submessage.
   */
  id: number
}

export type GetMessagesResponseMessageItemTopicLinkItem = {
  /**
   * The original link text present in the topic.
   */
  text: string
  /**
   * The expanded target url which the link points to.
   */
  url: string
}

/**
 * Stream message field in GetMessages API.
 */
type GetMessagesResponseStreamMessageItem = {
  /**
   * The ID of the channel
   */
  stream_id: number
  /**
   * The type of the message
   * 
   * stream: Post to the channel.
   * 
   * private: Direct message.
   */
  type: 'stream'
}

/**
 * Direct message field in GetMessages API.
 */
type GetMessagesResponseDirectMessageItem = {
  /**
   * The ID of the channel
   */
  stream_id: never
  /**
   * The type of the message
   * 
   * stream: Post to the channel.
   * 
   * private: Direct message.
   */
  type: 'private'
}

/**
 * Message item in GetMessages API.
 */
export type GetMessagesResponseMessageItem = (
  GetMessagesResponseStreamMessageItem |
  GetMessagesResponseDirectMessageItem
) & {
  /**
   * Avatar URL. If the request specifies client_gravatar=true and
   * the user does not upload avatar, this field is null.
   */
  avatar_url: string | null
  /**
   * A Zulip "client" string, describing what Zulip client sent the message.
   */
  client: string
  /**
   * The content/body of the message. If the request specifies
   * apply_markdown=false, this field is the form of raw Markdown.
   * Otherwise, this field is the form of HTML.
   */
  content: string
  /**
   * The content type of the content.
   */
  content_type: 'text/html' | 'text/x-markdown'
  /**
   * Data on the recipient of the message.
   * 
   * If this is string, this is the name of the channel. If this is the
   * list of objects, this is the basic data on the users who received the message.
   */
  display_recipient: string | GetMassagesResponseMessageItemDisplayRecipientObjItem[]
  /**
   * Edit history. This field is present only if the message was edited.
   */
  edit_history?: GetMessagesResponseMessageItemEditHistoryItem[]
  /**
   * The ID of the message
   */
  id: number
  /**
   * Whether the message is a /me status message
   */
  is_me_message: boolean
  /**
   * The UNIX timestamp for when the message's content was last edited,
   * in UTC seconds. This field is present only if the content was edited.
   */
  last_edit_timestamp?: number
  /**
   * The UNIX timestamp for when the message was last moved to a different
   * channel or topic, in UTC seconds. This field is present only if
   * the message was moved.
   * @since Zulip 10.0 (feature level 365)
   */
  last_moved_timestamp?: number
  /**
   * Reactions to the message.
   */
  reactions: GetMessagesResponseMessageItemReactionItem[]
  /**
   * A unique ID for the set of users receiving the message
   * (either a channel or group of users). Useful primarily for hashing.
   */
  recipient_id: number
  /**
   * The Zulip API email address of the message's sender.
   */
  sender_email: string
  /**
   * The full name of the message's sender.
   */
  sender_full_name: string
  /**
   * The user ID of the message's sender.
   */
  sender_id: number
  /**
   * A string identifier for the realm the sender is in.
   * 
   * For example, if the server domain is example.zulip.com, this value is example.
   */
  sender_realm_str: string
  /**
   * The topic of the message. If this message is a direct message,
   * this field value is the empty string.
   */
  subject: string
  /**
   * Data used for certain experimental Zulip integrations.
   */
  submessages: GetMessagesResponseMessageItemSubmessageItem[]
  /**
   * The UNIX timestamp for when the message was sent, in UTC seconds.
   */
  timestamp: number
  /**
   * Data on any links to be included in the topic line
   */
  topic_links: GetMessagesResponseMessageItemTopicLinkItem[]
  /**
   * The user's message flags for the message.
   */
  flags: MessageFlags[]
  /**
   * HTML content of a queried message that matches the narrow.
   * Only present if keyword search was included among the narrow parameters.
   */
  match_content?: string
  /**
   * HTML-escaped topic of a queried message that matches the narrow.
   * Only present if keyword search was included among the narrow parameters.
   */
  match_subject?: string
}

/**
 * The response of GetMessages API.
 * @see https://zulip.com/api/get-messages#response
 */
export type GetMessagesResponse = GeneralSuccessResponse & {
  /**
   * The same anchor specified in the request, or the computed one, if
   * use_first_unread_anchor is true.
   * 
   * This field does not exist if message_ids field is provided.
   */
  anchor?: number
  /**
   * Whether the server promises that the messages list includes the very newest messages
   * matching the narrow.
   */
  found_newest: boolean
  /**
   * Whether the server promises that the messages list includes the very oldest messages
   * matching the narrow.
   */
  found_oldest: boolean
  /**
   * Whether the anchor message is included in the response.
   */
  found_anchor: boolean
  /**
   * Whether the message history was limited due to plan restrictions.
   * This flag is set to true only when the oldest messages (when found_oldest is true)
   * matching the narrow is fetched.
   */
  history_limited: boolean
  /**
   * Messages
   */
  messages: GetMessagesResponseMessageItem[]
}

/**
 * Send a message.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of SendMessage API.
 * @see https://zulip.com/api/send-message
 */
export async function sendMessage(client: AxiosInstance, params: SendMessageParams) {
  const body = new URLSearchParams()
  
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    
    if (Array.isArray(value)) {
      // Encode arrays as JSON strings
      body.append(key, JSON.stringify(value))
    } else if (typeof value === 'boolean') {
      // Encode booleans as strings
      body.append(key, String(value))
    } else {
      // Other values (strings, numbers)
      body.append(key, String(value))
    }
  }
  
  const response = await client.post<SendMessageResponse>('/messages', body)
  
  return response.data
}

/**
 * Upload a file.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param file Upload target file
 * @returns The response of UploadFile API.
 * @see https://zulip.com/api/upload-file
 */
export async function uploadFile(client: AxiosInstance, file: File) {
  const formData = new FormData()
  formData.append('filename', file)
  
  const response = await client.post<UploadFileResponse>('/user_uploads', formData)
  
  return response.data
}

/**
 * Edit a message.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param messageId Message ID
 * @param params EditMessage API parameters.
 * @returns The response of the EditMessage API.
 * @see https://zulip.com/api/update-message
 */
export async function editMesssage(client: AxiosInstance, messageId: number, params: EditMessageParams) {
  const body = new URLSearchParams()
  
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    
    if (Array.isArray(value)) {
      // Encode arrays as JSON strings
      body.append(key, JSON.stringify(value))
    } else if (typeof value === 'boolean') {
      // Encode booleans as strings
      body.append(key, String(value))
    } else {
      // Other values (strings, numbers)
      body.append(key, String(value))
    }
  }
  
  const response = await client.patch<EditMessageResponse>(`/messages/${messageId}`, body)
  
  return response.data
}

/**
 * Delete a message.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param messageId Message ID
 * @returns The response of the DeleteMessage API.
 * @see https://zulip.com/api/delete-message
 */
export async function deleteMessage(client: AxiosInstance, messageId: number) {
  const response = await client.delete<GeneralSuccessResponse>(`/messages/${messageId}`)

  return response.data
}

/**
 * Get messages which matches the criteria.
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of the GetMessages API
 * @see https://zulip.com/api/get-messages
 */
export async function getMessages(client: AxiosInstance, params: GetMessagesParams) {
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
  const response = await client.get<GetMessagesResponse>('/messages', {
    params: sendParams
  })

  return response.data
}
