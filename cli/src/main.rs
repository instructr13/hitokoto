use anyhow::{anyhow, Result};
use app::App;
use console::style;
use copypasta::{ClipboardContext, ClipboardProvider};

use hitokoto::out;

#[cfg(target_env = "msvc")]
use mimalloc::MiMalloc;

#[cfg(target_env = "msvc")]
#[global_allocator]
static GLOBAL: MiMalloc = MiMalloc;

pub(crate) mod app;

fn run() -> Result<()> {
    let mut app = App::new();

    let args = app.prompt()?;

    let temperature = args.temperature.ok_or_else(|| anyhow!("Temperature is required but was not defined"))?;
    let health = args.health.ok_or_else(|| anyhow!("Health status is required but was not defined"))?;

    let mut ctx = ClipboardContext::new().map_err(|_| anyhow!("Cannot initialize clipboard"))?;

    ctx.set_contents(out(temperature, health, args.additional))
        .map_err(|_| anyhow!("Cannot set result to clipboard"))?;

    println!("{}", style("Copied to clipboard").green());

    Ok(())
}

fn main() -> Result<()> {
    run()
}
