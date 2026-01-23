"use client"

import { useEffect, useState } from "react"

const rtf = typeof Intl !== "undefined" ? new Intl.RelativeTimeFormat("fi", { numeric: "auto" }) : undefined

export function useTimeAgo(date: Date | string | number) {
  const [label, setLabel] = useState<string>("")
  useEffect(() => {
    const d = typeof date === "number" ? new Date(date) : new Date(date)
    const update = () => {
      const diff = Date.now() - d.getTime()
      const mins = Math.round(diff / 60000)
      if (!rtf) return setLabel(`${mins} min`)
      if (mins < 60) return setLabel(rtf.format(-mins, "minute"))
      const hours = Math.round(mins / 60)
      if (hours < 24) return setLabel(rtf.format(-hours, "hour"))
      const days = Math.round(hours / 24)
      return setLabel(rtf.format(-days, "day"))
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [date])
  return label
}
