export type GameState = {
  resonance: number;
  score: number;
};

let wasmPromise: Promise<WebAssembly.Instance> | null = null;

const loadWasm = async () => {
  if (!wasmPromise) {
    const wasmUrl = new URL('./the_game.wasm', import.meta.url);
    wasmPromise = fetch(wasmUrl)
      .then((res) => res.arrayBuffer())
      .then((bytes) => WebAssembly.instantiate(bytes, {}))
      .then((result) => result.instance);
  }
  return wasmPromise;
};

export const runGameStep = async (
  state: GameState,
  integrityOk: boolean,
  anchoredCount: number
): Promise<GameState> => {
  const wasm = await loadWasm();
  const gameStep = wasm.exports.game_step as (res: number, score: number, integrity: number, anchored: number) => bigint;
  const packed = gameStep(state.resonance, state.score, integrityOk ? 1 : 0, anchoredCount);
  const resonance = Number(packed & BigInt(0xffffffff));
  const score = Number((packed >> BigInt(32)) & BigInt(0xffffffff));
  return { resonance, score };
};
