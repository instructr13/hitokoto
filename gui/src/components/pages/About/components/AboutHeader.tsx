import { Button, Heading, Tag, TagLabel, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";

import { useCopy } from "@/hooks/copy";

export interface AboutHeaderProps {
    name: string;
    coreVersion?: string;
    coreName?: string;
    comment: string;
    packageName: string;
    version: string;
    toolkitVersion?: string;
    toolkitName?: string;
}

const AboutHeader = ({
    comment,
    coreName,
    coreVersion,
    name,
    packageName,
    toolkitName,
    toolkitVersion,
    version
}: AboutHeaderProps) => {
    const [copy] = useCopy(
            "デバッグ情報",
            `${coreName && coreVersion ? `${coreName}: v${coreVersion}\n` : ""}${packageName}: v${version}${
                toolkitName && toolkitVersion
                    ? `
${toolkitName}: v${toolkitVersion}`
                    : ""
            }`
        ),
        [copyCount, setCopyCount] = useState(0);

    return (
        <>
            <Heading>{name}</Heading>
            <Text mt={2} color="gray.600" fontSize="lg" fontWeight="normal">
                {comment}
            </Text>
            <Text color="gray.500" fontSize="md" fontWeight="normal">
                Made with ❤️ by Mido
            </Text>
            <Tooltip label="デバッグ情報をコピー">
                <Tag
                    as={Button}
                    mt={4}
                    borderRadius="full"
                    colorScheme="purple"
                    onClick={() => {
                        if (copyCount === 4) {
                            setCopyCount(0);

                            toast.info("おいしいトーストのご登場です", { theme: "colored" });

                            return;
                        }

                        copy();

                        setCopyCount(copyCount + 1);
                    }}
                    size="lg"
                >
                    <TagLabel fontWeight="bold">{version}</TagLabel>
                </Tag>
            </Tooltip>
        </>
    );
};

export default AboutHeader;
