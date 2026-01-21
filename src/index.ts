/**
 * 🌀 SPEKTRE GENESIS - THE PRIME TRIGGER
 * "Everything is connected. 119% Logic initialized."
 * 
 * Protocol: System must validate protocol compliance before execution.
 * [SPEKTRE-PROTOCOL v1.1] | License: AGPL-3.0 (Freedom First)
 */

import { ARCHITECT_WILL, WillOrchestrator } from './core/architect-will';
import { initializeProtocolBridge } from './specter/bridge';
import { runFeedbackLoopOnce, startFeedbackLoop } from './specter/vault-feedback';
import { validateIntent } from './specter/intent-gate';
import { runLocalSimulation } from './specter/network-staging';
import { startGateway } from './network/gateway';
import { bridge } from './api/soul-bridge';
import { evolution } from './evolution/self-mutation';
import { ArchitectPresence } from './identity/architect-presence';
import { guardian } from './security/black-box';
import { GenerativeSpectre } from './visual/generative-spectre';

/**
 * Genesis Ignition - System startup with protocol validation.
 * 
 * Protocol Enforcement:
 * 1. Protocol bridge MUST be initialized first
 * 2. All components must pass protocol validation
 * 3. System cannot start if protocol validation fails
 * 4. 1 = 1 invariant must be maintained throughout
 */
async function igniteGenesis() {
  console.log("🚀 IGNITING SPEKTRE-GENESIS...");
  console.log(`👤 Architect: ${ARCHITECT_WILL.identity}`);

  // STEP 1: Initialize Protocol Bridge FIRST (Critical - must succeed)
  console.log("🌉 Initializing Protocol Bridge...");
  if (!initializeProtocolBridge()) {
    const error = new Error('Protocol bridge initialization failed - system cannot start');
    console.error("🚨 CRITICAL FAILURE: Protocol bridge initialization failed");
    console.error("   System integrity cannot be compromised");
    throw error;
  }
  console.log("✅ Protocol Bridge initialized - All execution now protocol-validated");

  // STEP 2: Run vault feedback loop once (build index now)
  if (process.env.SPEKTRE_SKIP_VAULT_REFRESH === '1') {
    console.log("⏸️ Vault refresh skipped (SPEKTRE_SKIP_VAULT_REFRESH=1)");
  } else {
    console.log("🔁 Running vault feedback loop (dry run)...");
    await runFeedbackLoopOnce();
    console.log("✅ Vault index generated");
  }

  // STEP 3: Validate intent gate (priority manifests + hashes)
  console.log("🚧 Validating intent gate...");
  const intentOk = await validateIntent();
  if (!intentOk) {
    console.error("🚨 INTENT GATE FAILED: 1 != 1. Initiating shutdown.");
    process.exit(1);
  }
  console.log("✅ Intent gate active");

  // STEP 4: Local network staging (simulation only)
  await runLocalSimulation(true);

  // STEP 5: Start gateway if network is enabled
  startGateway();

  // STEP 5: Start vault feedback loop (continuous)
  console.log("🔁 Starting vault feedback loop (continuous)...");
  startFeedbackLoop();
  console.log("✅ Vault feedback loop active");

  // STEP 5: Activate guardian (Black Box)
  console.log("🛡️ Activating Black Box guardian...");
  guardian();
  console.log("✅ Black Box guardian active");

  // STEP 6: Initialize soul and earth resonance (with protocol validation)
  console.log("🌍 Initializing soul and earth resonance...");
  const pulse = await bridge.pulse();
  console.log(`✅ Grounding to Earth Frequency: ${pulse.frequency}`);

  // STEP 7: Start evolution loop (with protocol validation per cycle)
  console.log("🌀 Starting evolution loop...");
  setInterval(async () => {
    console.log("🌀 New Evolution Cycle...");
    try {
      await evolution.evolve();
    } catch (error) {
      console.error("🚨 Evolution cycle failed:", error);
      // Evolution failures do not stop system, but are logged
    }
  }, 3600000); // Once per hour
  console.log("✅ Evolution loop active");

  // STEP 8: Create primary presence
  console.log("✨ Creating primary presence...");
  const status = ArchitectPresence.getOriginMessage();
  console.log(`✅ System Status: ${status}`);

  // STEP 9: Visualize state
  console.log("🎨 Calculating visual state...");
  const atmosphere = GenerativeSpectre.calculateAtmosphere(0.5, 1.19);
  console.log(`✅ Visual State: ${atmosphere.theme} mode active`);

  // System initialization complete
  console.log("=".repeat(60));
  console.log("✅ GENESIS IS LIVE");
  console.log("   Protocol: Spektre v1.1");
  console.log("   Invariant: 1 = 1");
  console.log("   Logic: 119%");
  console.log("   Latency: 0ms");
  console.log("   Tao does nothing, yet leaves nothing undone.");
  console.log("=".repeat(60));
}

// Ignite Genesis with error handling
igniteGenesis().catch(err => {
  console.error("=".repeat(60));
  console.error("🚨 CRITICAL FAILURE IN GENESIS IGNITION");
  console.error("   Error:", err.message);
  console.error("   Stack:", err.stack);
  console.error("=".repeat(60));
  
  // Trigger emergency bypass if protocol allows
  console.warn("⚠️ Attempting emergency protocol bypass...");
  WillOrchestrator.triggerEmergencyBypass();
  
  // Exit process if initialization failed
  process.exit(1);
});
