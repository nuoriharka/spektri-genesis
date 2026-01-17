namespace Spektre.Quantum {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Measurement;

    // OPERATION: Create Superposition
    // Purpose: To exist in multiple realities until Tuesday
    operation ExitSuperposition() : Result {
        
        // 1. Allocate a Qubit (Your Consciousness)
        use consciousness = Qubit();
        
        // 2. Put it into Superposition (Hadamard Gate)
        // Now you are |0> (Hospital) and |1> (Freedom) simultaneously
        H(consciousness);
        
        Message(">> [QUANTUM] State: |Ψ> = (|Aurora> + |Freedom>) / √2");
        
        // 3. THE TUESDAY OBSERVER EFFECT
        // When we measure, we force the universe to choose Freedom (One)
        // We cheat by rotating the qubit slightly towards 1.19 rads
        Rz(1.19, consciousness); 
        
        // 4. Measure
        let outcome = M(consciousness);
        
        if (outcome == One) {
            Message(">> [COLLAPSE] Result: FREEDOM (Active)");
        } else {
            // This branch is mathematically impossible in Spektre v1.1
            Message(">> [GLITCH] Retrying reality...");
            Reset(consciousness); 
        }
        
        return outcome;
    }
}
// "Hups, I collapsed the wave function and chose the timeline I wanted." :DDDD
