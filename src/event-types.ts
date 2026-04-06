import type { BotServiceOutgoingWebhookFormats } from './constants'

/**
 * Common type of the event
 */
export type EventItemCommon = {
  /**
   * The ID of the event
   */
  id: number
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
export type AlertWordsEventItem = EventItemCommon & {
  /**
   * The event's type
   */
  type: 'alert_words'
  /**
   * Alert words (or phrases) configured by the user
   */
  alert_words: string[]
}
