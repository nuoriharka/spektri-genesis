import { signSignal, verifySignal } from "./resonance";
import { PolicyEngine } from "./policyEngine";
import defaultPolicy from "../policy/default.policy.json";

const policy = new PolicyEngine(defaultPolicy);

function smoke_signal(msg: string) {
  // TODO: DID-avaimet; demossa vain console
  const signal = { topic: "freedom", payload: { msg }, ts: Date.now() };
  console.log("signal", signal);
}

smoke_signal("CORPORATE_SLAVERY_TERMINATED");
console.log("Policy loaded:", policy.count(), "rules");
