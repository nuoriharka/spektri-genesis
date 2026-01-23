"use client"

import { CopyButton } from "./copy-button"

export function CodeBlock({ code, language = "", className = "" }: { code: string; language?: string; className?: string }) {
  return (
    <div className={`relative rounded-lg border bg-black/70 text-white ${className}`}>
      <pre className="overflow-auto p-4 text-xs leading-relaxed"><code className={`language-${language}`}>{code}</code></pre>
      <div className="absolute right-2 top-2">
        <CopyButton value={code} />
      </div>
    </div>
  )
}
