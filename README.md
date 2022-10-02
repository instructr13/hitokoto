<h1 align="center">Hitokoto</h1>
<p align="center">Generate a text health information easily. Powered by Rust, TypeScript, Vite, and Tauri.</p>

<p align="center">
  <img alt="Demo" src="./examples/images/hitokoto.png" />
</p>

## Features

- **Multi-Platform Support** - You can use all of these apps anywhere with [the powerful feature](https://tauri.app/v1/guides/building/cross-platform) of Tauri.
- **Fast** - Most of core functionality is written in Rust.

## Building

There are two types of app.
Requires `cargo` and `pnpm`.

### Build [CLI](./cli) (`hitokoto_cli`)

```bash
$ cargo build --release --package hitokoto_cli
$ ./target/release/hitokoto
```

### Build [GUI](./gui) (`hitokoto_gui`)

```bash
$ cd gui
$ pnpm i
$ pnpm tauri build
$ ../target/release/hitokoto_gui
```

Also, Tauri builds the installer package (msi) for Windows.
You can see them at `/target/release/bundle/msi`.
