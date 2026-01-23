"use client"

import { useRef, useState } from "react"

export type Node = { id: string; x: number; y: number; label: string }
export type Edge = { id: string; from: string; to: string }

export function FlowCanvas({ nodes = [], edges = [] }: { nodes?: Node[]; edges?: Edge[] }) {
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  function zoomIn() { setScale((s) => Math.min(2, s + 0.1)) }
  function zoomOut() { setScale((s) => Math.max(0.5, s - 0.1)) }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <button className="text-xs underline" onClick={zoomOut}>-</button>
        <span className="text-xs">{Math.round(scale * 100)}%</span>
        <button className="text-xs underline" onClick={zoomIn}>+</button>
      </div>
      <div ref={containerRef} className="h-72 rounded-lg border bg-[linear-gradient(0deg,transparent_24px,rgba(0,0,0,.04)_25px),linear-gradient(90deg,transparent_24px,rgba(0,0,0,.04)_25px)] bg-[length:25px_25px] overflow-hidden">
        <div style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: "0 0" }} className="relative w-[2000px] h-[2000px]">
          {nodes.map((n) => (
            <div key={n.id} className="absolute rounded-md border bg-white px-2 py-1 text-xs shadow" style={{ left: n.x, top: n.y }}>
              {n.label}
            </div>
          ))}
          {/* edges drawing omitted for brevity */}
        </div>
      </div>
    </div>
  )
}
