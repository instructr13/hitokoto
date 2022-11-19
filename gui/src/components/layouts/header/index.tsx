import { InfoOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import { Grid, GridItem, IconButton, Tooltip } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

import ColorModeToggleButton from "./components/ColorModeToggleButton";
import RandomModeText from "./components/RandomModeText";

const Header = () => {
    const location = useLocation();

    return (
        <header>
            <nav>
                <Grid templateColumns="auto auto 1fr auto auto">
                    <GridItem>
                        <Tooltip label="設定">
                            <IconButton
                                as={Link}
                                aria-label="Settings"
                                icon={<SettingsIcon />}
                                state={{ background: location }}
                                to="/settings"
                                variant="ghost"
                            />
                        </Tooltip>
                    </GridItem>
                    <GridItem>
                        <Tooltip label="Hitokoto について">
                            <IconButton
                                as={Link}
                                aria-label="About"
                                icon={<InfoOutlineIcon />}
                                state={{ background: location }}
                                to="/about"
                                variant="ghost"
                            />
                        </Tooltip>
                    </GridItem>
                    <GridItem />
                    <GridItem>
                        <RandomModeText />
                    </GridItem>
                    <GridItem>
                        <ColorModeToggleButton />
                    </GridItem>
                </Grid>
            </nav>
        </header>
    );
};

export default Header;
