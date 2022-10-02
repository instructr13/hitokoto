import { Grid, GridItem } from "@chakra-ui/react";

import { useAbout } from "@/hooks/about";

import AboutContent from "./components/AboutContent";
import AboutFooter from "./components/AboutFooter";
import AboutHeader from "./components/AboutHeader";

const Page = () => {
    const { application } = useAbout();

    return (
        <Grid templateRows="auto 1fr auto">
            <GridItem mt={10} textAlign="center">
                <AboutHeader
                    name="Hitokoto"
                    comment={application.comment}
                    packageName={application.name}
                    version={application.version}
                    coreName={application.coreName}
                    coreVersion={application.coreVersion}
                    toolkitName="Tauri"
                    toolkitVersion={application.tauriVersion}
                />
            </GridItem>
            <GridItem>
                <AboutContent authors={application.authors} license={application.license} />
            </GridItem>
            <GridItem display="block">
                <AboutFooter
                    coreName={application.coreName}
                    coreVersion={application.coreVersion}
                    packageName={application.name}
                    toolkitName="Tauri"
                    toolkitVersion={application.tauriVersion}
                />
            </GridItem>
        </Grid>
    );
};

export default Page;
