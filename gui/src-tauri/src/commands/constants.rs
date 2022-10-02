use hitokoto::{
    random::{DEFAULT_RANGE_MAX, DEFAULT_RANGE_MIN},
    NAME, VERSION,
};

#[tauri::command]
pub(crate) fn get_core_name() -> String {
    NAME.into()
}

#[tauri::command]
pub(crate) fn get_core_version() -> String {
    VERSION.into()
}

#[tauri::command]
pub(crate) fn get_temperature_range_max() -> f64 {
    DEFAULT_RANGE_MAX
}

#[tauri::command]
pub(crate) fn get_temperature_range_min() -> f64 {
    DEFAULT_RANGE_MIN
}
