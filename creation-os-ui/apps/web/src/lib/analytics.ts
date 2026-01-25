export type AnalyticsPayload = Record<string, unknown> | undefined

export function track(name: string, payload?: AnalyticsPayload) {
  // Simple stub for analytics; replace with your provider later
  try {
    // eslint-disable-next-line no-console
    console.log("analytics:event", name, payload ?? {})
  } catch {}
}
