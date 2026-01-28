"use client";
import React from "react";

export function AIChatbot(){
  const [msgs, setMsgs] = React.useState<Array<{role:'user'|'ai'; text:string}>>([]);
  const [text, setText] = React.useState("");
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold text-white">AI Chat demo</h1>
      <div className="mt-4 space-y-3">
        {msgs.map((m, i)=> (
          <div key={i} className={"rounded-xl p-3 "+(m.role==='user'?"bg-white/10 text-white":"bg-[var(--brand)]/15 text-white")}>{m.text}</div>
        ))}
      </div>
      <form className="mt-4 flex gap-2" onSubmit={(e)=>{e.preventDefault(); if(!text.trim()) return; setMsgs([...msgs, {role:'user', text}, {role:'ai', text: `Vastaan: ${text}`}]); setText("");}}>
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 rounded-xl bg-white/10 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[var(--brand)]" placeholder="Kysy jotain..." />
        <button className="rounded-xl bg-[var(--brand)] px-4 py-2 text-white">Lähetä</button>
      </form>
    </div>
  );
}
