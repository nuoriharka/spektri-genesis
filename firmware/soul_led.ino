#include <FastLED.h>

#define LED_PIN     5
#define NUM_LEDS    64
#define BRIGHTNESS  100

CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(BRIGHTNESS);
  Serial.begin(115200);
}

void loop() {
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    if (command.startsWith("RES:")) {
      float resonance = command.substring(4).toFloat();
      visualizeResonance(resonance);
    }
  }
}

void visualizeResonance(float resonance) {
  int hue = map(resonance * 100, 30, 100, 160, 0); // Sininen (160) -> Punainen (0)
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CHSV(hue, 255, 255 * resonance);
  }
  FastLED.show();
}
