pub struct MafiaInput<'a> {
    pub identity: &'a str,
    pub action: &'a str,
    pub payload: &'a str,
    pub responsibility: bool,
}

pub struct MafiaOutput {
    pub state_hash: String,
}

fn hash(input: &str) -> String {
    use sha2::{Digest, Sha256};
    let mut hasher = Sha256::new();
    hasher.update(input.as_bytes());
    format!("{:x}", hasher.finalize())
}

pub fn three(input: &MafiaInput) -> bool {
    !input.identity.is_empty() && input.responsibility
}

pub fn six(input: &MafiaInput) -> String {
    format!("{}|{}|{}", input.identity, input.action, input.payload)
}

pub fn nine(processed: &str) -> MafiaOutput {
    MafiaOutput { state_hash: hash(processed) }
}

pub fn run(input: MafiaInput) -> MafiaOutput {
    if !three(&input) {
        panic!("MAFIA_EXIT: identity or responsibility missing");
    }
    let processed = six(&input);
    nine(&processed)
}
