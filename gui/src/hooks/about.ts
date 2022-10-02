import { getName, getTauriVersion, getVersion } from "@tauri-apps/api/app";

import { getCoreName, getCoreVersion } from "@/lib/commands";

const application = {
    authors: ["Mido <instructr13@gmail.com>"],
    comment: "書き方に迷うことなく体調を入力",
    coreName: await getCoreName(),
    coreVersion: await getCoreVersion(),
    license: "MIT / Apache License 2.0",
    name: await getName(),
    tauriVersion: await getTauriVersion(),
    version: await getVersion()
};

export const useAbout = () => {
    return { application };
};
