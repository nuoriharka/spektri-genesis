import { Asset, loadAssets } from '@/lib/store'

type SearchParams = { type?: string; q?: string; sort?: string }

const matchType = (asset: Asset, type?: string) =>
  !type || type === 'All' ? true : asset.type.toLowerCase() === type.toLowerCase()

const matchQuery = (asset: Asset, q?: string) => {
  if (!q) return true
  const query = q.toLowerCase()
  return (
    asset.name.toLowerCase().includes(query) ||
    asset.location.toLowerCase().includes(query) ||
    (asset.tags || []).some((tag) => tag.toLowerCase().includes(query))
  )
}

export default async function AssetsPage({ searchParams }: { searchParams: SearchParams }) {
  const assets = await loadAssets()
  const type = searchParams?.type || 'All'
  const q = searchParams?.q || ''
  const sort = searchParams?.sort || 'updated'
  const filtered = assets.filter((asset) => matchType(asset, type) && matchQuery(asset, q))
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name)
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Assets</h1>
        <form method="get" className="mt-6 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search"
            className="h-9 w-48 rounded-md border border-[#111] bg-black px-3 text-xs text-zinc-200"
          />
          <select
            name="type"
            defaultValue={type}
            className="h-9 rounded-md border border-[#111] bg-black px-3 text-xs text-zinc-200"
          >
            <option>All</option>
            <option>Code</option>
            <option>Media</option>
            <option>Document</option>
            <option>Artifact</option>
          </select>
          <select
            name="sort"
            defaultValue={sort}
            className="h-9 rounded-md border border-[#111] bg-black px-3 text-xs text-zinc-200"
          >
            <option value="updated">Updated</option>
            <option value="name">Name</option>
          </select>
          <button className="h-9 rounded-md border border-[#111] px-3 text-xs text-zinc-300 hover:text-white">
            Apply
          </button>
        </form>
        <div className="mt-6 border border-[#111]">
          <div className="grid grid-cols-6 text-[11px] text-zinc-500 px-4 py-3 border-b border-[#111]">
            <div>Name</div>
            <div>Type</div>
            <div>Updated</div>
            <div>Project</div>
            <div>Action</div>
            <div>Location</div>
          </div>
          {sorted.length === 0 ? (
            <div className="px-4 py-6 text-sm text-zinc-500">No assets.</div>
          ) : (
            sorted.map((asset) => (
              <div key={asset.id} className="border-b border-[#111] px-4 py-3 text-sm">
                <div className="grid grid-cols-6">
                  <div className="text-zinc-200">{asset.name}</div>
                  <div className="text-zinc-500">{asset.type}</div>
                  <div className="text-zinc-500">{asset.updatedAt}</div>
                  <div className="text-zinc-500">{asset.projectId || '—'}</div>
                  <div className="text-zinc-500">{asset.actionId || '—'}</div>
                  <div className="text-zinc-500">{asset.location}</div>
                </div>
                <details className="mt-2 text-xs text-zinc-500">
                  <summary className="cursor-pointer">Preview</summary>
                  <div className="mt-2">
                    Tags: {(asset.tags || []).length ? asset.tags?.join(', ') : '—'}
                  </div>
                </details>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
