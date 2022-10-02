use std::{fmt::Display, str::FromStr};

use serde::Deserialize;

#[derive(Clone, Debug, Deserialize, PartialEq, Eq, Hash)]
#[serde(tag = "health", content = "message")]
pub enum Health {
    #[serde(rename = "healthy")]
    Healthy,
    #[serde(rename = "unhealthy")]
    Unhealthy(String), // reason: String
    #[serde(rename = "custom")]
    Custom(String), // message: String
}

impl Health {
    pub fn variants() -> Vec<Health> {
        vec![
            Health::Healthy,
            Health::Unhealthy("".to_string()),
            Health::Custom("".to_string()),
        ]
    }

    pub fn lozalize(&self) -> String {
        match self {
            Health::Healthy => "良好".into(),
            Health::Unhealthy(reason) => {
                if reason.is_empty() {
                    return "不良".into();
                }

                format!("不良（{}）", reason)
            }
            Health::Custom(custom) => custom.clone(),
        }
    }
}

impl Display for Health {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Health::Healthy => write!(f, "Healthy"),
            Health::Unhealthy(reason) => {
                if reason.is_empty() {
                    return write!(f, "Unhealthy");
                }

                write!(f, "Unhealthy: {}", reason)
            }
            Health::Custom(message) => {
                if message.is_empty() {
                    return write!(f, "Custom");
                }

                write!(f, "{}", message)
            }
        }
    }
}

impl FromStr for Health {
    type Err = String;

    fn from_str(value: &str) -> Result<Self, Self::Err> {
        match value {
            "healthy" => Ok(Health::Healthy),
            "unhealthy" => Ok(Health::Unhealthy("".to_owned())),
            value => Ok(Health::Custom(value.to_owned())),
        }
    }
}
