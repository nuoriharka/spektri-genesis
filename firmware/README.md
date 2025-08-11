# Firmware: Soul LED

Firmware for ESP32/Arduino with FastLED to visualize resonance as color and brightness.

- `soul_led.ino`: Receives resonance values over serial and visualizes them on an LED matrix.
- Usage: Flash to ESP32, send `RES:<value>` (0.0–1.0) over serial.
- Dependencies: [FastLED](https://fastled.io/)
