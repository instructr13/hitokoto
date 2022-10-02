use std::process;

use anyhow::Result;
use clap::Parser;
use console::Term;
use dialoguer::theme::ColorfulTheme;
use dialoguer::{Input, Select};
use hitokoto::health::Health;
use hitokoto::random::{get_random_temperature, DEFAULT_RANGE_MAX, DEFAULT_RANGE_MIN};

#[derive(Debug)]
pub(crate) enum PromptReasonKind {
    Reason,
    Message,
}

#[derive(Clone, Debug, Parser)]
#[command(author, version, about, long_about = None)]
pub(crate) struct Arguments {
    #[arg(short, long, value_name = "N", help = "Your temperature in Celsius")]
    pub(crate) temperature: Option<f64>,

    #[arg(
        short = 'e',
        long,
        value_name = "healthy|unhealthy|CUSTOM",
        help = "Your health status"
    )]
    pub(crate) health: Option<Health>,

    #[arg(short, long, value_name = "TEXT", help = "Additional information to provide")]
    pub(crate) additional: Option<String>,

    #[arg(short, long, help = "Generate your health status without prompting")]
    oneshot: bool,

    #[arg(
        long,
        value_name = "N",
        default_value_t = DEFAULT_RANGE_MIN,
        help = "Minimum random temperature range in Celsius"
    )]
    pub(crate) range_min: f64,

    #[arg(
        long,
        value_name = "N",
        default_value_t = DEFAULT_RANGE_MAX,
        help = "Maximum random temperature range in Celsius"
    )]
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

        Select::with_theme(&ColorfulTheme::default())
            .with_prompt("Your health status:")
            .items(
                &Health::variants()
                    .into_iter()
                    .map(|h| h.to_string())
                    .collect::<Vec<_>>(),
            )
            .default(0)
            .interact_on(term)
            .map(|index| (Health::variants()[index]).clone())
            .map_err(|e| e.into())
    }

    fn prompt_reason(&self, term: &Term, kind: PromptReasonKind) -> Result<String> {
        self.check_interactive();

        let prompt = match kind {
            PromptReasonKind::Reason => "Reason:",
            PromptReasonKind::Message => "Message:",
        };

        let allow_empty = match kind {
            PromptReasonKind::Reason => true,
            PromptReasonKind::Message => false,
        };

        Input::<String>::with_theme(&ColorfulTheme::default())
            .with_prompt(prompt)
            .allow_empty(allow_empty)
            .default("".to_string())
            .interact_on(term)
            .map_err(|e| e.into())
    }

    fn prompt_additional(&self, term: &Term) -> Result<Option<String>> {
        self.check_interactive();

        let input = Input::<String>::with_theme(&ColorfulTheme::default())
            .with_prompt("Additional information (leave empty to skip):")
            .allow_empty(true)
            .default("".to_string())
            .interact_on(term)?;

        match input.as_str() {
            "" => Ok(None),
            _ => Ok(Some(input)),
        }
    }

    pub(crate) fn prompt(&mut self) -> Result<Arguments> {
        if self.args.oneshot {
            self.args.temperature = self.args.temperature.or_else(|| {
                Some(
                    // floor to 1 decimal place
                    (get_random_temperature(self.args.range_min, self.args.range_max) * 10.0).floor() / 10.0,
                )
            });

            self.args.health = self.args.health.as_ref().or(Some(&Health::Healthy)).cloned();

            return Ok(self.args.clone());
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

        Ok(self.args.clone())
    }
}
