"use client"

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

const commands = [
  { label: 'Chat', href: '/chat' },
  { label: 'Projects', href: '/projects' },
  { label: 'Operations', href: '/operations' },
  { label: 'System', href: '/system' }
]

export default function CommandPalette() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [pendingFocus, setPendingFocus] = React.useState<string | null>(null)
  const lastFocusedRef = React.useRef<HTMLElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (!open) {
          lastFocusedRef.current = document.activeElement as HTMLElement | null
          setOpen(true)
          setTimeout(() => inputRef.current?.focus(), 0)
        } else {
          setOpen(false)
          lastFocusedRef.current?.focus?.()
        }
      }
      if (event.metaKey && event.key.toLowerCase() === 'i') {
        event.preventDefault()
        const chatInput = document.getElementById('chat-input') as HTMLInputElement | null
        chatInput?.focus()
      }
      if (event.key === 'End' || event.key === 'ArrowRight') {
        const target = pathname === '/chat'
          ? document.querySelector('[data-scroll-target="chat"]')
          : pathname === '/operations'
            ? document.querySelector('[data-scroll-target="operations"]')
            : document.getElementById('main')
        if (target instanceof HTMLElement) {
          event.preventDefault()
          target.scrollTo({ top: target.scrollHeight, behavior: 'auto' })
        }
      }
      if (event.key === 'Escape' && open) {
        setOpen(false)
        lastFocusedRef.current?.focus?.()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, pathname])

  React.useEffect(() => {
    if (!pendingFocus) return
    if (pendingFocus === pathname) {
      if (pathname === '/chat') {
        const chatInput = document.getElementById('chat-input') as HTMLInputElement | null
        chatInput?.focus()
      } else {
        const main = document.getElementById('main')
        main?.focus()
      }
      setPendingFocus(null)
    }
  }, [pendingFocus, pathname])

  React.useEffect(() => {
    if (open) setOpen(false)
  }, [pathname])

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-6 py-24">
      <div className="w-full max-w-md border border-[#111] bg-black p-4">
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Command"
          className="h-9 w-full border border-[#111] bg-black px-3 text-xs text-zinc-200"
        />
        <div className="mt-3 space-y-2 text-xs text-zinc-400">
          {filtered.map((cmd) => (
            <button
              key={cmd.label}
              onClick={() => {
                setOpen(false)
                setPendingFocus(cmd.href)
                router.push(cmd.href)
              }}
              className="block w-full text-left hover:text-zinc-200"
            >
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
