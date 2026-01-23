import posthog from 'posthog-js'

export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    posthog.capture(event, properties)
  },
  identify: (userId: string, traits?: Record<string, any>) => {
    posthog.identify(userId, traits)
  }
}
