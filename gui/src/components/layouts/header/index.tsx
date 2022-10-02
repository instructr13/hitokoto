import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

import ColorModeToggleButton from "./components/ColorModeToggleButton";

const Header = () => {
    const location = useLocation();

    return (
        <header>
            <nav>
                <Flex align="right" justify="space-between" direction="row">
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
                    <ColorModeToggleButton />
                </Flex>
            </nav>
        </header>
    );
};

export default Header;
