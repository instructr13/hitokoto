use tauri::{
    AppHandle, CustomMenuItem, Manager, Runtime, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

fn create_menu() -> SystemTrayMenu {
    let quit = CustomMenuItem::new("quit", "終了");
    let show = CustomMenuItem::new("show", "表示");

    SystemTrayMenu::new()
        .add_item(show)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit)
}

pub(crate) fn create_system_tray() -> SystemTray {
    SystemTray::new().with_menu(create_menu())
}

pub(crate) fn create_system_tray_event<R: Runtime>() -> impl Fn(&AppHandle<R>, SystemTrayEvent) + Send + Sync + 'static
{
    |app, event| match event {
        SystemTrayEvent::LeftClick { .. } => {
            let window = app.get_window("main").expect("Cannot find main window");

            window.show().unwrap();
            window.set_focus().unwrap();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                app.exit(0);
            }
            "show" => {
                let window = app.get_window("main").expect("Cannot find main window");

                window.show().unwrap();
            }
            _ => {}
        },
        _ => {}
    }
}
