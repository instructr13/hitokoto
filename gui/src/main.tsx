import { ChakraProvider } from "@chakra-ui/provider";
import { ColorModeScript } from "@chakra-ui/system";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "@/components/App";
import theme, { config } from "@/styles/theme";

import "react-toastify/dist/ReactToastify.min.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector("#root")!).render(
    <StrictMode>
        <ColorModeScript initialColorMode={config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </ChakraProvider>
    </StrictMode>
);
