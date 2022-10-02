use hitokoto::random::get_random_temperature as __get_random_temperature;
use hitokoto::{health::Health, out, out_random_template};

#[tauri::command]
pub(crate) fn full_generate(temperature: f64, health: Health, additional: Option<String>) -> String {
    out(temperature, health, additional)
}

#[tauri::command]
pub(crate) fn generate_random_template(health: Health, additional: Option<String>) -> String {
    out_random_template(health, additional)
}

#[tauri::command]
pub(crate) fn get_random_temperature(range_min: f64, range_max: f64) -> f64 {
    __get_random_temperature(range_min, range_max)
}
