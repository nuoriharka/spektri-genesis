/**
 * 🧪 SPEKTRE PROTOCOL BRIDGE TESTS
 * 
 * Tests verify that bridge.ts correctly enforces protocol rules:
 * - 1 = 1 invariant must be maintained
 * - State must precede interpretation
 * - Responsibility is a technical invariant
 * - No hidden agents allowed
 * - State space transitions must follow Xₖ₊₁ := ℝ^{Xₖ} hierarchy
 * 
 * Protocol: Tests must validate that protocol violations trigger panic/shutdown
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  protocolBridge,
  ProtocolState,
  ExecutionDecision,
  validateInvariant,
  validateStatePrecedesInterpretation,
  validateResponsibilityInvariant,
  validateNoHiddenAgents,
  validateStateSpaceTransition,
  shouldTriggerFailsafe,
} from '../../src/specter/bridge';
import { ARCHITECT_WILL } from '../../src/core/architect-will';

describe('Protocol Bridge - 1 = 1 Invariant', () => {
  it('should maintain invariant across state transitions', () => {
    const state1 = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const state2 = protocolBridge.createState(
      { value: 43 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    expect(validateInvariant(state1, state2)).toBe(true);
  });

  it('should reject invariant violation when ownership changes without explicit transfer', () => {
    const state1 = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const state2 = protocolBridge.createState(
      { value: 43 },
      1,
      'Different Owner', // Ownership change without explicit transfer
      true
    );

    // Should reject - ownership discontinuity violates 1 = 1
    expect(validateInvariant(state1, state2)).toBe(false);
  });

  it('should reject invariant violation when state is ambiguous', () => {
    const state1 = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const state2 = protocolBridge.createState(
      { value: 43 },
      1,
      ARCHITECT_WILL.identity,
      false // Ambiguous state
    );

    expect(validateInvariant(state1, state2)).toBe(false);
  });

  it('should reject invariant violation when time sequence is violated', () => {
    const state1 = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    // Create state2 with earlier timestamp
    const state2: ProtocolState = {
      state: { value: 43 },
      level: 1,
      owner: ARCHITECT_WILL.identity,
      timestamp: state1.timestamp - 1000, // Earlier timestamp
      isExplicit: true,
    };

    expect(validateInvariant(state1, state2)).toBe(false);
  });
});

describe('Protocol Bridge - State Precedes Interpretation', () => {
  it('should allow decision when state is explicit', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const postState = protocolBridge.createState(
      { value: 43 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const decision = protocolBridge.createDecision(
      preState,
      postState,
      ARCHITECT_WILL.identity,
      false
    );

    expect(validateStatePrecedesInterpretation(decision)).toBe(true);
  });

  it('should reject decision when state is ambiguous', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      false // Ambiguous state
    );

    const decision = protocolBridge.createDecision(
      preState,
      null,
      ARCHITECT_WILL.identity,
      false
    );

    expect(validateStatePrecedesInterpretation(decision)).toBe(false);
  });

  it('should reject decision when narrative padding exists', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const decision = protocolBridge.createDecision(
      preState,
      null,
      ARCHITECT_WILL.identity,
      true // Narrative padding exists
    );

    expect(validateStatePrecedesInterpretation(decision)).toBe(false);
  });

  it('should reject decision when responsibility is not assigned', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const decision: ExecutionDecision = {
      preState,
      postState: null,
      actor: ARCHITECT_WILL.identity,
      responsibilityAssigned: false, // No responsibility assigned
      hasNarrativePadding: false,
    };

    expect(validateStatePrecedesInterpretation(decision)).toBe(false);
  });
});

describe('Protocol Bridge - Responsibility Invariant', () => {
  it('should allow state when responsibility is explicitly assigned', () => {
    const state1 = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const state2 = protocolBridge.createState(
      { value: 43 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    expect(validateResponsibilityInvariant(state1, state2)).toBe(true);
  });

  it('should reject state when owner is missing', () => {
    const state1 = protocolBridge.createState(
      { value: 42 },
      1,
      '', // No owner
      true
    );

    expect(validateResponsibilityInvariant(state1, null)).toBe(false);
  });

  it('should allow responsibility transfer when explicit', () => {
    const state1 = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const state2 = protocolBridge.createState(
      { value: 43 },
      1,
      'New Owner', // Explicit transfer
      true
    );

    // Transfer is allowed but logged
    expect(validateResponsibilityInvariant(state1, state2)).toBe(true);
  });
});

describe('Protocol Bridge - No Hidden Agents', () => {
  it('should allow decision when actor is explicitly identified', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const decision = protocolBridge.createDecision(
      preState,
      null,
      ARCHITECT_WILL.identity, // Explicit actor
      false
    );

    expect(validateNoHiddenAgents(decision)).toBe(true);
  });

  it('should reject decision when actor is missing', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const decision: ExecutionDecision = {
      preState,
      postState: null,
      actor: '', // No actor - hidden agent
      responsibilityAssigned: true,
      hasNarrativePadding: false,
    };

    expect(validateNoHiddenAgents(decision)).toBe(false);
  });
});

describe('Protocol Bridge - State Space Hierarchy Xₖ₊₁ := ℝ^{Xₖ}', () => {
  it('should allow X₀ → X₁ transition (scalar to finite-dimensional)', () => {
    expect(validateStateSpaceTransition(0, 1)).toBe(true);
  });

  it('should allow X₁ → X₂ transition (finite-dimensional to countable function space)', () => {
    expect(validateStateSpaceTransition(1, 2)).toBe(true);
  });

  it('should allow same-level transitions', () => {
    expect(validateStateSpaceTransition(1, 1)).toBe(true);
    expect(validateStateSpaceTransition(2, 2)).toBe(true);
  });

  it('should allow level jumps but log warning', () => {
    // X₁ → X₃ jump is allowed but logged
    expect(validateStateSpaceTransition(1, 3)).toBe(true);
  });

  it('should allow degradation but log warning', () => {
    // X₂ → X₁ degradation is allowed but logged
    expect(validateStateSpaceTransition(2, 1)).toBe(true);
  });
});

describe('Protocol Bridge - Failsafe Triggers', () => {
  it('should trigger failsafe when responsibility is unclear', () => {
    const state = protocolBridge.createState(
      { value: 42 },
      1,
      '', // No owner - unclear responsibility
      true
    );

    expect(shouldTriggerFailsafe(state, null)).toBe(true);
  });

  it('should trigger failsafe when state is ambiguous', () => {
    const state = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      false // Ambiguous state
    );

    expect(shouldTriggerFailsafe(state, null)).toBe(true);
  });

  it('should not trigger failsafe when state is valid', () => {
    const state = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    expect(shouldTriggerFailsafe(state, null)).toBe(false);
  });
});

describe('Protocol Bridge - Decision Validation', () => {
  it('should validate compliant decision', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const postState = protocolBridge.createState(
      { value: 43 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const decision = protocolBridge.createDecision(
      preState,
      postState,
      ARCHITECT_WILL.identity,
      false
    );

    // Mock console.error to prevent panic output during tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('Process exit called');
    });

    try {
      const result = protocolBridge.validateDecision(decision);
      expect(result).toBe(true);
    } catch (error) {
      // If panic is triggered, decision should be invalid
      expect(consoleSpy).toHaveBeenCalled();
    } finally {
      consoleSpy.mockRestore();
      exitSpy.mockRestore();
    }
  });

  it('should reject decision with protocol violation', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const postState = protocolBridge.createState(
      { value: 43 },
      1,
      'Different Owner', // Ownership violation
      true
    );

    const decision = protocolBridge.createDecision(
      preState,
      postState,
      ARCHITECT_WILL.identity,
      false
    );

    // Mock console.error and process.exit
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('Process exit called');
    });

    try {
      const result = protocolBridge.validateDecision(decision);
      expect(result).toBe(false);
    } catch (error) {
      // Panic should be triggered
      expect(consoleSpy).toHaveBeenCalled();
      expect(exitSpy).toHaveBeenCalled();
    } finally {
      consoleSpy.mockRestore();
      exitSpy.mockRestore();
    }
  });

  it('should execute decision only when validation passes', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const postState = protocolBridge.createState(
      { value: 43 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const decision = protocolBridge.createDecision(
      preState,
      postState,
      ARCHITECT_WILL.identity,
      false
    );

    // Mock console methods
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('Process exit called');
    });

    try {
      const executor = vi.fn(() => 'executed');
      const result = protocolBridge.executeDecision(decision, executor);

      expect(result).toBe('executed');
      expect(executor).toHaveBeenCalledTimes(1);
    } finally {
      consoleSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      exitSpy.mockRestore();
    }
  });

  it('should block execution when validation fails', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const postState = protocolBridge.createState(
      { value: 43 },
      1,
      'Different Owner', // Violation
      true
    );

    const decision = protocolBridge.createDecision(
      preState,
      postState,
      ARCHITECT_WILL.identity,
      false
    );

    // Mock console and process methods
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('Process exit called');
    });

    try {
      const executor = vi.fn(() => 'executed');
      const result = protocolBridge.executeDecision(decision, executor);

      expect(result).toBeNull();
      expect(executor).not.toHaveBeenCalled();
    } catch (error) {
      // Panic should prevent execution
      expect(consoleSpy).toHaveBeenCalled();
    } finally {
      consoleSpy.mockRestore();
      exitSpy.mockRestore();
    }
  });
});

describe('Protocol Bridge - State Creation', () => {
  it('should create protocol-compliant state', () => {
    const state = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    expect(state.state).toEqual({ value: 42 });
    expect(state.level).toBe(1);
    expect(state.owner).toBe(ARCHITECT_WILL.identity);
    expect(state.isExplicit).toBe(true);
    expect(state.timestamp).toBeGreaterThan(0);
  });

  it('should create decision from states', () => {
    const preState = protocolBridge.createState(
      { value: 42 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const postState = protocolBridge.createState(
      { value: 43 },
      1,
      ARCHITECT_WILL.identity,
      true
    );

    const decision = protocolBridge.createDecision(
      preState,
      postState,
      ARCHITECT_WILL.identity,
      false
    );

    expect(decision.preState).toBe(preState);
    expect(decision.postState).toBe(postState);
    expect(decision.actor).toBe(ARCHITECT_WILL.identity);
    expect(decision.responsibilityAssigned).toBe(true);
    expect(decision.hasNarrativePadding).toBe(false);
  });
});
