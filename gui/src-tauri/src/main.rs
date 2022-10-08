#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

mod commands;
mod config;
mod tray;

use commands::*;

use anyhow::Result;
use config::{read_config, AppConfig, SystemTrayConfig};
use tauri::Manager;
use tauri::{generate_context, RunEvent, WindowEvent};

use tray::{create_system_tray, create_system_tray_event};

#[cfg(target_env = "msvc")]
use mimalloc::MiMalloc;

#[cfg(target_env = "msvc")]
#[global_allocator]
static GLOBAL: MiMalloc = MiMalloc;

#[tokio::main]
async fn main() -> Result<()> {
    let context = generate_context!();

    let AppConfig {
        system_tray: SystemTrayConfig {
            enabled,
            start_with_hidden,
        },
    } = read_config(context.config()).await?;

    let builder = {
        let builder = tauri::Builder::default();

        if enabled {
            builder
                .system_tray(create_system_tray())
                .on_system_tray_event(create_system_tray_event())
        } else {
            builder
        }
    };

    builder
        .invoke_handler(tauri::generate_handler![
            generate_random_template,
            get_core_name,
            get_core_version,
            get_random_temperature,
            get_temperature_range_max,
            get_temperature_range_min,
            full_generate
        ])
        .setup(move |app| {
            let window = app.get_window("main").ok_or("Cannot find main window")?;
            #[cfg(debug_assertions)]
            window.open_devtools();

            if enabled && start_with_hidden {
                window.hide()?;
            }

            Ok(())
        })
        .build(context)?
        .run(move |app_handle, event| {
            if !enabled {
                return;
            }

            if let RunEvent::WindowEvent {
                event: WindowEvent::CloseRequested { api, .. },
                ..
            } = event
            {
                api.prevent_close();

                let window = app_handle.get_window("main").expect("Cannot find main window");

                window.hide().expect("Cannot hide main window");
            }
        });

    Ok(())
}
