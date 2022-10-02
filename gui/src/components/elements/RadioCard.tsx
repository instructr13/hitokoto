import { Box, useRadio } from "@chakra-ui/react";
import { forwardRef } from "react";

import type { UseRadioProps } from "@chakra-ui/react";
import type { ReactElement } from "react";

const RadioCard = forwardRef<HTMLInputElement, UseRadioProps & { children: ReactElement | string; bg: string }>(
    ({ bg, children, ...props }, ref) => {
        const { getCheckboxProps, getInputProps } = useRadio(props),
            input = getInputProps({ ref }),
            checkbox = getCheckboxProps();

        return (
            <Box as="label">
                <input {...input} />

                <Box
                    {...checkbox}
                    px={5}
                    py={3}
                    borderWidth={1}
                    borderRadius="md"
                    _focus={{
                        boxShadow: "outline"
                    }}
                    _checked={{
                        bg,
                        borderColor: "transparent",
                        color: "white"
                    }}
                    cursor="pointer"
                >
                    {children}
                </Box>
            </Box>
        );
    }
);

RadioCard.displayName = "RadioCard";

export default RadioCard;
