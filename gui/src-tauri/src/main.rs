#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

mod commands;

use commands::*;

#[cfg(debug_assertions)]
use tauri::Manager;

#[cfg(target_env = "msvc")]
use mimalloc::MiMalloc;

#[cfg(target_env = "msvc")]
#[global_allocator]
static GLOBAL: MiMalloc = MiMalloc;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            generate_random_template,
            get_core_name,
            get_core_version,
            get_random_temperature,
            get_temperature_range_max,
            get_temperature_range_min,
            full_generate
        ])
        .setup(|_app| {
            #[cfg(debug_assertions)]
            _app.get_window("main")
                .ok_or("cannot find main window")?
                .open_devtools();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
