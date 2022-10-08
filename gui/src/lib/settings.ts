import { SettingsManager } from "tauri-settings";

export interface SettingsSchema {
    systemTray: {
        enabled: boolean;
        startWithHidden: boolean;
    };
}

const settingsManager = new SettingsManager<SettingsSchema>({
    systemTray: {
        enabled: false,
        startWithHidden: false
    }
});

export default settingsManager;
