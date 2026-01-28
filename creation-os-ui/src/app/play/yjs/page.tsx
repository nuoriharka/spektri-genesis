"use client"
import { useEffect, useMemo, useRef, useState } from 'react'

// Lazy import to avoid SSR issues if yjs isn't installed; provide a soft error.
export default function YjsPlayground() {
  const [error, setError] = useState<string | null>(null)
  const [text, setText] = useState('')
  const editorRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    let ydoc: any
    let ytext: any
    let unsub: any
    ;(async () => {
      try {
        const Y = await import('yjs')
        // Local-only doc; in the future attach a provider (y-webrtc/y-websocket)
        ydoc = new Y.Doc()
        ytext = ydoc.getText('t')

        const applyFromY = () => setText(ytext.toString())
        ytext.observe(applyFromY)
        unsub = () => ytext.unobserve(applyFromY)
        applyFromY()
      } catch (e) {
        setError('Yjs is not installed. Run: pnpm add yjs')
      }
    })()
    return () => {
      try { unsub && unsub() } catch {}
      try { ydoc && ydoc.destroy() } catch {}
    }
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Yjs Playground (local)</h1>
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">Local CRDT text; no provider attached.</p>
      )}
      <textarea
        ref={editorRef}
        value={text}
        onChange={onChange}
        className="w-full h-64 rounded-md border border-border bg-background p-3 outline-none focus:ring-2 focus:ring-primary"
        placeholder="Type here…"
      />
    </div>
  )
}
