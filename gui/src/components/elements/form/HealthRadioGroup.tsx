import { HStack, Heading, useRadioGroup, FormControl } from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";

import RadioCard from "@/components/elements/RadioCard";
import Health from "@/lib/health";

const HealthRadioGroup = () => {
    const { control } = useFormContext(),
        { field } = useController({
            control,
            name: "health"
        }),
        { getRadioProps, getRootProps } = useRadioGroup({
            ...field
        }),
        radioGroupProps = getRootProps(),
        options = [Health.Healthy(), Health.Unhealthy(""), Health.Custom()],
        optionsColorMap: { [key: string]: string } = { custom: "blue.500", healthy: "green", unhealthy: "red" };

    return (
        <FormControl>
            <HStack mt={6} {...radioGroupProps}>
                <Heading as="h2" mx={2} fontSize="xl" fontStyle="none">
                    体調
                </Heading>
                {options.map(value => {
                    const key = value.toString(),
                        text = Health.localize(value),
                        radio = getRadioProps({ value: key });

                    return (
                        <RadioCard id="health" key={key} bg={optionsColorMap[key]} {...radio}>
                            {text}
                        </RadioCard>
                    );
                })}
            </HStack>
        </FormControl>
    );
};

export default HealthRadioGroup;
