import { RepeatIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { relaunch } from "@tauri-apps/api/process";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffectOnce } from "react-use";

import settingsManager from "@/lib/settings";
import { typeIsReactNode } from "@/lib/utils";

import CheckboxTreeSetting, { createCheckboxTree } from "./items/CheckboxTreeSetting";

import type { InitialCheckboxTree } from "./items/CheckboxTreeSetting";

export interface SettingsContentProps {
    modal?: boolean;
}

const SettingsContent = ({ modal }: SettingsContentProps) => {
    const initialSystemTraySettings: InitialCheckboxTree = {
            checked: false,
            description: (
                <Text>Hitokoto のウィンドウを閉じたときに、そのまま終了せずにシステムトレイに格納します。</Text>
            ),
            label: "システムトレイに常駐",
            startWithHidden: {
                checked: false,
                description: (
                    <Text>Hitokoto の起動時に、ウィンドウを表示せずシステムトレイに縮小した状態にします。</Text>
                ),
                label: "最小化した状態で起動する"
            }
        },
        [systemTraySettings, setSystemTraySettings] = useState(createCheckboxTree(initialSystemTraySettings));

    useEffectOnce(() => {
        (async () => {
            const config = await settingsManager.get("systemTray");

            initialSystemTraySettings.checked = config.enabled;
            if (
                !initialSystemTraySettings.startWithHidden ||
                typeIsReactNode(initialSystemTraySettings.startWithHidden)
            ) {
                return;
            }

            initialSystemTraySettings.startWithHidden.checked = config.startWithHidden;

            setSystemTraySettings(createCheckboxTree(initialSystemTraySettings));
        })().catch((error: Error) => {
            toast.error(`設定ファイルのロードに失敗しました。\n${error.message}`);
        });
    });

    return (
        <Container maxW={modal ? "lg" : "2xl"}>
            <CheckboxTreeSetting
                initialValue={initialSystemTraySettings}
                onChange={tree => {
                    (async () => {
                        if (typeof tree === "boolean") {
                            return;
                        }

                        await settingsManager.set("systemTray", {
                            enabled: tree.checked,
                            startWithHidden: (typeof tree.startWithHidden === "boolean"
                                ? { checked: tree.startWithHidden }
                                : tree.startWithHidden
                            ).checked
                        });
                    })()
                        .then(() => {
                            setSystemTraySettings(previousTree => {
                                if (typeof previousTree === "boolean" || typeof tree === "boolean") {
                                    return tree;
                                }

                                if (previousTree.checked !== tree.checked) {
                                    toast.info(
                                        <>
                                            <Text>設定を適用するには再起動が必要になる可能性があります。</Text>
                                            <Flex justify="flex-end" direction="row" mt={2}>
                                                <Button
                                                    colorScheme="blue"
                                                    leftIcon={<RepeatIcon />}
                                                    onClick={() => {
                                                        void relaunch();
                                                    }}
                                                >
                                                    再起動
                                                </Button>
                                            </Flex>
                                        </>
                                    );
                                }

                                return tree;
                            });
                        })
                        .catch((error: Error) => {
                            toast.error(`設定ファイルの書き込みに失敗しました。\n${error.message}`);
                        });
                }}
                value={systemTraySettings}
            />
        </Container>
    );
};

export default SettingsContent;
