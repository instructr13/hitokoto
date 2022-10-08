import { useColorMode } from "@chakra-ui/system";
import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useLocalStorage } from "react-use";

import Loadable from "./Loadable";
import MainLayout from "./layouts";

import type { Location } from "react-router-dom";

const Normal = Loadable(lazy(async () => import("./pages/Normal"))),
    Random = Loadable(lazy(async () => import("./pages/Random"))),
    Settings = Loadable(lazy(async () => import("./pages/Settings"))),
    SettingsModal = Loadable(lazy(async () => import("./pages/Settings/modal"))),
    About = Loadable(lazy(async () => import("./pages/About"))),
    AboutModal = Loadable(lazy(async () => import("./pages/About/modal"))),
    App = () => {
        const location = useLocation(),
            background: Location | undefined = location.state?.background,
            { colorMode } = useColorMode(),
            [isRandom] = useLocalStorage("formIsRandom", false);

        return (
            <>
                <Routes location={background || location}>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Navigate to={`/${isRandom ? "random" : "normal"}`} replace />} />
                        <Route path="/normal" element={<Normal />} />
                        <Route path="/random" element={<Random />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/about" element={<About />} />
                    </Route>
                </Routes>
                {background ? (
                    <Routes>
                        <Route path="/about" element={<AboutModal />} />
                        <Route path="/settings" element={<SettingsModal />} />
                    </Routes>
                ) : undefined}
                <ToastContainer theme={colorMode} position="bottom-center" autoClose={3000} pauseOnFocusLoss={false} />
            </>
        );
    };

export default App;
