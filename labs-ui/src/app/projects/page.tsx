"use client"

import React from 'react'

type Project = {
  name: string
  status: 'Draft' | 'Active' | 'Deployed' | 'Archived'
  updatedAt: string
}

export default function ProjectsPage() {
  const projects: Project[] = []

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Projects</h1>
        <div className="mt-8 border border-[#111]">
          <div className="grid grid-cols-4 text-[11px] text-zinc-500 px-4 py-3 border-b border-[#111]">
            <div>Name</div>
            <div>Status</div>
            <div>Updated</div>
            <div>Action</div>
          </div>
          {projects.length === 0 ? (
            <div className="px-4 py-6 text-sm text-zinc-500">No projects.</div>
          ) : (
            projects.map((project) => (
              <div key={project.name} className="grid grid-cols-4 px-4 py-3 border-b border-[#111] text-sm">
                <div className="text-zinc-200">{project.name}</div>
                <div className="text-zinc-500">{project.status}</div>
                <div className="text-zinc-500">{project.updatedAt}</div>
                <div className="text-zinc-200">Open</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
