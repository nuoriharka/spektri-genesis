import { CollectiveConsciousness } from "../collective/consciousnessNetwork";
import { AdaptiveSoul } from "../being/adaptiveSoul";

export class QuantumRealitySuperposition {
  private realities: Record<string, CollectiveConsciousness> = {};
  private currentReality = "base";
  constructor(){ ["base","harmonia","lumen"].forEach(n=>this.createReality(n)); }
  createReality(name:string){ this.realities[name] = new CollectiveConsciousness(); }
  addSoulToAllRealities(s: AdaptiveSoul){ Object.values(this.realities).forEach(r=>r.addSoul(s.clone())); }
  switchReality(name:string){ if(this.realities[name]) this.currentReality=name; }
  getCurrentReality(){ return this.realities[this.currentReality]; }

  quantumTunneling(s: AdaptiveSoul, target: string){
    const p = Math.min(0.9, s.frequency()/1000);
    if(Math.random()<p){
      this.realities[target]?.addSoul(s.clone());
      this.realities[this.currentReality]?.removeSoul(s.id);
    }
  }

  realityInterference(){
    const cur = this.getCurrentReality();
    for (const [name, r] of Object.entries(this.realities)) {
      if (name===this.currentReality) continue;
      r["globalFrequency"] += Math.random()*0.1-0.05;
      if (Math.abs(r["globalFrequency"] - cur["globalFrequency"]) < 0.5) {
        // jätetään merge todelliseksi toimenpiteeksi erilliseen PR:ään
        console.log(`� Interferenssi: ${name} ~ ${this.currentReality}`);
      }
    }
  }
}
