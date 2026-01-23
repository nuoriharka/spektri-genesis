use crate::core::{run, MafiaInput};

pub mod core {
    include!("../three_six_nine_mafia.rs");
}

#[no_mangle]
pub extern "C" fn mafia_run(identity: *const u8, action: *const u8, payload: *const u8) -> *mut u8 {
    unsafe {
        let id = std::ffi::CStr::from_ptr(identity as *const i8).to_str().unwrap_or("");
        let act = std::ffi::CStr::from_ptr(action as *const i8).to_str().unwrap_or("");
        let pay = std::ffi::CStr::from_ptr(payload as *const i8).to_str().unwrap_or("");
        let out = run(MafiaInput { identity: id, action: act, payload: pay, responsibility: true });
        out.state_hash.into_bytes().as_mut_ptr()
    }
}
