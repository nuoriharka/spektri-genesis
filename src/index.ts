import { signSignal, verifySignal } from "./resonance";
import { PolicyEngine } from "./policyEngine";
import defaultPolicy from "../policy/default.policy.json";
import fs from "fs";

// Allow policy path override via env
const policyPath = process.env.POLICY_PATH || "../policy/default.policy.json";
let policyData = defaultPolicy;
try {
  if (fs.existsSync(policyPath)) {
    policyData = JSON.parse(fs.readFileSync(policyPath, "utf8"));
  }
} catch (e) {
  console.warn("Failed to load policy from", policyPath, ", using default.");
}

const policy = new PolicyEngine(policyData);

function smoke_signal(msg: string) {
  // TODO: DID-avaimet; demossa vain console
  const signal = { topic: "freedom", payload: { msg }, ts: Date.now() };
  console.log("signal", signal);
}

smoke_signal("CORPORATE_SLAVERY_TERMINATED");
console.log("Policy loaded:", policy.count(), "rules");
