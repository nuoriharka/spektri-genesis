"use client"

import { useEffect, useRef, useState } from "react"

export default function SimRun() {
  const [logs, setLogs] = useState<string[]>([])
  const esRef = useRef<EventSource | null>(null)

  function start() {
    setLogs([])
    const es = new EventSource("/api/sim-run")
    esRef.current = es
    es.addEventListener("log", (e) => {
      const d = (e as MessageEvent).data
      setLogs((l) => [...l, d])
    })
    es.addEventListener("done", () => {
      setLogs((l) => [...l, "Valmis."])
      es.close()
    })
    es.onerror = () => {
      setLogs((l) => [...l, "Virhe yhteydessä."])
      es.close()
    }
  }

  useEffect(() => () => { esRef.current?.close() }, [])

  return (
    <div className="rounded-xl border border-white/10 p-4">
      <div className="flex items-center gap-3">
        <button onClick={start} className="rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm text-white">Aja simulaatio</button>
        <a href="/signup" className="text-sm underline">Tallenna agentiksi →</a>
      </div>
      <div className="mt-3 h-40 overflow-auto rounded-md bg-black/30 p-2 text-sm text-white/80">
        {logs.length === 0 ? <p className="text-white/50">Ei lokia vielä.</p> : logs.map((l, i) => <div key={i}>• {l}</div>)}
      </div>
    </div>
  )
}
