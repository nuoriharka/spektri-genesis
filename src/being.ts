/* src/being.ts
   Spektri: Code of Being — practical micro-loops
   No external deps. Pure functions + tiny async loop for demo.
*/

export type Energy = number; // 0..1
export type Hertz = number;  // frequency marker

export interface Soul {
  id: string;
  frequency(): Hertz;
  authenticity(): boolean; // truthful presence
  transmit(energy: Energy): void;
  receive(): Energy;
}

export interface HumanOptions {
  ticks?: number;           // how many iterations to run (demo)
  intervalMs?: number;      // delay between ticks (demo)
  log?: (msg: string) => void;
}

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const rand = (a=0, b=1) => a + Math.random()*(b-a);

// ----- Stabilizers ---------------------------------------------------------

export function gratitude(): Energy {
  // “precision, not denial” — bias perception toward real gifts.
  const observed = 0.4 + rand(0, 0.6);  // simulated scan
  return clamp01(observed);
}

export function boundaries(): boolean {
  // Love with edges. Say no to overcommitment.
  return true;
}

export function shadowWork(): number {
  // Notice disproportionate reactions; reassign exiled parts to advisor role.
  return rand(0.2, 0.7); // how much integration happened
}

export function play(): boolean {
  // Unstructure 45 minutes; follow curiosity; laugh ≥ 1
  return true;
}

export function rest(): boolean {
  // Protect sleep & morning light; gentle movement.
  return true;
}

export function resilience(energy: () => number, askHelp: () => void): "bounce" | "reduce" {
  if (energy() < 0.25) { askHelp(); return "reduce"; }
  return "bounce";
}

export function meaningLoop(log: (s:string)=>void): void {
  // tiny loop that outlives moods
  log("create(beauty) → serve(someone_nearby) → log(one_small_honest_thing)");
}

// ----- Trust Engine --------------------------------------------------------

export function trustEngine(you: Soul, other: Soul): Energy | null {
  if (you.authenticity() && other.authenticity()) {
    const f1 = you.frequency(), f2 = other.frequency();
    const diff = Math.abs(f1 - f2);
    const resonance = clamp01(1 - diff / Math.max(f1, f2, 1));
    if (resonance > 0.3) return resonance;
  }
  return null;
}

// ----- Debugger ------------------------------------------------------------

export function debugState(): string {
  const checklist: [string, boolean][] = [
    ["hydration", true],
    ["breath", true],
    ["name_feeling", true],
    ["one_small_honest_thing", true],
    ["ask_for_help", Math.random() > 0.1], // sometimes we forget to ask
  ];
  for (const [name, ok] of checklist) if (!ok) return `fix: ${name}`;
  return "proceed";
}

// ----- Main loop (demo) ----------------------------------------------------

export async function humanExistence(opts: HumanOptions = {}): Promise<void> {
  const ticks = opts.ticks ?? 10;
  const interval = opts.intervalMs ?? 250;
  const log = opts.log ?? ((s) => console.log(s));

  let alive = true;
  let t = 0;

  const energy = () => clamp01(0.5 + Math.sin(t/3) * 0.25 + rand(-0.05, 0.05));
  const askHelp = () => log("→ ask_help()");

  while (alive && t < ticks) {
    // core loops
    log(`tick ${t}: breathe() • connect() • feel()`);

    // transform pain (simulated)
    if (Math.random() < 0.25) log("process_pain().transform_to_wisdom()");

    // stabilizers & propulsion
    boundaries();
    const g = gratitude();
    const sw = shadowWork();
    play(); rest();
    const mode = resilience(energy, askHelp);

    // contemplation + meaning loop
    log(`gratitude=${g.toFixed(2)} shadow=${sw.toFixed(2)} mode=${mode}`);
    meaningLoop(log);

    // eternal optimizations (symbolic)
    log("reduce(ego); increase(compassion); balance(light,dark)");

    // debug
    const dbg = debugState();
    if (dbg !== "proceed") log(dbg);

    await new Promise(r => setTimeout(r, interval));
    t += 1;
    alive = t < ticks;
  }

  log("return_to_stardust()");
}
