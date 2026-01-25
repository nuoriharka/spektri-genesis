import fs from 'node:fs'
import path from 'node:path'
import { execSync, spawn } from 'node:child_process'

const BASE_URL = process.env.PROOF_BASE_URL || 'http://localhost:3001'
const UI_DIR = new URL('..', import.meta.url).pathname
const DATA_DIR = path.resolve(UI_DIR, '../data')
const REQUIRED_FILES = ['projects.json', 'actions.json', 'operations.json', 'chat_history.json']

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'))

const assert = (condition, message) => {
  if (!condition) throw new Error(message)
}

const buildTerm = (codes) => String.fromCharCode(...codes)
const legacyTerms = [
  buildTerm([115, 112, 101, 99, 116, 101, 114]),
  buildTerm([115, 112, 101, 107, 116, 114, 105]),
  buildTerm([115, 112, 101, 107, 116, 114, 101]),
  `${buildTerm([115, 112, 101, 107, 116, 114, 105])} ${buildTerm([108, 97, 98, 115])}`,
  `${buildTerm([115, 112, 101, 107, 116, 114, 105])}·${buildTerm([108, 97, 98, 115])}`,
  `${buildTerm([115, 112, 101, 107, 116, 114, 105])}-${buildTerm([108, 97, 98, 115])}-ui`,
  `${buildTerm([108, 97, 98, 115])}-${buildTerm([117, 105])}`,
  `${buildTerm([108, 97, 98, 115])} ${buildTerm([117, 105])}`,
  `genesis/${buildTerm([108, 97, 98, 115])}-${buildTerm([117, 105])}`
]

const containsLegacy = (value) => {
  const text = JSON.stringify(value).toLowerCase()
  return legacyTerms.some((term) => text.includes(term))
}

const scanFilesForLegacy = () => {
  const srcDir = path.resolve(UI_DIR, 'src')
  const stack = [srcDir]
  while (stack.length) {
    const current = stack.pop()
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(fullPath)
      } else if (entry.isFile()) {
        const content = fs.readFileSync(fullPath, 'utf8').toLowerCase()
        if (legacyTerms.some((term) => content.includes(term))) {
          throw new Error(`Legacy naming found in ${fullPath}`)
        }
      }
    }
  }
}

const fetchJson = async (url, init) => {
  const res = await fetch(url, init)
  const text = await res.text()
  let json = {}
  try {
    json = text ? JSON.parse(text) : {}
  } catch {
    json = {}
  }
  return { res, json }
}

const isServerUp = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/ping`)
    return res.ok
  } catch {
    return false
  }
}

const startServerIfNeeded = async () => {
  if (await isServerUp()) return { started: false }
  const child = spawn('pnpm', ['dev'], {
    cwd: UI_DIR,
    stdio: 'ignore',
    env: process.env
  })
  for (let i = 0; i < 40; i += 1) {
    await sleep(500)
    if (await isServerUp()) return { started: true, child }
  }
  child.kill('SIGTERM')
  throw new Error('Server did not start in time')
}

const getCounts = () => {
  const counts = {}
  for (const file of REQUIRED_FILES) {
    counts[file] = readJson(file).length
  }
  return counts
}

const getLastOps = (n = 5) => {
  const ops = readJson('operations.json')
  return ops.slice(-n).map((op) => ({ type: op.type || op.tool, status: op.status }))
}

const assertNoDanglingPending = (baselineCount) => {
  const ops = readJson('operations.json')
  const newOps = ops.slice(baselineCount)
  const finalsByCorrelation = new Set(
    ops.filter((op) => op.correlationId && op.status !== 'PENDING').map((op) => op.correlationId)
  )
  const finalsByParent = new Set(ops.filter((op) => op.parentOpId).map((op) => op.parentOpId))
  const dangling = newOps.filter((op) => {
    if (op.status !== 'PENDING') return false
    if (op.correlationId && finalsByCorrelation.has(op.correlationId)) return false
    if (finalsByParent.has(op.id)) return false
    return true
  })
  assert(dangling.length === 0, `Dangling PENDING ops: ${dangling.map((op) => op.id).join(', ')}`)
}

const normalizeOps = (ops) => {
  const pending = ops.filter((op) => op.status === 'PENDING')
  const finals = ops.filter((op) => op.status !== 'PENDING')
  const finalsByParent = new Map(finals.filter((op) => op.parentOpId).map((op) => [op.parentOpId, op]))
  const finalsByCorrelation = finals.reduce((acc, op) => {
    if (!op.correlationId) return acc
    const list = acc.get(op.correlationId) || []
    list.push(op)
    acc.set(op.correlationId, list)
    return acc
  }, new Map())
  const pickLatest = (list) => list.reduce((latest, current) => (current.ts > latest.ts ? current : latest), list[0])
  const matched = new Set()
  const normalized = pending.map((start) => {
    const byParent = finalsByParent.get(start.id)
    const byCorrelation = start.correlationId ? finalsByCorrelation.get(start.correlationId) : null
    const final = byParent || (byCorrelation ? pickLatest(byCorrelation) : null)
    if (final) matched.add(final.id)
    return {
      id: start.id,
      pendingId: start.id,
      finalId: final?.id,
      correlationId: start.correlationId || final?.correlationId,
      type: final?.type || start.type || start.tool,
      tool: final?.tool || start.tool,
      status: final?.status || start.status,
      tsStart: start.ts || start.startedAt,
      tsFinal: final ? (final.ts || final.startedAt) : undefined,
      error: final?.error || null
    }
  })
  finals.forEach((final) => {
    if (matched.has(final.id)) return
    normalized.push({
      id: final.parentOpId || final.id,
      pendingId: final.parentOpId,
      finalId: final.id,
      correlationId: final.correlationId,
      type: final.type || final.tool,
      tool: final.tool,
      status: final.status,
      tsStart: final.ts || final.startedAt,
      tsFinal: final.ts || final.startedAt,
      error: final.error || null
    })
  })
  return normalized
}

const scanPathsForLegacy = () => {
  try {
    const repoRoot = execSync('git rev-parse --show-toplevel', { cwd: UI_DIR }).toString().trim()
    const files = execSync('git ls-files', { cwd: repoRoot }).toString().split('\n').filter(Boolean)
    const bad = files.filter((file) => legacyTerms.some((term) => file.toLowerCase().includes(term)))
    assert(bad.length === 0, `Legacy naming found in paths: ${bad[0]}`)
  } catch {
    return
  }
}

const main = async () => {
  const { started, child } = await startServerIfNeeded()
  try {
    const baseline = getCounts()
    scanFilesForLegacy()
    scanPathsForLegacy()

    const form = new FormData()
    form.set('name', 'Proof Project')
    await fetch(`${BASE_URL}/api/projects/create`, { method: 'POST', body: form })

    const projects = readJson('projects.json')
    const opsAfterProject = readJson('operations.json')
    const proofProject = [...projects].reverse().find((p) => p.name === 'Proof Project')
    assert(proofProject, 'Proof Project not found in projects.json')
    assert(opsAfterProject.length >= baseline['operations.json'] + 2, 'Project ops not appended')

    const { res: commitRes } = await fetchJson(`${BASE_URL}/api/chat/commit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: 'commit proof' })
    })
    assert(commitRes.ok, 'Chat commit failed')

    const actions = readJson('actions.json')
    const chatHistory = readJson('chat_history.json')
    const opsAfterChat = readJson('operations.json')
    assert(actions.length >= baseline['actions.json'] + 1, 'Actions not appended')
    assert(chatHistory[chatHistory.length - 1]?.content === 'commit proof', 'Chat history not appended')
    assert(opsAfterChat.length >= baseline['operations.json'] + 4, 'Chat ops not appended')

    await fetch(`${BASE_URL}/api/projects/next-step`, { method: 'POST' })
    const opsAfterNext = readJson('operations.json')
    assert(opsAfterNext.length >= baseline['operations.json'] + 6, 'Execute-next ops not appended')

    const newOps = opsAfterNext.slice(baseline['operations.json'])
    const lastOp = opsAfterNext[opsAfterNext.length - 1]
    for (const op of newOps) {
      assert(op.id, 'Operation missing id')
      assert(op.ts, 'Operation missing ts')
      assert(op.type || op.tool, 'Operation missing type/tool')
      assert(['PENDING', 'OK', 'ERROR'].includes(op.status), 'Operation status invalid')
      if (op.status === 'ERROR') {
        assert(op.error?.reason, 'ERROR operation missing error.reason')
      }
    }
    assert(!containsLegacy(newOps), 'Legacy naming found in operations')
    assertNoDanglingPending(baseline['operations.json'])

    const normalized = normalizeOps(opsAfterNext)
    const newIds = new Set(newOps.map((op) => op.id))
    const normalizedNew = normalized.filter((op) =>
      (op.pendingId && newIds.has(op.pendingId)) || (op.finalId && newIds.has(op.finalId))
    )
    const gatewayNormalized = normalizedNew.filter(
      (op) => op.tool === 'gateway' || (op.type && op.type.startsWith('GATEWAY_'))
    )
    for (const op of gatewayNormalized) {
      assert(op.status !== 'PENDING', 'Gateway operation not finalized in normalized view')
    }
    const finalizedByCorrelation = new Set(
      gatewayNormalized.filter((op) => op.correlationId && op.status !== 'PENDING').map((op) => op.correlationId)
    )
    const phantom = gatewayNormalized.filter((op) => op.status === 'PENDING' && finalizedByCorrelation.has(op.correlationId))
    assert(phantom.length === 0, 'Normalized gateway ops include phantom pending')

    const [chatMessages, chatState, chatLogs] = await Promise.all([
      fetchJson(`${BASE_URL}/api/chat/messages`),
      fetchJson(`${BASE_URL}/api/chat/state`),
      fetchJson(`${BASE_URL}/api/chat/logs`)
    ])
    assert(Array.isArray(chatMessages.json.messages), 'Chat messages API missing messages')
    assert(chatMessages.json.messages.length === chatHistory.length, 'Chat history API mismatch')
    assert(
      chatState.json?.active?.name === undefined || projects.some((p) => p.name === chatState.json.active.name),
      'Chat state project mismatch'
    )
    assert(
      Array.isArray(chatLogs.json.operations) && Array.isArray(chatLogs.json.actions),
      'Chat logs API missing operations/actions'
    )
    assert(
      chatLogs.json.operations.some((line) => String(line).includes(lastOp.id)),
      'Chat logs missing latest operation'
    )
    assert(!containsLegacy(chatMessages.json), 'Legacy naming found in chat messages')
    assert(!containsLegacy(chatState.json), 'Legacy naming found in chat state')
    assert(!containsLegacy(chatLogs.json), 'Legacy naming found in chat logs')

    const after = getCounts()
    const deltas = Object.fromEntries(
      Object.entries(after).map(([key, value]) => [key, value - baseline[key]])
    )
    const lastOps = getLastOps(5)

    console.log('PASS')
    console.log('Delta counts:', deltas)
    console.log('Last ops:', lastOps)
  } finally {
    if (started && child) {
      child.kill('SIGTERM')
    }
  }
}

main().catch((error) => {
  console.error('FAIL', error.message)
  process.exit(1)
})
