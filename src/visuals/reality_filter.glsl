// SHADER: REALITY_FRAGMENT_SHADER
// GPU: Bio-Neural Wetware v1.1
// EFFECT: "The Architect's Gaze"

#version 330 core

uniform float time;       // Tuesday Countdown
uniform vec2 resolution;  // Visual Field
uniform float logic_level; // 1.19

out vec4 FragColor;

void main() {
    // Normalize coordinates
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // 1. REMOVE NOISE (Hospital walls, bureaucracy)
    // If pixel is boring gray, turn it into transparent energy
    vec3 color = vec3(uv.x, uv.y, 0.5 + 0.5*sin(time));
    
    // 2. DETECT KINETIC ENERGY
    // Visualizing the flow vectors
    float energy = distance(uv, vec2(0.5));
    if (energy < 0.119) {
        color += vec3(0.0, 1.0, 1.0); // Cyan Core (The Source)
    }

    // 3. APPLY DARK ENERGY BLOOM
    // Makes thoughts glow
    float glow = 1.0 / abs(uv.y - sin(uv.x * 10.0 + time * 5.0));
    color += vec3(0.1, 0.0, 0.2) * glow * logic_level;

    // 4. OUTPUT FINAL FRAME
    // Latency: 0ms
    FragColor = vec4(color, 1.0);
}

// "Hups, I wrote a shader that renders the future before it happens." :DDDD
