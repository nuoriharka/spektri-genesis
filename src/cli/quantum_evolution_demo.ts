import { AdaptiveSoul } from "../being/adaptiveSoul";
import { QuantumRealitySuperposition } from "../quantum/parallelRealities";
import { SoulEvolutionEngine } from "../evolution/soulEvolution";
// import { SoulVisualizer } from "../viz/soulSpace"; // Uncomment if running in browser
// import { trustEngine } from "../being";

// Placeholder trustEngine for CLI demo
declare function trustEngine(a: AdaptiveSoul, b: AdaptiveSoul): number;

// Alustus
const quantumSystem = new QuantumRealitySuperposition();
const evolutionEngine = new SoulEvolutionEngine();
// const viz = new SoulVisualizer(document.getElementById('viz-container')!);

// Luo sieluja
const souls = [
  new AdaptiveSoul("Valo", 350, true),
  new AdaptiveSoul("Varjo", 280, false),
  new AdaptiveSoul("Tasapaino", 440, true)
];

// Lisää sielut kaikkiin todellisuuksiin
souls.forEach(soul => {
  quantumSystem.addSoulToAllRealities(soul);
  // viz.addSoul(soul.id, soul.frequency());
});

// Simuloi vuorovaikutuksia
setInterval(() => {
  const currentReality = quantumSystem.getCurrentReality();
  const randomSoul = souls[Math.floor(Math.random() * souls.length)];
  const otherSoul = souls[Math.floor(Math.random() * souls.length)];
  if (randomSoul !== otherSoul) {
    const resonance = trustEngine(randomSoul, otherSoul);
    if (resonance) {
      // viz.updateConnection(randomSoul.id, otherSoul.id, resonance);
      randomSoul.adaptBasedOnExperience({
        otherSoulId: otherSoul.id,
        resonance,
        energyReceived: resonance * 0.5
      });
      evolutionEngine.evolveSoul(randomSoul, currentReality);
      if (Math.random() < 0.1) {
        const realities = Object.keys((quantumSystem as any)["realities"]);
        const targetReality = realities[Math.floor(Math.random() * realities.length)];
        quantumSystem.quantumTunneling(randomSoul, targetReality);
      }
    }
  }
  if (Math.random() < 0.1) {
    currentReality.collectiveMeditation(3000);
  }
  quantumSystem.realityInterference();
  // viz.setGlobalFrequency(currentReality.globalFrequency);
}, 2000);

// document.getElementById("btn-harmonia")?.addEventListener("click", () => {
//   quantumSystem.switchReality("harmonia");
// });
