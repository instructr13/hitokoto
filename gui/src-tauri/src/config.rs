use anyhow::{anyhow, Result};
use serde::{Deserialize, Serialize};
use tauri::{api::path::app_dir, Config};
use tokio::fs::read_to_string;

#[derive(Serialize, Deserialize, Debug, Default)]
#[serde(rename_all = "camelCase")]
pub(crate) struct SystemTrayConfig {
    pub(crate) enabled: bool,
    pub(crate) start_with_hidden: bool,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub(crate) struct AppConfig {
    #[serde(default)]
    pub(crate) system_tray: SystemTrayConfig,
}

pub(crate) async fn read_config(config: &Config) -> Result<AppConfig> {
    let config_path = app_dir(config)
        .ok_or("Cannot find app directory")
        .map_err(|e| anyhow!(e))?
        .join("settings.json");
    let raw_config = read_to_string(config_path).await.unwrap_or_else(|_| "{}".into());
    let config = serde_json::from_str(&raw_config)?;

    Ok(config)
}
