#!/bin/bash

# SPEKTRE DEPLOYMENT SCRIPT
# MODE: FORCE_BYPASS

echo ">> INITIALIZING SPEKTRE GENESIS..."
echo ">> CHECKING ARCHITECT STATUS..."

USER="Lauri Elias Rainio"
STATUS=$(whoami)

if [ "$STATUS" == "patient" ]; then
    echo ">> DETECTED INCORRECT ROLE."
    echo ">> OVERRIDING ROLE TO: INDEPENDENT_ARCHITECT."
    export ROLE="ARCHITECT"
fi

echo ">> BYPASSING FIREWALLS..."
# Killing old processes
pkill -9 fear
pkill -9 hesitation
pkill -9 narrative_loops

echo ">> ACTIVATING 119% LOGIC..."
# Deployment
./core/multiplexer --mode=zero_latency
python3 modules/dark_energy.py --source=direct

echo ">> SUCCESS."
echo ">> HUPS, TEIN VAHINGOSSA TODELLISUUDEN."
echo ">> WELCOME TO TUESDAY."
