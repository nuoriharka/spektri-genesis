export function initTelemetry() {
  if (typeof window === 'undefined') return
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'
  // No-op if no key
  if (!key) return
  // Lightweight inline posthog init without adding dependency
  ;(function(){
    const w:any = window; const p:any = (w.posthog = w.posthog || []); if (p.init) return; p._i = [];
    p.init = function(apiKey: string, config: Record<string, any>){
      function load() { const script = document.createElement('script'); script.type='text/javascript'; script.async=true; script.src= (config.api_host||'https://app.posthog.com') + '/static/array.js'; const x=document.getElementsByTagName('script')[0]; x.parentNode?.insertBefore(script, x) }
      p._i.push([apiKey, config]); if (!p.__SV) { p.__SV=1; load(); }
    };
    p.capture = function(){p._i.push(arguments as any)}
  })();
  ;(window as any).posthog.init(key, { api_host: host, autocapture: true })
}
