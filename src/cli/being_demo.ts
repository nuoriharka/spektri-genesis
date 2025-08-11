/* src/cli/being_demo.ts */
import { humanExistence, trustEngine, Soul } from "../being";

(async () => {
  await humanExistence({ ticks: 10, intervalMs: 120 });

  // TrustEngine demo
  const soulA: Soul = {
    id: "A",
    frequency: () => 432,
    authenticity: () => true,
    transmit: (e) => {},
    receive: () => 0.8,
  };
  const soulB: Soul = {
    id: "B",
    frequency: () => 440,
    authenticity: () => true,
    transmit: (e) => {},
    receive: () => 0.7,
  };
  const resonance = trustEngine(soulA, soulB);
  if (resonance !== null) {
    console.log(`Resonance between ${soulA.id} and ${soulB.id}: ${resonance.toFixed(2)}`);
    if (resonance > 0.5) {
      console.log("create(shared_reality)");
    }
  } else {
    console.log("No resonance: authenticity check failed.");
  }
})();
