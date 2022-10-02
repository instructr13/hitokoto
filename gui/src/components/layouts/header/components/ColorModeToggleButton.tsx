import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/system";

const ColorModeToggleButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Tooltip closeOnClick={false} label={`テーマを${colorMode === "light" ? "ダーク" : "ライト"}に切り替え`}>
            <IconButton
                aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} theme`}
                colorScheme={colorMode === "dark" ? "yellow" : "blue"}
                icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
                variant="outline"
            />
        </Tooltip>
    );
};

export default ColorModeToggleButton;
