import { ChatIcon, EditIcon } from "@chakra-ui/icons";
import {
    VStack,
    InputGroup,
    InputLeftElement,
    Input,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Box
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import Health, { HealthKind } from "@/lib/health";

const HealthDetailInput = () => {
    const {
            control,
            formState: { errors },
            register,
            reset
        } = useFormContext(),
        rawHealth: string = useWatch({
            control,
            name: "health"
        }),
        health = Health.from(rawHealth),
        revalidate = useCallback(() => {
            reset(
                {},
                {
                    keepDefaultValues: true,
                    keepDirtyValues: true,
                    keepIsSubmitted: true,
                    keepSubmitCount: true,
                    keepTouched: true,
                    keepValues: true
                }
            );
        }, [reset]),
        healthHelperText = {
            [HealthKind.Healthy]: "　",
            [HealthKind.Unhealthy]: "体調不良の理由があれば入力してください",
            [HealthKind.Custom]: "入力したカスタムメッセージが代わりに使用されます"
        }[health.kind];

    useEffect(() => {
        if (health.kind !== HealthKind.Custom) {
            revalidate();
        }
    }, [health.kind, revalidate]);

    return (
        <VStack mt={6} spacing={4}>
            <FormControl isInvalid={!!errors.detail}>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        {health.kind === HealthKind.Custom ? (
                            <ChatIcon color="gray.300" />
                        ) : (
                            <EditIcon color="gray.300" />
                        )}
                    </InputLeftElement>
                    <Input
                        disabled={health.kind === HealthKind.Healthy}
                        id="detail"
                        placeholder={health.kind === HealthKind.Custom ? "メッセージ" : "理由"}
                        variant="filled"
                        {...register("detail")}
                    />
                </InputGroup>
                <Box ml={10}>
                    {errors.detail ? (
                        <FormErrorMessage>{errors.detail.message?.toString()}</FormErrorMessage>
                    ) : (
                        <FormHelperText>{healthHelperText}</FormHelperText>
                    )}
                </Box>
            </FormControl>
        </VStack>
    );
};

export default HealthDetailInput;
