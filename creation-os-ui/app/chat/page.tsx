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

type PlanProposal = {
  plan: {
    id: string
    title: string
    projectId: string | null
    steps: { id: string; title: string; actionKind: string; payload: string; dependsOn?: string[] }[]
  }
  validation: { executable: boolean; missingDependencies: string[]; unknownActions: string[] }
  note: string
}

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState('')
  const [active, setActive] = React.useState<ActiveProject | null>(null)
  const [operations, setOperations] = React.useState<string[]>([])
  const [stateLog, setStateLog] = React.useState<string[]>([])
  const [proposal, setProposal] = React.useState<PlanProposal | null>(null)
  const [lastSent, setLastSent] = React.useState('')
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const opsRef = React.useRef<HTMLDivElement | null>(null)
  const stateRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const refresh = React.useCallback(async () => {
    const [msgRes, stateRes, logsRes] = await Promise.all([
      fetch('/api/chat/messages', { cache: 'no-store' }),
      fetch('/api/chat/state', { cache: 'no-store' }),
      fetch('/api/chat/logs', { cache: 'no-store' })
    ])
    const msgJson = await msgRes.json()
    const stateJson = await stateRes.json()
    const logsJson = await logsRes.json()
    setMessages(msgJson.messages || [])
    setActive(stateJson.active || null)
    setOperations(logsJson.operations || [])
    setStateLog(logsJson.actions || [])
  }, [])

  React.useEffect(() => {
    refresh()
  }, [refresh])

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
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
    setLastSent(content)
    await fetch('/api/chat/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    const propose = await fetch('/api/plans/propose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    if (propose.ok) {
      const proposalJson = await propose.json()
      setProposal(proposalJson)
    }
    await refresh()
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'auto' })
  }

  const commit = async () => {
    if (!lastSent) return
    await fetch('/api/chat/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: lastSent })
    })
    if (proposal) {
      await fetch('/api/plans/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: proposal.plan })
      })
      setProposal(null)
    }
    await refresh()
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'auto' })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: 16
      }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-[0.08em]">Chat</h1>
          <div className="text-xs text-zinc-500">
            {active ? `${active.name} · ${active.phase}` : 'No active project'}
          </div>
        </div>
        <div className="mt-6 grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex min-h-0 flex-col border border-[#111] p-4 text-sm text-zinc-300">
            <div className="text-[11px] text-zinc-500">Messages</div>
            <div
              ref={listRef}
              data-scroll-target="chat"
              className="mt-3 flex-1 overflow-auto"
            >
              {messages.map((msg) => (
                <div key={`${msg.timestamp}-${msg.role}`} className="mb-3">
                  <div className="text-[11px] text-zinc-500">{msg.timestamp}</div>
                  <div className="text-zinc-200">{msg.content}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-0 flex-col border border-[#111] p-4 text-sm text-zinc-300">
            <div className="text-[11px] text-zinc-500">State</div>
            <div ref={stateRef} className="mt-3 flex-1 overflow-auto">
              {stateLog.map((line, index) => (
                <div key={`${line}-${index}`} className="mb-2">
                  {line}
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-0 flex-col border border-[#111] p-4 text-sm text-zinc-300">
            <div className="text-[11px] text-zinc-500">Operations</div>
            <div ref={opsRef} className="mt-3 flex-1 overflow-auto">
              {operations.map((line, index) => (
                <div key={`${line}-${index}`} className="mb-2">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
        {proposal && (
          <div className="mt-6 border border-[#111] p-4 text-sm text-zinc-300">
            <div className="text-[11px] text-zinc-500">Plan Proposal</div>
            <div className="mt-2 text-zinc-200">{proposal.plan.title}</div>
            <div className="mt-3 space-y-2 text-xs text-zinc-400">
              {proposal.plan.steps.map((step, index) => (
                <div key={step.id}>
                  {index + 1}. {step.actionKind} — {step.title}
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-zinc-500">
              Validation: {proposal.validation.executable ? 'YES' : 'NO'}
            </div>
            <div className="text-xs text-zinc-500">
              Missing dependencies: {proposal.validation.missingDependencies.length ? proposal.validation.missingDependencies.join(', ') : 'None'}
            </div>
            <div className="text-xs text-zinc-500">
              Unknown actions: {proposal.validation.unknownActions.length ? proposal.validation.unknownActions.join(', ') : 'None'}
            </div>
            <div className="mt-2 text-xs text-zinc-500">{proposal.note}</div>
            <div className="mt-4">
              <button
                onClick={commit}
                className="h-10 rounded-md border border-[#111] px-4 text-xs text-zinc-300 hover:text-white"
              >
                Commit Plan to Genesis
              </button>
            </div>
          </div>
        )}
        <div className="mt-auto flex items-center gap-3 pt-4">
          <input
            ref={inputRef}
            id="chat-input"
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
            Commit to Actions
          </button>
        </div>
      </div>
    </div>
  )
}
