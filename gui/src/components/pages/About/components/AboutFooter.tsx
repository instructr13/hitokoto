import { Grid, GridItem, Text } from "@chakra-ui/react";

export interface AboutFooterProps {
    coreName?: string;
    coreVersion?: string;
    packageName: string;
    toolkitName: string;
    toolkitVersion: string;
}

const AboutFooter = ({ coreName, coreVersion, packageName, toolkitName, toolkitVersion }: AboutFooterProps) => (
    <Grid templateColumns="auto 1fr auto">
        <GridItem>
            <Text>
                {packageName}
                {coreName && coreVersion ? `, using ${coreName} v${coreVersion}` : undefined}
            </Text>
        </GridItem>
        <GridItem />
        <GridItem>
            <Text>
                Powered by {toolkitName} v{toolkitVersion}
            </Text>
        </GridItem>
    </Grid>
);

export default AboutFooter;
