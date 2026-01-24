"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const commands = [
  { label: 'Chat', href: '/chat' },
  { label: 'Projects', href: '/projects' },
  { label: 'Operations', href: '/operations' },
  { label: 'System', href: '/system' }
]

export default function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 0)
      }
      if (event.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

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
