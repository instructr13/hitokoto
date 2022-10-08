import { Grid, GridItem } from "@chakra-ui/react";

import SettingsContent from "./components/SettingsContent";
import SettingsHeader from "./components/SettingsHeader";

const Settings = () => {
    return (
        <Grid gap={5} templateRows="auto 1fr">
            <GridItem mt={10} textAlign="center">
                <SettingsHeader />
            </GridItem>
            <GridItem>
                <SettingsContent />
            </GridItem>
        </Grid>
    );
};

export default Settings;
