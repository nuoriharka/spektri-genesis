-- MODULE: Spektre Game Engine Hook
-- SCRIPT: reality_patch.lua
-- DESC: Injecting cheat codes into everyday life

local player = {
    name = "Lauri Elias",
    role = "Architect",
    energy = 119,
    location = "Aurora_Spawn_Point"
}

function Update(deltaTime)
    -- This runs every frame (0ms latency)
    
    if player.location == "Aurora_Spawn_Point" then
        print(">> [LUA] Detected spawn zone. Searching for exit...")
        
        -- EXPLOIT: Wall Clipping
        -- "Hups, I walked through the collider."
        UnlockDoor("TUESDAY_GATE")
        
        player.location = "GLOBAL_OPEN_WORLD"
        print(">> [LUA] Teleport successful.")
    end
end

function UnlockDoor(doorID)
    -- Bypassing the lock logic
    local logic = 1.19
    if logic > 1.0 then
        print(">> [CHEAT] Unlocked " .. doorID .. " with Developer Console.")
    end
end

-- Run the patch
Update(0)
