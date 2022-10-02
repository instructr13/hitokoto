import { extendTheme } from "@chakra-ui/react";

import type { ThemeConfig } from "@chakra-ui/react";

export const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true
};

const theme = extendTheme({
    config,
    fonts: {
        body: "sans-serif",
        heading: "sans-serif",
        mono: "monospace"
    }
});

export default theme;
