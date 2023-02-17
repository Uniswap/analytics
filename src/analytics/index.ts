import {
  Identify,
  identify,
  init,
  track,
  getDeviceId as getAmplitudeDeviceId,
  getUserId as getAmplitudeUserId,
  getSessionId as getAmplitudeSessionId,
} from '@amplitude/analytics-browser'

import { ApplicationTransport, OriginApplication } from './ApplicationTransport'

type AnalyticsConfig = {
  proxyUrl?: string
  commitHash?: string
  defaultEventName?: string
  // If false or undefined, does not set user properties on the Amplitude client
  isProductionEnv?: boolean
  // When enabled, console log events before sending to amplitude
  debug?: boolean
}

let isInitialized = false
export let analyticsConfig: AnalyticsConfig | undefined

/**
 * Initializes Amplitude with API key for project.
 *
 * Uniswap has two Amplitude projects: test and production. You must be a
 * member of the organization on Amplitude to view details.
 *
 * @param apiKey API key of the application. Currently not utilized in order to keep keys private.
 * @param originApplication Name of the application consuming the package. Used to route events to the correct project.
 * @param options Contains options to be used in the configuration of the package
 */
export function initializeAnalytics(apiKey: string, originApplication: OriginApplication, config?: AnalyticsConfig) {
  // Non-production environments may use hot-reloading, which will re-initialize but should be ignored.
  if (!config?.isProductionEnv && isInitialized) {
    return
  }

  if (config?.isProductionEnv) {
    if (isInitialized) {
      throw new Error('initializeAnalytics called multiple times. Ensure it is outside of a React component.')
    }

    if (config.debug) {
      throw new Error(
        `It looks like you're trying to initialize analytics in debug mode for production. Disable debug mode or use a non-production environment.`
      )
    }
  }

  isInitialized = true
  analyticsConfig = config

  init(
    apiKey,
    /* userId= */ undefined, // User ID should be undefined to let Amplitude default to Device ID
    /* options= */
    {
      // Configure the SDK to work with alternate endpoint
      serverUrl: config?.proxyUrl,
      // Configure the SDK to set the x-application-origin header
      transportProvider: new ApplicationTransport(originApplication),
      // Disable tracking of private user information by Amplitude
      trackingOptions: {
        ipAddress: false,
        carrier: false,
        city: false,
        region: false,
        dma: false, // designated market area
      },
    }
  )
}

/** Sends an event to Amplitude. */
export function sendAnalyticsEvent(eventName: string, eventProperties?: Record<string, unknown>) {
  const origin = window.location.origin

  if (analyticsConfig?.debug) {
    console.log({
      eventName,
      eventProperties: { ...eventProperties, origin },
    })
  }

  track(eventName, { ...eventProperties, origin })
}

export function getDeviceId() {
  return getAmplitudeDeviceId()
}

export function getUserId() {
  return getAmplitudeUserId()
}

export function getSessionId() {
  return getAmplitudeSessionId()
}

type UserValue = string | number | boolean | string[] | number[]

/**
 * Class that exposes methods to mutate the User Model's properties in
 * Amplitude that represents the current session's user.
 *
 * See https://help.amplitude.com/hc/en-us/articles/115002380567-User-properties-and-event-properties
 * for details.
 */
class UserModel {
  private log(method: string, ...parameters: unknown[]) {
    console.debug(`[amplitude(Identify)]: ${method}(${parameters})`)
  }

  private call(mutate: (event: Identify) => Identify) {
    if (!analyticsConfig?.isProductionEnv) {
      const log = (_: Identify, method: string) => this.log.bind(this, method)
      mutate(new Proxy(new Identify(), { get: log }))
      return
    }
    identify(mutate(new Identify()))
  }

  set(key: string, value: UserValue) {
    this.call((event) => event.set(key, value))
  }

  setOnce(key: string, value: UserValue) {
    this.call((event) => event.setOnce(key, value))
  }

  add(key: string, value: number) {
    this.call((event) => event.add(key, value))
  }

  postInsert(key: string, value: string | number) {
    this.call((event) => event.postInsert(key, value))
  }

  remove(key: string, value: string | number) {
    this.call((event) => event.remove(key, value))
  }
}

export const user = new UserModel()
