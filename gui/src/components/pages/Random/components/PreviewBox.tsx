import { Box, Code, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { generateRandomTemplate } from "@/lib/commands";
import Health from "@/lib/health";
import { normalizeFloat } from "@/lib/utils";

const RANDOM_REGEX = /(%random%)/,
    PreviewBox = () => {
        const { watch } = useFormContext(),
            temperatureRange: [number, number] = watch("temperatureRange"),
            [rangeMin, rangeMax] = temperatureRange.map(n => normalizeFloat(n)),
            health: string = watch("health"),
            detail: string = watch("detail"),
            rawAdditional: string = watch("additional"),
            useAdditional: boolean = watch("useAdditional"),
            additional: string | undefined = useAdditional ? rawAdditional : undefined,
            [preview, setPreview] = useState("");

        useEffect(() => {
            void (async () => {
                setPreview(await generateRandomTemplate(Health.from(health, detail).serialize(), additional));
            })();
        }, [health, detail, additional]);

        return (
            <Box my={6}>
                <Heading as="h4" fontSize="md">
                    プレビュー
                </Heading>
                <Code display="block" overflow="auto" maxH={150} mt={2} p={4} fontSize="md" whiteSpace="pre">
                    {preview !== ""
                        ? preview.split(RANDOM_REGEX).map((part, index) =>
                              part === "%random%" ? (
                                  <Box key={index} display="inline" color="gray.400" fontStyle="italic">
                                      ランダム生成 (
                                      {rangeMin === rangeMax ? `固定値：${rangeMin}` : `${rangeMin}～${rangeMax}`})
                                  </Box>
                              ) : (
                                  part
                              )
                          )
                        : "..."}
                </Code>
            </Box>
        );
    };

export default PreviewBox;
