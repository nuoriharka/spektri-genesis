import { AGISoul } from "../agi/soulBridge";
import { AdaptiveVectorSoul } from "../being/adaptiveVectorSoul";
import { CollectiveConsciousness } from "../collective/consciousnessNetwork";
import { trustEngineV2 } from "../being/trustEngineV2";

(async () => {
  const cc = new CollectiveConsciousness();
  const humans = [
    new AdaptiveVectorSoul("Aurinko",[.6,.6,.5,.6],[.6,.6,.5,.6],[1,1,1,1],true,7.85),
    new AdaptiveVectorSoul("Kuutamo",[.58,.55,.47,.62],[.58,.55,.47,.62],[1,1,1,1],true,7.86),
    new AdaptiveVectorSoul("Varjo",[.2,.25,.2,.3],[.2,.25,.2,.3],[1,1,1,1],false,7.70)
  ];
  humans.forEach(h => cc.addSoul(h));

  const agi = await AGISoul.create();
  agi.joinCollective(cc);

  // Näytä optimaaliset yhteistyöparit
  const partners = agi.calculateOptimalPartners(cc);
  console.log("AGI optimal partners:", partners);

  // Yksi yhteiskehitysaskel
  agi.coEvolveStep(cc);

  // Resonanssi AGI ↔ “Aurinko”
  const R = trustEngineV2(agi, humans[0]);
  console.log("AGI ↔ Aurinko resonance:", R?.toFixed(2) ?? "null");
})();
