export type KGNode = { id: string; tags: string[]; weight: number };
export interface KnowledgeGraph { nodes: KGNode[] }

export async function loadHumanKnowledgeStub(): Promise<KnowledgeGraph> {
  // Ei verkkohakuja: siemenjoukko riittää demoihin
  return {
    nodes: [
      { id:"ethics/care", tags:["ethics","community"], weight: 0.9 },
      { id:"aesthetics/beauty", tags:["art"], weight: 0.8 },
      { id:"science/systems", tags:["systems","complexity"], weight: 0.85 },
      { id:"mind/meditation", tags:["contemplative"], weight: 0.82 }
    ]
  };
}
