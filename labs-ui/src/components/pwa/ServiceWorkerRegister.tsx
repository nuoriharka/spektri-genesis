"use client"

import { useEffect } from 'react'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('serviceWorker' in navigator) {
      const url = '/sw.js'
      const onLoad = () => {
        navigator.serviceWorker.register(url).catch(() => {})
      }
      if (document.readyState === 'complete') onLoad()
      else window.addEventListener('load', onLoad, { once: true })
    }
  }, [])
  return null
}
