import { Box, Code, Heading } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { fullGenerate } from "@/lib/commands";
import Health from "@/lib/health";

const PreviewBox = () => {
    const { watch } = useFormContext(),
        temperature: number | string = watch("temperature"),
        health: string = watch("health"),
        detail: string = watch("detail"),
        rawAdditional: string = watch("additional"),
        useAdditional: boolean = watch("useAdditional"),
        additional: string | undefined = useAdditional ? rawAdditional : undefined,
        [preview, setPreview] = useState("");

    useMemo(() => {
        void (async () => {
            setPreview(await fullGenerate(+temperature, Health.from(health, detail).serialize(), additional));
        })();
    }, [temperature, health, detail, additional]);

    return (
        <Box my={6}>
            <Heading as="h4" fontSize="md">
                プレビュー
            </Heading>
            <Code display="block" overflow="auto" maxH={150} mt={2} p={4} fontSize="md" whiteSpace="pre">
                {preview}
            </Code>
        </Box>
    );
};

export default PreviewBox;
