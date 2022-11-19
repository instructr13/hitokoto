import { useColorMode } from "@chakra-ui/system";
import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";

import Loadable from "./Loadable";
import MainLayout from "./layouts";
import NormalSuspense from "./pages/Normal/index.skeleton";
import RandomSuspense from "./pages/Random/index.skeleton";

import type { Location } from "react-router-dom";

const Normal = Loadable(
        lazy(async () => import("./pages/Normal")),
        NormalSuspense
    ),
    Random = Loadable(
        lazy(async () => import("./pages/Random")),
        RandomSuspense
    ),
    Settings = Loadable(lazy(async () => import("./pages/Settings"))),
    SettingsModal = Loadable(lazy(async () => import("./pages/Settings/index.modal"))),
    About = Loadable(lazy(async () => import("./pages/About"))),
    AboutModal = Loadable(lazy(async () => import("./pages/About/index.modal"))),
    App = () => {
        const location = useLocation(),
            background: Location | undefined = location.state?.background,
            { colorMode } = useColorMode(),
            [isRandom] = useLocalStorageState("formIsRandom", {
                defaultValue: false
            });

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
