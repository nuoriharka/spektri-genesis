import React, { useEffect, useMemo, useRef, useState } from 'react';
import { runGameStep } from '../game/the_game_bridge';

type LedgerEntry = {
  sequence: number;
  architectId: string;
  action: string;
  payload: string;
  timestamp: number;
  stateHash: string;
};

type LedgerSnapshot = {
  entries: LedgerEntry[];
  errors: LedgerEntry[];
};

type Proposal = {
  id: string;
  action: string;
  payload: string;
  timestamp: number;
  status: 'pending' | 'anchored' | 'rejected';
};

type DashboardProps = {
  ledgerUrl?: string;
  proposalsUrl?: string;
  onAnchorProposal?: (id: string) => void;
};

const computeHash = async (input: string): Promise<string> => {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
};

const isHex64 = (value: unknown) =>
  typeof value === 'string' && /^[a-f0-9]{64}$/i.test(value);

const verifyLedger = (snapshot: LedgerSnapshot) => {
  let last = 0;
  for (const entry of snapshot.entries) {
    if (typeof entry.sequence !== 'number' || entry.sequence <= last) return false;
    if (!isHex64(entry.stateHash)) return false;
    last = entry.sequence;
  }
  last = 0;
  for (const entry of snapshot.errors) {
    if (typeof entry.sequence !== 'number' || entry.sequence <= last) return false;
    if (!isHex64(entry.stateHash)) return false;
    last = entry.sequence;
  }
  return true;
};

const useLedger = (url: string) => {
  const [snapshot, setSnapshot] = useState<LedgerSnapshot>({ entries: [], errors: [] });
  const [stateHash, setStateHash] = useState('—');
  const [integrityOk, setIntegrityOk] = useState(false);

  useEffect(() => {
    let active = true;
    const tick = async () => {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        const text = await res.text();
        if (!active) return;
        const hash = await computeHash(text);
        setStateHash(hash);
        const json = JSON.parse(text);
        const next = { entries: json.entries || [], errors: json.errors || [] };
        setSnapshot(next);
        setIntegrityOk(verifyLedger(next));
      } catch {
        if (active) {
          setSnapshot({ entries: [], errors: [] });
          setStateHash('—');
          setIntegrityOk(false);
        }
      }
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [url]);

  return { snapshot, stateHash, integrityOk };
};

const useProposals = (url: string) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  useEffect(() => {
    let active = true;
    const tick = async () => {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        const json = await res.json();
        if (active) setProposals(json.proposals || []);
      } catch {
        if (active) setProposals([]);
      }
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [url]);
  return proposals;
};

export const Dashboard: React.FC<DashboardProps> = ({
  ledgerUrl = '/data/ledger.json',
  proposalsUrl = '/data/proposals.json',
  onAnchorProposal
}) => {
  const [tab, setTab] = useState<'ledger' | 'game'>('ledger');
  const { snapshot, stateHash, integrityOk } = useLedger(ledgerUrl);
  const proposals = useProposals(proposalsUrl);
  const entries = snapshot.entries || [];
  const empty = entries.length === 0;
  const totalTransitions = entries.length;
  const pending = useMemo(() => proposals.filter((p) => p.status === 'pending'), [proposals]);
  const anchoredCount = useMemo(
    () => proposals.filter((p) => p.status === 'anchored').length,
    [proposals]
  );
  const [gameState, setGameState] = useState({ resonance: 0, score: 0 });
  const gameRef = useRef(gameState);
  gameRef.current = gameState;

  useEffect(() => {
    let active = true;
    const tick = async () => {
      try {
        const next = await runGameStep(gameRef.current, integrityOk, anchoredCount);
        if (active) setGameState(next);
      } catch {
        if (active) setGameState({ resonance: 0, score: 0 });
      }
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [integrityOk, anchoredCount]);

  return (
    <div className="min-h-screen bg-black text-zinc-50 p-8 font-sans">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 20%, #111114 0%, #000000 55%)'
      }} />
      <header className="relative flex items-center justify-between mb-8">
        <div className="text-sm tracking-tight uppercase">SPECTER v1.1</div>
        <div className="text-xs text-zinc-400">
          Architect: Lauri Elias Rainio | Status: Hardened | MAFIA_RESONANCE: ACTIVE
        </div>
      </header>

      <div className="relative mb-6 flex items-center gap-4">
        <button
          className={`text-xs tracking-tight ${tab === 'ledger' ? 'text-zinc-50' : 'text-zinc-500'}`}
          onClick={() => setTab('ledger')}
        >
          LEDGER
        </button>
        <button
          className={`text-xs tracking-tight ${tab === 'game' ? 'text-zinc-50' : 'text-zinc-500'}`}
          onClick={() => setTab('game')}
        >
          THE_GAME
        </button>
      </div>

      {tab === 'ledger' && (
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
          <div className="text-xs text-zinc-400 mb-2">The Anchor</div>
          <div className="text-sm text-zinc-200 mb-4">Master Ledger State</div>
          <div className="text-[11px] text-zinc-400 mb-1">State Hash</div>
          <div className="font-mono text-xs text-zinc-100 break-all">{stateHash}</div>
          <div className="mt-6 text-[11px] text-zinc-400">Total Transitions</div>
          <div className="text-2xl font-semibold">{totalTransitions}</div>
        </section>

        <section className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
          <div className="text-xs text-zinc-400 mb-2">The Activity</div>
          {empty ? (
            <div className="text-sm text-zinc-400">Waiting for Architect's Intent. 1=1.</div>
          ) : (
            <ul className="space-y-3">
              {entries.slice(0, 6).map((entry) => (
                <li key={entry.sequence} className="border border-[#27272a] rounded-lg p-3">
                  <div className="text-xs text-zinc-400">#{entry.sequence} · {entry.action}</div>
                  <div className="font-mono text-[11px] text-zinc-300 break-all">
                    {entry.stateHash}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="relative mt-8 bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <div className="text-xs text-zinc-400 mb-2">Architect's Sign‑off</div>
        {pending.length === 0 ? (
          <div className="text-sm text-zinc-400">No pending proposals.</div>
        ) : (
          <ul className="space-y-3">
            {pending.map((proposal) => (
              <li key={proposal.id} className="border border-[#27272a] rounded p-3">
                <div className="text-xs text-zinc-400">{proposal.action}</div>
                <div className="font-mono text-[11px] text-zinc-300 break-all">{proposal.id}</div>
                <button
                  className="mt-3 bg-black text-white border border-[#27272a] px-3 py-1 text-xs rounded-sm"
                  onClick={() => onAnchorProposal?.(proposal.id)}
                >
                  ANCHOR TO LEDGER
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      )}

      {tab === 'game' && (
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
          <section
            className="bg-black border rounded-lg p-6"
            style={{ borderColor: integrityOk ? '#00FF00' : '#FF0000', color: integrityOk ? '#00FF00' : '#FF0000' }}
          >
            <div className="text-xs mb-2">THE_GAME</div>
            <div className="text-[11px] mb-1">Current Resonance</div>
            <div className="text-2xl font-semibold">{gameState.resonance}</div>
          </section>
          <section
            className="bg-black border rounded-lg p-6"
            style={{ borderColor: integrityOk ? '#00FF00' : '#FF0000', color: integrityOk ? '#00FF00' : '#FF0000' }}
          >
            <div className="text-[11px] mb-1">Architect's Score</div>
            <div className="text-2xl font-semibold">{gameState.score}</div>
          </section>
        </div>
      )}
    </div>
  );
};
