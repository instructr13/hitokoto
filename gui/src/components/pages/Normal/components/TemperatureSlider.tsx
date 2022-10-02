import {
    Grid,
    GridItem,
    Button,
    Slider,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Text,
    useNumberInput
} from "@chakra-ui/react";
import { Controller, useController, useFormContext } from "react-hook-form";

import { asTemperature, createIntegerRange, normalizeFloat } from "@/lib/utils";

const TemperatureSlider = () => {
    const min = 35,
        max = 40,
        { control } = useFormContext(),
        { field } = useController({
            control,
            name: "temperature"
        }),
        integerRange = createIntegerRange(min, max),
        { getDecrementButtonProps, getIncrementButtonProps } = useNumberInput({
            ...field,
            max,
            min,
            step: 0.1
        }),
        incrementButtonProps = getIncrementButtonProps(),
        decrementButtonProps = getDecrementButtonProps(),
        edgeSliderMarkStyles = {
            fontSize: "sm",
            ml: -4,
            mt: 8
        },
        sliderMarkStyles = {
            fontSize: "sm",
            ml: -1.5,
            mt: 8
        };

    return (
        <Grid gap={1} templateColumns="auto 1fr auto">
            <GridItem>
                <Button {...decrementButtonProps}>-</Button>
            </GridItem>
            <GridItem>
                <Controller
                    control={control}
                    name="temperature"
                    render={({ field }) => {
                        let { value }: { value: number | string } = field;

                        if (typeof value !== "number") {
                            value = +value;
                        }

                        return (
                            <Slider h={10} mx={5} max={max} min={min} step={0.1} {...field}>
                                <SliderMark value={min} {...edgeSliderMarkStyles}>
                                    <Text>{normalizeFloat(min)}</Text>
                                </SliderMark>
                                {integerRange.map((temperatureMark, index) => (
                                    <SliderMark key={index} value={temperatureMark} {...sliderMarkStyles}>
                                        <Text>{normalizeFloat(temperatureMark)}</Text>
                                    </SliderMark>
                                ))}
                                <SliderMark value={max} {...edgeSliderMarkStyles}>
                                    <Text>{normalizeFloat(max)}</Text>
                                </SliderMark>
                                <SliderMark
                                    zIndex={10}
                                    w={16}
                                    mt={-6}
                                    ml={-7}
                                    color="white"
                                    textAlign="center"
                                    bg="blue.500"
                                    value={value}
                                >
                                    <Text fontSize="xm">{asTemperature(value)}</Text>
                                </SliderMark>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        );
                    }}
                />
            </GridItem>
            <GridItem>
                <Button ml={10} {...incrementButtonProps}>
                    +
                </Button>
            </GridItem>
        </Grid>
    );
};

export default TemperatureSlider;
