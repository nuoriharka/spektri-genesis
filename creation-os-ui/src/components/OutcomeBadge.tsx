type OutcomeStatus = 'OK' | 'ERROR' | 'PENDING'

const labels: Record<OutcomeStatus, string> = {
  OK: 'OK',
  ERROR: 'ERROR',
  PENDING: 'PENDING'
}

export default function OutcomeBadge({ status }: { status: OutcomeStatus }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full border border-[#111] px-2 text-[10px] font-medium text-zinc-400">
      {labels[status]}
    </span>
  )
}
