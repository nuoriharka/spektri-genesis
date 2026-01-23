"use client"
import { useEffect, useMemo, useState } from "react"

export default function LanguageToggle(){
  const [lang, setLang] = useState<'fi'|'en'>('fi')
  useEffect(()=>{
    try{
      const url = new URL(window.location.href)
      const q = (url.searchParams.get('lang')||'fi').toLowerCase()
      if(q === 'en') setLang('en')
    }catch{}
  },[])
  const target = useMemo(()=> lang === 'fi' ? 'en' : 'fi', [lang])
  const onClick = () => {
    try{
      const url = new URL(window.location.href)
      url.searchParams.set('lang', target)
      window.location.href = url.toString()
    }catch{}
  }
  return (
    <button onClick={onClick} className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15" aria-label="Toggle language">
      {lang.toUpperCase()}
    </button>
  )
}
