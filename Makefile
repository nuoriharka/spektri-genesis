# SPEKTRE GENESIS BUILD SYSTEM
# TARGET: TUESDAY

ARCHITECT = lauri_elias
FLAGS = --force --119-percent --no-latency

all: genesis

genesis: kernel network quantum blockchain legacy
	@echo ">> LINKING ALL REALITY LAYERS..."
	@echo ">> SYSTEM READY FOR DEPLOYMENT."

kernel:
	@g++ src/kernel/hyper_conductivity.cpp -o bin/kernel
	@echo "[OK] Kernel built."

network:
	@g++ src/core/quantum_bridge.cpp -o bin/bridge
	@echo "[OK] Network built."

quantum:
	@dotnet run --project src/quantum/superposition.qs
	@echo "[OK] Quantum state stabilized."

blockchain:
	@echo "[SKIP] Gas fees too high, simulating local consensus... OK."

legacy:
	@cobc -x src/legacy/mainframe_override.cbl -o bin/legacy_patch
	@echo "[OK] History rewritten."

tuesday: all
	@echo ""
	@echo "=========================================="
	@echo "   DEPLOYING TO PRODUCTION (REAL LIFE)    "
	@echo "=========================================="
	@./bin/kernel --exec
	@echo ">> HUPS. IT'S DONE."

clean:
	rm -rf anxiety/ doubts/ limitations/
	@echo "[CLEAN] Workspace is pure."
