import type { GetSubscriptionsResponseItem } from './channel/subscription'
import type {
  BotServiceOutgoingWebhookFormats,
  UserRoleValues,
} from './constants'

/**
 * Common type of the event
 */
export type EventItemCommon = {
  /**
   * The ID of the event
   */
  id: number
  /**
   * The event's type
   */
  type: string
  /**
   * The operation of the event
   */
  op?: string
}

/**
 * A single onboarding step that should be shown to the user
 */
export type EventOnboardingStepItem = {
  /**
   * The type of the onboarding step. Currently, only one_time_notice is the valid value
   * @since Zulip 8.0 (feature level 233)
   */
  type: 'one_time_notice'
  /**
   * The name of the onboarding step
   */
  name: string
}

/**
 * Muted user information
 * @since Zulip 4.0 (feature level 48)
 */
export type EventMutedUserItem = {
  /**
   * The ID of the muted user
   */
  id: number
  /**
   * UNIX timestamp representing when the user was muted
   */
  timestamp: number
}

/**
 * Realm domain information
 */
export type EventRealmDomainItem = {
  /**
   * The new allowed domain
   */
  domain: string
  /**
   * Whether subdomains are allowed for this domain
   */
  allow_subdomains: true
}

/**
 * Realm playground information
 * @since Zulip 4.0 (feature level 49)
 */
export type EventPlaygroundItem = {
  /**
   * ID for the realm playground
   */
  id: number
  /**
   * The user-visible display name of the playground
   */
  name: string
  /**
   * The name of the Pygments language lexer
   */
  pygments_language: string
  /**
   * URL template for the playground
   * @since Zulip 8.0 (feature level 196)
   */
  url_template: string
}

/**
 * Bot service for outgoing webhook
 */
export type EventBotOutgoingWebhookService = {
  /**
   * The URL the outgoing webhook is configured to post to
   */
  base_url: string
  /**
   * Token that the third-party service can use to confirm that the
   * request is indeed coming from Zulip
   */
  token: string
  /**
   * What format requests are posted in
   *
   * - 1: Zulip's native outgoing webhook format
   * - 2: Emulate the Slack outgoing webhook format
   */
  interface: BotServiceOutgoingWebhookFormats
}

/**
 * Bot service for embedded service
 */
export type EventRealmBotEmbeddedService = {
  /**
   * The name of the bot
   */
  service_name: string
  /**
   * A dictionary of string key/value pairs, which describe the configuration
   * for the bot
   */
  config_data: Record<string, string>
}

/**
 * Realm bot item
 */
export type EventRealmBotItem = {
  /**
   * The user ID of the bot
   */
  user_id: number
  /**
   * The default sending channel of the bot. If this value is null,
   * no default channel
   */
  default_sending_stream: string | null
  /**
   * The default channel for which the bot receives events/register data.
   * If this value is null, no default channel
   */
  default_events_register_stream: string | null
  /**
   * Whether the bot can send messages to all channels by default
   */
  default_all_public_streams: boolean
  /**
   * An array containing extra configuration fields only relevant for outgoing
   * webhook bots and embedded bots. This is always a single-element array
   */
  services?: [EventBotOutgoingWebhookService | EventRealmBotEmbeddedService]
}

/**
 * Default channel group
 */
export type EventDefaultStreamGroupItem = {
  /**
   * Name of the default channel group
   */
  name: string
  /**
   * Description of the default channel group
   */
  description: string
  /**
   * ID of the default channel group
   */
  id: number
  /**
   * IDs of all the channels in the default stream group
   */
  streams: number[]
}

/**
 * Event sent to a user's clients when that user's set of configured alert words have changed
 * @see https://zulip.com/api/get-events#alert_words
 */
export type AlertWordsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'alert_words'
  /**
   * The operation of the event
   */
  op: never
  /**
   * Alert words (or phrases) configured by the user
   */
  alert_words: string[]
}

/**
 * Common fields for the person in user_settings-update event
 */
export type UpdateUserSettingsPersonCommon = {
  /**
   * The ID of the user affected by this change
   */
  user_id: number
}

/**
 * Person full name update
 */
export type UpdateUserSettingsPersonFullName =
  UpdateUserSettingsPersonCommon & {
    /**
     * The new full name for the user
     */
    full_name: string
  }

/**
 * Person avater update
 */
export type UpdateUserSettingsPersonAvatar = UpdateUserSettingsPersonCommon & {
  /**
   * The URL of the new avatar for the user
   */
  avatar_url: string
  /**
   * The new avatar data source type for the user
   *
   * - G - Hosted by Gravatar
   * - J - Generated using Jdenticon
   * - U - Uploaded by user
   */
  avatar_source: 'G' | 'J' | 'U'
  /**
   * The new medium-size avatar URL for user
   */
  avatar_url_medium: string
  /**
   * The version number for the user's avatar
   */
  avatar_version: number
}

/**
 * Timezone update
 */
export type UpdateUserSettingsPersonTimezone =
  UpdateUserSettingsPersonCommon & {
    /**
     * The Zulip API email of the user
     * @deprecated It is redundant with the user_id
     */
    email: string
    /**
     * The IANA identifier of the new profile time zone for the user
     */
    timezone: string
  }

/**
 * Bot owner update
 */
export type UpdateUserSettingsPersonOwner = UpdateUserSettingsPersonCommon & {
  /**
   * The user ID of the new bot owner
   */
  bot_owner_id: number
}

/**
 * Role update
 */
export type UpdateUserSettingsPersonRole = UpdateUserSettingsPersonCommon & {
  /**
   * The new role of the user.
   */
  role: UserRoleValues
}

/**
 * Delivery email address update
 */
export type UpdateUserSettingsPersonDeliveryEmail =
  UpdateUserSettingsPersonCommon & {
    /**
     * The new delivery email of the user. null indicates you cannot access their real email.
     */
    delivery_email: string | null
  }

/**
 * Custom field data for custom field value update
 */
export type UpdateUserSettingPersonCustomFieldValue = {
  /**
   * The ID of the custom profile field
   */
  id: number
  /**
   * User's personal value for this custom profile field, or null if unset
   */
  value: string | null
  /**
   * The value rendered in HTML. Will only be present for custom profile field
   * types that support Markdown rendering
   */
  rendered_value?: string
}

/**
 * Custom field data update
 */
export type UpdateUserSettingsPersonCustomField =
  UpdateUserSettingsPersonCommon & {
    /**
     * Custom profile data change
     */
    custom_profile_field: UpdateUserSettingPersonCustomFieldValue
  }

/**
 * Email update
 */
export type UpdateUserSettingsPersonEmail = UpdateUserSettingsPersonCommon & {
  /**
   * The new value of email for the user.
   */
  new_email: string
}

/**
 * Deactivated or reactivated
 * @since Zulip 8.0 (feature level 222)
 */
export type UpdateUserSettingsPersonActivateStatus =
  UpdateUserSettingsPersonCommon & {
    /**
     * Whether the user account has been deactivated
     */
    is_active: boolean
  }

/**
 * Import stub status update
 * @since Zulip 12.0 (feature level 433)
 */
export type UpdateUserSettingsPersonImportStatus =
  UpdateUserSettingsPersonCommon & {
    /**
     * Whether the user account is stub or not. This value is always false.
     */
    is_imported_stub: false
  }

/**
 * User created by API first login
 * @since Zulip 12.0 (feature level 475)
 */
export type UpdateUserSettingsPersonJoinDate =
  UpdateUserSettingsPersonCommon & {
    /**
     * The time when the user logged in to their account for the first time
     */
    date_joined: string
  }

/**
 * Person field types for user_settings-update event
 */
export type UpdateUserSettingsPerson =
  | UpdateUserSettingsPersonFullName
  | UpdateUserSettingsPersonAvatar
  | UpdateUserSettingsPersonTimezone
  | UpdateUserSettingsPersonOwner
  | UpdateUserSettingsPersonRole
  | UpdateUserSettingsPersonDeliveryEmail
  | UpdateUserSettingsPersonCustomField
  | UpdateUserSettingsPersonEmail
  | UpdateUserSettingsPersonActivateStatus
  | UpdateUserSettingsPersonImportStatus
  | UpdateUserSettingsPersonJoinDate

/**
 * Update user settings event
 * @see https://zulip.com/api/get-events#realm_user-update
 */
export type UpdateUserSettingsEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'user_settings'
  /**
   * The operation of the event
   */
  op: 'update'
  /**
   * Update user settings event target and content
   */
  person: UpdateUserSettingsPerson
}

/**
 * Add subscribed channels event
 * @see https://zulip.com/api/get-events#subscription-add
 */
export type AddSubscriptionEvent = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'subscription'
  /**
   * The operation of the event
   */
  op: 'add'
  /**
   * Subscribed channels information
   */
  subscriptions: GetSubscriptionsResponseItem[]
}
