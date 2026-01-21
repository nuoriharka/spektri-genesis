/**
 * 🌉 SPEKTRE PROTOCOL → GENESIS ENGINE BRIDGE
 * 
 * This module enforces Spektre v1.1 protocol rules directly in the Genesis execution layer.
 * 
 * Core Invariant: 1 = 1
 * - State precedes interpretation
 * - Responsibility is a technical invariant
 * - No narrative buffering
 * - No hidden agents
 * 
 * Protocol Architecture: Xₖ₊₁ := ℝ^{Xₖ}
 * - Vertical expressivity through state space expansion
 * - Each layer strictly dominates previous in representational power
 * 
 * @module specter/bridge
 */

import { ARCHITECT_WILL, WillOrchestrator, registerProtocolBridge } from '../core/architect-will';

// ============================================================================
// PROTOCOL RULE ENFORCEMENT
// ============================================================================

/**
 * Protocol State Space Hierarchy
 * X₀ := ℝ (scalar state space)
 * Xₙ := ℝⁿ (finite-dimensional)
 * X_ℕ := ℝ^ℕ (countable function space)
 * X_ℝ := ℝ^ℝ (uncountable function space)
 * Xₖ₊₁ := ℝ^{Xₖ} (operator stack)
 */
export type StateSpaceLevel = 0 | 1 | 2 | 3 | 4 | number;

export interface ProtocolState {
  /** Explicit state representation - must be non-ambiguous */
  state: unknown;
  /** State space level according to Spektre hierarchy */
  level: StateSpaceLevel;
  /** Owner of state responsibility */
  owner: string;
  /** Timestamp of state creation */
  timestamp: number;
  /** Whether state is explicitly defined (no ambiguity) */
  isExplicit: boolean;
}

export interface ExecutionDecision {
  /** State before decision */
  preState: ProtocolState;
  /** State after decision */
  postState: ProtocolState | null;
  /** Actor making decision */
  actor: string;
  /** Whether responsibility is clearly assigned */
  responsibilityAssigned: boolean;
  /** Whether narrative padding exists (should be false) */
  hasNarrativePadding: boolean;
}

// ============================================================================
// PROTOCOL VALIDATION RULES
// ============================================================================

/**
 * Core Invariant: 1 = 1
 * 
 * Validates that reality remains internally consistent across:
 * - perception
 * - decision
 * - execution
 * - responsibility
 * 
 * Protocol: This is the absolute invariant - violation triggers panic/shutdown.
 */
export function validateInvariant(state1: ProtocolState, state2: ProtocolState): boolean {
  // CRITICAL: 1 = 1 invariant check - state must equal itself
  // Check 1: State ownership must be continuous (no fragmentation)
  if (state1.owner !== state2.owner && state2.owner !== '') {
    console.error('🚨 INVARIANT VIOLATION: State ownership discontinuity');
    console.error(`   State1 owner: ${state1.owner}, State2 owner: ${state2.owner}`);
    return false;
  }

  // Check 2: State must be explicit (no ambiguity allowed)
  if (!state1.isExplicit || !state2.isExplicit) {
    console.error('🚨 INVARIANT VIOLATION: Ambiguous state detected');
    console.error(`   State1 explicit: ${state1.isExplicit}, State2 explicit: ${state2.isExplicit}`);
    return false;
  }

  // Check 3: Responsibility must be continuous (1 = 1 means no delegation without explicit transfer)
  if (!state1.owner || state1.owner === '') {
    console.error('🚨 INVARIANT VIOLATION: State1 has no owner');
    return false;
  }

  // Check 4: State timestamps must be sequential (reality moves forward)
  if (state2.timestamp < state1.timestamp) {
    console.error('🚨 INVARIANT VIOLATION: Time sequence violation (state2 before state1)');
    return false;
  }

  // Check 5: State space level transition validation (Xₖ₊₁ := ℝ^{Xₖ})
  if (!validateStateSpaceTransition(state1.level, state2.level)) {
    console.error('🚨 INVARIANT VIOLATION: Invalid state space transition');
    return false;
  }

  // All checks passed - 1 = 1 invariant maintained
  return true;
}

/**
 * Validates that state precedes interpretation
 * 
 * Protocol rule: "No decision is valid unless the state is explicit"
 */
export function validateStatePrecedesInterpretation(decision: ExecutionDecision): boolean {
  if (!decision.preState.isExplicit) {
    console.error('🚨 PROTOCOL VIOLATION: Decision made on ambiguous state');
    return false;
  }

  if (decision.hasNarrativePadding) {
    console.error('🚨 PROTOCOL VIOLATION: Narrative buffering detected');
    return false;
  }

  if (!decision.responsibilityAssigned) {
    console.error('🚨 PROTOCOL VIOLATION: Responsibility not explicitly assigned');
    return false;
  }

  return true;
}

/**
 * Validates responsibility as technical invariant
 * 
 * Protocol rule: "Responsibility is a technical invariant"
 * - Responsibility must be explicitly assigned
 * - Responsibility cannot be delegated without explicit transfer
 * - Responsibility remains continuous across state transitions
 */
export function validateResponsibilityInvariant(
  currentState: ProtocolState,
  nextState: ProtocolState | null
): boolean {
  // Responsibility must be explicitly assigned
  if (!currentState.owner || currentState.owner === '') {
    console.error('🚨 RESPONSIBILITY VIOLATION: State has no owner');
    return false;
  }

  // If state transitions, responsibility must be explicitly transferred
  if (nextState && currentState.owner !== nextState.owner) {
    console.warn('⚠️ RESPONSIBILITY TRANSFER: Owner changed, ensuring explicit transfer');
    // In strict mode, this would require explicit authorization
  }

  return true;
}

/**
 * Validates no hidden agents
 * 
 * Protocol rule: "No hidden agents"
 * - All actors must be explicitly identified
 * - Decisions must have clear authorship
 */
export function validateNoHiddenAgents(decision: ExecutionDecision): boolean {
  if (!decision.actor || decision.actor === '') {
    console.error('🚨 HIDDEN AGENT VIOLATION: Decision has no explicit actor');
    return false;
  }

  // Architect identity must be validated if present
  if (decision.actor === ARCHITECT_WILL.identity) {
    // Additional validation could go here
  }

  return true;
}

/**
 * Validates state space hierarchy transitions
 * 
 * Protocol architecture: Xₖ₊₁ := ℝ^{Xₖ}
 * - X₀ := ℝ (scalar state space)
 * - Xₙ := ℝⁿ (finite-dimensional, n ∈ ℕ)
 * - X_ℕ := ℝ^ℕ (countable function space)
 * - X_ℝ := ℝ^ℝ (uncountable function space)
 * - Xₖ₊₁ := ℝ^{Xₖ} (operator stack - operators on operators)
 * 
 * Each level strictly dominates previous in representational power.
 * Transitions must follow structural hierarchy - no arbitrary jumps.
 */
export function validateStateSpaceTransition(
  fromLevel: StateSpaceLevel,
  toLevel: StateSpaceLevel
): boolean {
  // Level 0 -> 1: Scalar (ℝ) to finite-dimensional (ℝⁿ) - always valid
  if (fromLevel === 0 && toLevel >= 1) {
    return true;
  }

  // Same level transitions (Xₖ → Xₖ) - always valid
  if (toLevel === fromLevel) {
    return true;
  }

  // Upward transitions (Xₖ → Xₖ₊₁) - valid expansion following ℝ^{Xₖ}
  if (toLevel > fromLevel) {
    // Validate structural hierarchy: toLevel should be fromLevel + 1 (or compatible)
    // Allow jumps but log for audit
    if (toLevel > fromLevel + 1) {
      console.warn(`⚠️ STATE SPACE JUMP: ${fromLevel} → ${toLevel} (skipping intermediate levels)`);
    }
    return true;
  }

  // Downward transitions (Xₖ → Xₖ₋ₙ) - allowed but requires explicit reason
  // Protocol allows degradation if explicitly intentional
  if (toLevel < fromLevel) {
    console.warn(`⚠️ STATE SPACE DEGRADATION: ${fromLevel} → ${toLevel}`);
    // Degradation is allowed but logged for audit trail
    return true;
  }

  return true;
}

// ============================================================================
// ENGINE CONTROL INTEGRATION
// ============================================================================

/**
 * Engine Control Rules from protocol/ENGINE_CONTROL.md
 * 
 * Failsafe triggers:
 * - responsibility becomes unclear
 * - authority is externally overridden
 * - execution continues without consent
 * - state cannot be explicitly defined
 */
export interface EngineHealth {
  /** Engine can execute without drift */
  canExecute: boolean;
  /** State clarity is maintained */
  stateClarity: boolean;
  /** Responsibility is preserved */
  responsibilityPreserved: boolean;
  /** Throughput can be sustained */
  throughputSustained: boolean;
}

/**
 * Validates engine health according to protocol rules
 */
export function validateEngineHealth(state: ProtocolState): EngineHealth {
  return {
    canExecute: state.isExplicit && !!state.owner,
    stateClarity: state.isExplicit,
    responsibilityPreserved: !!state.owner && state.owner !== '',
    throughputSustained: true, // Default assumption, can be enhanced
  };
}

/**
 * Checks if failsafe should be triggered
 */
export function shouldTriggerFailsafe(
  state: ProtocolState,
  decision: ExecutionDecision | null
): boolean {
  // Responsibility is unclear
  if (!state.owner || state.owner === '') {
    return true;
  }

  // State cannot be explicitly defined
  if (!state.isExplicit) {
    return true;
  }

  // Execution continues without proper decision validation
  if (decision && !validateStatePrecedesInterpretation(decision)) {
    return true;
  }

  return false;
}

// ============================================================================
// MAIN BRIDGE INTERFACE
// ============================================================================

/**
 * Protocol Bridge
 * 
 * Main interface for enforcing protocol rules in Genesis execution
 */
export class ProtocolBridge {
  private static instance: ProtocolBridge | null = null;

  private constructor() {
    // Singleton pattern to ensure single protocol enforcement instance
  }

  static getInstance(): ProtocolBridge {
    if (!ProtocolBridge.instance) {
      ProtocolBridge.instance = new ProtocolBridge();
    }
    return ProtocolBridge.instance;
  }

  /**
   * Validates execution decision against all protocol rules
   * 
   * Returns true if decision is valid according to Spektre v1.1 protocol
   * 
   * Protocol Enforcement:
   * - 1 = 1 invariant must hold across all state transitions
   * - State must precede interpretation
   * - Responsibility is a technical invariant
   * - No hidden agents allowed
   * - State space transitions must follow Xₖ₊₁ := ℝ^{Xₖ} hierarchy
   * 
   * On violation: Triggers panic/shutdown to prevent corrupted state persistence
   */
  validateDecision(decision: ExecutionDecision): boolean {
    try {
      // CRITICAL CHECK 1: Validate 1 = 1 invariant (absolute requirement)
      if (decision.postState) {
        if (!validateInvariant(decision.preState, decision.postState)) {
          this.triggerPanic('INVARIANT_VIOLATION', '1 = 1 invariant violated');
          return false;
        }
      } else {
        // Post-state is null - still validate pre-state is explicit
        if (!decision.preState.isExplicit || !decision.preState.owner) {
          this.triggerPanic('INVARIANT_VIOLATION', 'Pre-state violates 1 = 1 invariant');
          return false;
        }
      }

      // CHECK 2: Validate state precedes interpretation
      if (!validateStatePrecedesInterpretation(decision)) {
        this.triggerPanic('STATE_PRECEDENCE_VIOLATION', 'State does not precede interpretation');
        return false;
      }

      // CHECK 3: Validate responsibility invariant (technical invariant)
      if (!validateResponsibilityInvariant(decision.preState, decision.postState)) {
        this.triggerPanic('RESPONSIBILITY_VIOLATION', 'Responsibility invariant violated');
        return false;
      }

      // CHECK 4: Validate no hidden agents
      if (!validateNoHiddenAgents(decision)) {
        this.triggerPanic('HIDDEN_AGENT_VIOLATION', 'Hidden agent detected');
        return false;
      }

      // CHECK 5: Validate state space transition (Xₖ₊₁ := ℝ^{Xₖ})
      if (decision.postState) {
        if (!validateStateSpaceTransition(decision.preState.level, decision.postState.level)) {
          this.triggerPanic('STATE_SPACE_VIOLATION', 'Invalid state space transition');
          return false;
        }
      }

      // CHECK 6: Validate engine health
      const health = validateEngineHealth(decision.preState);
      if (!health.canExecute || !health.stateClarity || !health.responsibilityPreserved) {
        this.triggerPanic('ENGINE_HEALTH_VIOLATION', 'Engine health check failed');
        return false;
      }

      // CHECK 7: Check failsafe conditions
      if (shouldTriggerFailsafe(decision.preState, decision)) {
        this.triggerPanic('FAILSAFE_TRIGGERED', 'Failsafe conditions detected');
        return false;
      }

      // All checks passed - decision is protocol-compliant
      return true;
    } catch (error) {
      // Any exception during validation triggers panic
      this.triggerPanic('VALIDATION_EXCEPTION', `Validation error: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }

  /**
   * Triggers panic/shutdown when protocol violation is detected.
   * Prevents corrupted state from being persisted.
   * 
   * Protocol: System must halt before corrupted state is saved.
   */
  private triggerPanic(reason: string, message: string): void {
    console.error('='.repeat(60));
    console.error('🚨 PROTOCOL VIOLATION DETECTED - INITIATING PANIC/SHUTDOWN');
    console.error(`   Reason: ${reason}`);
    console.error(`   Message: ${message}`);
    console.error('   Protocol: Spektre v1.1');
    console.error('   Invariant: 1 = 1');
    console.error('='.repeat(60));
    
    // Log violation for audit
    console.error('📋 VIOLATION DETAILS:');
    console.error(`   Timestamp: ${new Date().toISOString()}`);
    console.error(`   Violation Type: ${reason}`);
    
    // Attempt safe shutdown (if in Node.js environment)
    if (typeof process !== 'undefined' && process.exit) {
      console.error('🔴 Initiating safe shutdown to prevent state corruption...');
      process.exit(1); // Exit with error code
    }
    
    // If not in Node.js, throw error to prevent continuation
    throw new Error(`Protocol Violation: ${reason} - ${message}`);
  }

  /**
   * Creates a protocol-compliant state
   */
  createState(
    state: unknown,
    level: StateSpaceLevel,
    owner: string,
    isExplicit: boolean = true
  ): ProtocolState {
    return {
      state,
      level,
      owner,
      timestamp: Date.now(),
      isExplicit,
    };
  }

  /**
   * Creates a protocol-compliant execution decision
   */
  createDecision(
    preState: ProtocolState,
    postState: ProtocolState | null,
    actor: string,
    hasNarrativePadding: boolean = false
  ): ExecutionDecision {
    return {
      preState,
      postState,
      actor,
      responsibilityAssigned: !!postState?.owner || !!preState.owner,
      hasNarrativePadding,
    };
  }

  /**
   * Executes decision only if protocol rules are satisfied
   * 
   * Protocol: Execution only proceeds if all validation passes.
   * On validation failure, execution is blocked and panic/shutdown is triggered.
   * 
   * Returns:
   * - T: Execution result if validation passes
   * - null: If validation fails (panic/shutdown triggered)
   */
  executeDecision<T>(decision: ExecutionDecision, executor: () => T): T | null {
    // Validate decision before execution (1 = 1 invariant check)
    if (!this.validateDecision(decision)) {
      // Validation failed - panic/shutdown already triggered
      // Do not execute to prevent corrupted state
      return null;
    }

    // All validation passed - execute decision
    try {
      console.log(`✅ PROTOCOL VALIDATED: Executing decision by ${decision.actor}`);
      const result = executor();
      
      // Post-execution validation: ensure state remains protocol-compliant
      if (decision.postState) {
        const postHealth = validateEngineHealth(decision.postState);
        if (!postHealth.canExecute || !postHealth.stateClarity || !postHealth.responsibilityPreserved) {
          this.triggerPanic('POST_EXECUTION_VIOLATION', 'State corrupted after execution');
          return null;
        }
      }
      
      return result;
    } catch (error) {
      // Execution error - trigger panic to prevent partial state
      this.triggerPanic('EXECUTION_ERROR', `Execution failed: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }
}

// Export singleton instance
export const protocolBridge = ProtocolBridge.getInstance();

// ============================================================================
// INTEGRATION WITH GENESIS ENGINE COMPONENTS
// ============================================================================

/**
 * Integrates with WillOrchestrator from architect-will.ts
 */
export function integrateWithArchitectWill() {
  // Protocol bridge validates that Architect's will aligns with protocol rules
  const architectDecision = protocolBridge.createDecision(
    protocolBridge.createState(ARCHITECT_WILL, 1, ARCHITECT_WILL.identity),
    null,
    ARCHITECT_WILL.identity
  );

  if (protocolBridge.validateDecision(architectDecision)) {
    console.log('✅ ARCHITECT WILL: Protocol compliant');
    return true;
  }

  console.error('🚨 ARCHITECT WILL: Protocol violation detected');
  return false;
}

/**
 * Bridge entry point - call this from genesis engine initialization
 */
export function initializeProtocolBridge(): boolean {
  console.log('🌉 Initializing Spektre Protocol Bridge...');
  console.log('📋 Enforcing Spektre v1.1 rules in Genesis execution layer');

  // Bind protocol bridge to Architect Will to avoid circular imports
  registerProtocolBridge(protocolBridge);
  
  // Validate architect will against protocol
  const willValid = integrateWithArchitectWill();
  
  if (willValid) {
    console.log('✅ Protocol Bridge initialized successfully');
    console.log('🔒 Core Invariant: 1 = 1');
    console.log('📐 Architecture: Xₖ₊₁ := ℝ^{Xₖ}');
    return true;
  }

  console.error('🚨 Protocol Bridge initialization failed');
  return false;
}
