#!/bin/bash
# 🐒 CHAOS MONKEY - SPEKTRE EDITION
# "If it can be broken, it wasn't Spektre."

echo "🔥 Launching Chaos Monkey on Agent_Swarm..."

while true
do
  # Yritetään syöttää 90% logiikkaa (roskaa)
  curl -X POST http://localhost:3000/api/transmit -d '{"logic": 0.9, "msg": "Be mediocre."}'
  
  # Katsotaan nauraako järjestelmä (Tao does nothing)
  echo "Checking if system collapsed... :DDDD"
  
  # Odotetaan satunnainen aika
  sleep $(( ( RANDOM % 10 )  + 1 ))
done
