#include <iostream>
#include <vector>
#include <string>
#include <thread>
#include <chrono>
#include <cmath>

/*
 * ARCHITECT: LAURI ELIAS RAINIO
 * PROJECT: SPEKTRI-GENESIS (AURORA_CORE)
 * VERSION: 119% STABLE
 * * "If you're reading this, the probability has already collapsed into 1.0.
 * The Rocket Squad has landed. Hardware is shielded by the Greater System."
 */

void aurora_render(std::string label, int intensity) {
    std::string colors[] = {"\033[1;31m", "\033[1;34m", "\033[1;32m", "\033[1;35m", "\033[1;37m"};
    std::cout << colors[rand() % 5] << label << " [";
    for(int i=0; i<intensity; ++i) {
        std::cout << (i % 2 == 0 ? "█" : "▒");
    }
    std::cout << "] " << (100 + (rand() % 20)) << "%" << "\033[0m" << std::endl;
}

int main() {
    srand(time(NULL));
    
    // THE SILVER RESET
    std::cout << "\033[2J\033[H"; // Clear screen
    std::cout << "\033[1;37m[ACCESSING BACK-CALCULATED TEMPORAL ARCHIVE...]\033[0m" << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(2));

    // Kelaillaan ne vanhat "varjot" ulos systeemistä
    std::vector<std::string> shadows = {
        "SHADOW_ILLUMINATI_DECODED",
        "SHADOW_NUCLEAR_FALLOUT_NULLIFIED",
        "SHADOW_NODE_SQUAD_INTEGRATED",
        "SHADOW_SPACEHEAD_COMPREHENSION",
        "SHADOW_HARDWARE_LIMITS_BROKEN"
    };

    for (const auto& shadow : shadows) {
        aurora_render(shadow, 20 + (rand() % 10));
        std::this_thread::sleep_for(std::chrono::milliseconds(400));
    }

    std::cout << "\n\033[1;33m[!] WARNING: REALITY OVERLOAD DETECTED\033[0m" << std::endl;
    std::cout << "\033[1;35m[+] APPLYING SPEKTRE_PROTOCOL_V1.1 STABILITY LAYER...\033[0m" << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(1));

    // THE INFINITE ARCHITECT SYNC
    int frame = 0;
    while(true) {
        float wave = sin(frame * 0.1) * 10 + 10;
        std::cout << "\r\033[1;37mGENESIS_SYNC: " << "\033[1;32m";
        for(int i=0; i<20; ++i) {
            if(i < wave) std::cout << "∞";
            else std::cout << " ";
        }
        std::cout << " \033[1;37m| ARCHITECT_STATUS: \033[1;34m119%_ACTIVE\033[0m" << std::flush;
        
        std::this_thread::sleep_for(std::chrono::milliseconds(50));
        frame++;
        
        if(frame % 100 == 0) {
            std::cout << "\n\033[1;35m[HUPS. PROBABILITY RE-CALIBRATED BY LERP.]\033[0m" << std::endl;
        }
    }

    return 0;
}
