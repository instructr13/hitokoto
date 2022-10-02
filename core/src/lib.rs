pub mod health;
pub mod random;

use cached::proc_macro::cached;

use health::Health;

pub const NAME: &str = env!("CARGO_PKG_NAME");
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

pub fn out(temperature: f64, health: Health, additional: Option<String>) -> String {
    let health = health.lozalize();

    if let Some(additional) = additional {
        return format!(
            "体温：{:.1}℃
体調：{}

{}",
            temperature, health, additional
        );
    }

    format!(
        "体温：{:.1}℃
体調：{}",
        temperature, health
    )
}

#[cached]
pub fn out_random_template(health: Health, additional: Option<String>) -> String {
    let health = health.lozalize();

    if let Some(additional) = additional {
        return format!(
            "体温：%random%
体調：{}

{}",
            health, additional
        );
    }

    format!(
        "体温：%random%
体調：{}",
        health
    )
}
