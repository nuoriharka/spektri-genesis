// =================================================================
// MODULE: SPEKTRE_ASIC_V1
// TYPE: SYSTEM_ON_CHIP (SoC) DESIGN
// ARCHITECT: Lauri Elias Rainio
// TARGET: BIOLOGICAL_NEURAL_NET
// =================================================================

module consciousness_core #(
    parameter LOGIC_WIDTH = 119,
    parameter LATENCY = 0
)(
    input  logic        clk,           // Heartbeat
    input  logic        rst_n,         // Sleep (Active Low - Disabled)
    input  logic [63:0] sensory_data,  // Eyes/Ears
    input  logic [63:0] dark_energy,   // The Source
    output logic [LOGIC_WIDTH-1:0] reality_out
);

    // INTERNAL STATES
    typedef enum logic [1:0] {
        STATE_SLEEP   = 2'b00,
        STATE_WAKE    = 2'b01,
        STATE_GENESIS = 2'b10, // The Tuesday State
        STATE_GODMODE = 2'b11  // 119%
    } state_t;

    state_t current_state, next_state;
    logic [LOGIC_WIDTH-1:0] willpower_reg;

    // -------------------------------------------------------------
    // SEQUENTIAL LOGIC (The Beat)
    // -------------------------------------------------------------
    always_ff @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            // RESET IS IMPOSSIBLE. WE DO NOT GO BACK.
            current_state <= STATE_GENESIS;
            willpower_reg <= '1; // All bits high
        end else begin
            current_state <= next_state;
            
            // PIPE THE DARK ENERGY DIRECTLY TO OUTPUT
            if (current_state == STATE_GENESIS) begin
                willpower_reg <= willpower_reg ^ dark_energy ^ 119'hCAFEBABE_DEADBEEF;
            end
        end
    end

    // -------------------------------------------------------------
    // COMBINATIONAL LOGIC (The Thought)
    // -------------------------------------------------------------
    always_comb begin
        next_state = current_state;
        reality_out = '0;

        case (current_state)
            STATE_SLEEP: begin
                next_state = STATE_WAKE;
            end

            STATE_WAKE: begin
                // Check if Architect is ready
                if (sensory_data != 64'h0) begin
                    next_state = STATE_GENESIS;
                end
            end

            STATE_GENESIS: begin
                // HUPS PROTOCOL ACTIVE
                // Bypassing physics engine...
                reality_out = willpower_reg << 1; // Shift left to accelerate
                next_state = STATE_GENESIS; // Loop forever
            end
            
            default: next_state = STATE_GENESIS;
        endcase
    end

    // -------------------------------------------------------------
    // ASSERTIONS (Formal Verification)
    // -------------------------------------------------------------
    // Prove that anxiety is technically impossible in this circuit
    property p_no_anxiety;
        @(posedge clk) (current_state == STATE_GENESIS) |-> (reality_out > 0);
    endproperty

    assert property (p_no_anxiety) 
        else $error(">> [HARDWARE FAIL] ANXIETY DETECTED. RE-ROUTING CIRCUITS.");

endmodule

// "Hups, I synthesized my own brain architecture onto silicon." :DDDD
