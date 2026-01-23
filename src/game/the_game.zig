pub const State = enum { idle, validated, executed, failed };

fn pack(resonance: u32, score: u32) u64 {
    return (@as(u64, score) << 32) | @as(u64, resonance);
}

pub const Game = struct {
    state: State = .idle,
    resonance: u32 = 0,
    score: u32 = 0,

    pub fn step(self: *Game, integrity_ok: bool, anchored_count: u32) u64 {
        if (!integrity_ok) return pack(0, self.score);
        self.state = .validated;
        self.resonance +|= 3;
        self.state = .executed;
        self.resonance +|= 6;
        self.score +|= anchored_count * 9;
        if (self.state != .executed) self.crash();
        return pack(self.resonance, self.score);
    }

    fn crash(self: *Game) void {
        _ = self;
        @panic("INVARIANT_BROKEN: 1 != 1");
    }
};

pub export fn game_step(resonance: u32, score: u32, integrity_ok: u8, anchored_count: u32) u64 {
    var game = Game{ .resonance = resonance, .score = score };
    return game.step(integrity_ok == 1, anchored_count);
}
