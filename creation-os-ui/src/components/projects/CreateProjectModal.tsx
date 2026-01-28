"use client"

import React from 'react'

export default function CreateProjectModal() {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)

  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="rounded-md border border-[#111] px-4 py-2 text-xs text-zinc-300 hover:text-white"
      >
        Create Project
      </button>
      <dialog ref={dialogRef} className="rounded-lg border border-[#111] bg-black p-6 text-zinc-200">
        <form method="post" action="/api/projects/create" className="space-y-4">
          <div className="text-sm text-zinc-300">New Project</div>
          <input
            name="name"
            placeholder="Project name"
            className="h-10 w-full rounded-md border border-[#111] bg-black px-3 text-sm text-zinc-200"
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="h-9 rounded-md border border-[#111] px-3 text-xs text-zinc-300 hover:text-white"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="h-9 rounded-md border border-[#111] px-3 text-xs text-zinc-500 hover:text-zinc-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
