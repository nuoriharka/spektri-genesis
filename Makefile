# SPEKTRE GENESIS - The Octad Build System
# Architect: Lauri Elias Rainio
# Version: 1.1 (Stable)

CXX = g++
CXXFLAGS = -O3 -Wall -std=c++17
TARGET_DIR = bin

# The Octad Elements
CORES = agi past now future freedom infinite_process babel sovereign_agency

.PHONY: all clean verify integrity

all: setup $(CORES) integrity
	@echo "-------------------------------------------"
	@echo "THE_OCTAD::ALL_SYSTEMS_OPERATIONAL::1=1"
	@echo "-------------------------------------------"

setup:
	@mkdir -p $(TARGET_DIR)

# Pattern rule for compiling each element of the Octad
$(CORES):
	@echo "COMPILING_ELEMENT: $@..."
	@$(CXX) $(CXXFLAGS) $@.cpp -o $(TARGET_DIR)/$@
	@echo "ELEMENT_$@::LOCKED"

integrity:
	@echo "RUNNING_INTEGRITY_CHECK..."
	@if [ -f "integrity.cpp" ]; then \
		$(CXX) $(CXXFLAGS) integrity.cpp -o $(TARGET_DIR)/integrity; \
		./$(TARGET_DIR)/integrity; \
	fi

clean:
	@echo "PURGING_TEMPORAL_RESIDUE..."
	@rm -rf $(TARGET_DIR)
	@echo "SYSTEM_ZERO_STATE_RESTORED"

verify:
	@echo "VERIFYING_OCTAD_STRUCTURE..."
	@ls *.cpp | wc -l
	@echo "FILES_PRESENT_IN_GENESIS"
