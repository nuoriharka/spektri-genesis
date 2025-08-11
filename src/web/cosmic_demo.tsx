// SELAINVERSIO
import { useEffect, useRef } from 'react';
import { SoulVisualizer } from "../viz/soulSpace";
import { QuantumRealitySuperposition } from "../quantum/parallelRealities";
import { AdaptiveSoul } from "../being/adaptiveSoul";

export const CosmicDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const viz = new SoulVisualizer(containerRef.current);
      const quantumSystem = new QuantumRealitySuperposition();
      
      const souls = [
        new AdaptiveSoul("Valo", 350, true),
        new AdaptiveSoul("Varjo", 280, false),
        new AdaptiveSoul("Tasapaino", 440, true)
      ];
      
      souls.forEach(soul => {
        quantumSystem.addSoulToAllRealities(soul);
        viz.addSoul(soul.id, soul.frequency());
      });
      // Aloita animaatio
      viz.animate();
    }
  }, []);
  
  return <div ref={containerRef} className="soul-viz-container" />;
};
export default CosmicDemo;
