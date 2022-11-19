use std::process;

use anyhow::Result;
use clap::Parser;
use console::Term;
use dialoguer::theme::ColorfulTheme;
use dialoguer::{Input, Select};
use hitokoto::health::Health;
use hitokoto::random::{get_random_temperature, DEFAULT_RANGE_MAX, DEFAULT_RANGE_MIN};

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord)]
pub(crate) enum PromptReasonKind {
    Reason,
    Message,
}

#[derive(Clone, Debug, Parser)]
#[command(author, version, about, long_about = None)]
pub(crate) struct Arguments {
    /// Your temperature in Celsius
    #[arg(short, long, value_name = "N")]
    pub(crate) temperature: Option<f64>,

    /// Your health status
    ///
    /// CUSTOM will replace any health messages including '健康' and '不良'.
    #[arg(
        short = 'e',
        long,
        value_name = "healthy|unhealthy|CUSTOM",
    )]
    pub(crate) health: Option<Health>,

    /// Additional information to provide
    ///
    /// This will be added at last of generated text with newline.
    #[arg(short, long, value_name = "TEXT")]
    pub(crate) additional: Option<String>,

    /// Generae your health status without prompting
    ///
    /// The generated health text will be:
    ///     temperature: [Generated randomly]
    ///     health: [Health::Healthy]
    ///     additional: [None]
    #[arg(short, long, verbatim_doc_comment)]
    oneshot: bool,

    /// Minimum random temperature range in Celsius
    #[arg(long, value_name = "N", default_value_t = DEFAULT_RANGE_MIN)]
    pub(crate) range_min: f64,

    /// Maximum (included) random temperature range in Celsius
    #[arg(long, value_name = "N", default_value_t = DEFAULT_RANGE_MAX)]
    pub(crate) range_max: f64,
}

pub(crate) struct App {
    pub(crate) args: Arguments,
    interactive: bool,
}

impl App {
    pub(crate) fn new() -> Self {
        let interactive = atty::is(atty::Stream::Stdin) && atty::is(atty::Stream::Stderr);

        App {
            args: Arguments::parse(),
            interactive,
        }
    }

    fn check_interactive(&self) {
        if !self.interactive {
            eprintln!("error: interactive mode is required");

            process::exit(1);
        }
    }

    fn prompt_temperature(&self, term: &Term) -> Result<f64> {
        self.check_interactive();

        // floor to 1 decimal place
        let random = (get_random_temperature(self.args.range_min, self.args.range_max) * 10.0).floor() / 10.0;

        Input::<f64>::with_theme(&ColorfulTheme::default())
            .with_prompt("Your temperature in Celsius (leave empty to generate a random):")
            .allow_empty(true)
            .default(random)
            .interact_on(term)
            .map_err(|e| e.into())
    }

    fn prompt_health(&self, term: &Term) -> Result<Health> {
        self.check_interactive();

        let variants: Vec<Health> = Health::variants().collect();

        Select::with_theme(&ColorfulTheme::default())
            .with_prompt("Your health status:")
            .items(&variants)
            .default(0)
            .interact_on(term)
            .map(|index| (variants[index]).clone())
            .map_err(|e| e.into())
    }

    fn prompt_reason(&self, term: &Term, kind: PromptReasonKind) -> Result<String> {
        self.check_interactive();

        let prompt = match kind {
            PromptReasonKind::Reason => "Reason:",
            PromptReasonKind::Message => "Message:",
        };

        let allow_empty = kind == PromptReasonKind::Reason;

        Input::<String>::with_theme(&ColorfulTheme::default())
            .with_prompt(prompt)
            .allow_empty(allow_empty)
            .default("".into())
            .interact_on(term)
            .map_err(|e| e.into())
    }

    fn prompt_additional(&self, term: &Term) -> Result<Option<String>> {
        self.check_interactive();

        let input = Input::<String>::with_theme(&ColorfulTheme::default())
            .with_prompt("Additional information (leave empty to skip):")
            .allow_empty(true)
            .default("".into())
            .interact_on(term)?;

        match input.as_str() {
            "" => Ok(None),
            _ => Ok(Some(input)),
        }
    }

    pub(crate) fn prompt(mut self) -> Result<Self> {
        if self.args.oneshot {
            self.args.temperature = self.args.temperature.or_else(|| {
                Some(
                    // floor to 1 decimal place
                    (get_random_temperature(self.args.range_min, self.args.range_max) * 10.0).floor() / 10.0,
                )
            });

            self.args.health = self.args.health.as_ref().or(Some(&Health::Healthy)).cloned();

            return Ok(self);
        }

        let term = Term::buffered_stderr();

        if self.args.temperature.is_none() {
            self.args.temperature = Some(self.prompt_temperature(&term)?);
        }

        if self.args.health.is_none() {
            let health = self.prompt_health(&term)?;

            self.args.health = match health {
                Health::Unhealthy(_) => Some(Health::Unhealthy(self.prompt_reason(&term, PromptReasonKind::Reason)?)),
                Health::Custom(_) => Some(Health::Custom(self.prompt_reason(&term, PromptReasonKind::Message)?)),
                health => Some(health),
            };
        }

        if self.args.additional.is_none() {
            self.args.additional = self.prompt_additional(&term)?;
        }

        Ok(self)
    }
}
