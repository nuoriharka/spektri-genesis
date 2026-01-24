"use client"

import React from 'react'

type Message = {
  timestamp: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

type ActiveProject = {
  name: string
  phase: string
}

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState('')
  const [active, setActive] = React.useState<ActiveProject | null>(null)
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const refresh = React.useCallback(async () => {
    const [msgRes, stateRes] = await Promise.all([
      fetch('/api/chat/messages', { cache: 'no-store' }),
      fetch('/api/chat/state', { cache: 'no-store' })
    ])
    const msgJson = await msgRes.json()
    const stateJson = await stateRes.json()
    setMessages(msgJson.messages || [])
    setActive(stateJson.active || null)
  }, [])

  React.useEffect(() => {
    refresh()
  }, [refresh])

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key.toLowerCase() === 'i') {
        event.preventDefault()
        inputRef.current?.focus()
      }
      if (event.metaKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        listRef.current?.scrollTo({ top: 0, behavior: 'auto' })
      }
      if (event.key === 'End' || event.key === 'ArrowRight') {
        event.preventDefault()
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'auto' })
      }
      if (event.code === 'Space' && document.activeElement !== inputRef.current) {
        event.preventDefault()
        listRef.current?.scrollBy({ top: 120, behavior: 'auto' })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const send = async () => {
    const content = input.trim()
    if (!content) return
    setInput('')
    await fetch('/api/chat/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    await refresh()
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'auto' })
  }

  const commit = async () => {
    const content = input.trim()
    if (!content) return
    setInput('')
    await fetch('/api/chat/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    await refresh()
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'auto' })
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-[0.08em]">Chat</h1>
          <div className="text-xs text-zinc-500">
            {active ? `${active.name} · ${active.phase}` : 'No active project'}
          </div>
        </div>
        <div
          ref={listRef}
          className="mt-6 h-[360px] overflow-y-auto border border-[#111] p-4 text-sm text-zinc-300"
        >
          {messages.length === 0 ? (
            <div className="text-zinc-500">No messages.</div>
          ) : (
            messages.map((msg) => (
              <div key={`${msg.timestamp}-${msg.role}`} className="mb-3">
                <div className="text-[11px] text-zinc-500">{msg.timestamp}</div>
                <div className="text-zinc-200">{msg.content}</div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Message"
            className="h-10 flex-1 rounded-md border border-[#111] bg-black px-3 text-sm text-zinc-200"
          />
          <button
            onClick={send}
            className="h-10 rounded-md border border-[#111] px-4 text-xs text-zinc-300 hover:text-white"
          >
            Send
          </button>
          <button
            onClick={commit}
            className="h-10 rounded-md border border-[#111] px-4 text-xs text-zinc-300 hover:text-white"
          >
            Commit to Genesis
          </button>
        </div>
      </div>
    </div>
  )
}
