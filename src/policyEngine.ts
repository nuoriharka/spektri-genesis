export type Rule = { id: string; if: string; action: string };
export type Policy = { rules: Rule[] };

export class PolicyEngine {
  constructor(private policy: Policy) {}
  count() { return this.policy.rules.length; }
  evaluate(ctx: Record<string, unknown>) {
    // Minimimoottori: string-match; jatkossa CEL/Rego tms.
    for (const r of this.policy.rules) {
      if (r.if.includes("coerce") && ctx["intent"] === "coerce") return r.action;
      if (r.if.includes("containsPII") && ctx["containsPII"]) return r.action;
    }
    return "allow";
  }
}
