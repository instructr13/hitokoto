import {
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderMark,
    RangeSliderThumb,
    RangeSliderTrack,
    Text,
    Tooltip
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

import { asTemperature, createIntegerRange, normalizeFloat } from "@/lib/utils";

const TemperatureRangeSlider = () => {
    const { control, watch } = useFormContext(),
        temperatureRange: [number, number] = watch("temperatureRange"),
        min = 35,
        max = 40,
        integerRange = createIntegerRange(min, max),
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
        <Controller
            control={control}
            name="temperatureRange"
            render={({ field }) => (
                <RangeSlider
                    h={10}
                    aria-label={["Minimum temperature", "Maximum temperature"]}
                    defaultValue={temperatureRange}
                    max={max}
                    min={min}
                    step={0.1}
                    {...field}
                >
                    <RangeSliderMark value={min} {...edgeSliderMarkStyles}>
                        {normalizeFloat(min)}
                    </RangeSliderMark>
                    {integerRange.map((temperatureMark, index) => (
                        <RangeSliderMark key={index} value={temperatureMark} {...sliderMarkStyles}>
                            <Text>{normalizeFloat(temperatureMark)}</Text>
                        </RangeSliderMark>
                    ))}
                    <RangeSliderMark value={max} {...edgeSliderMarkStyles}>
                        {normalizeFloat(max)}
                    </RangeSliderMark>
                    {temperatureRange.map((value, index) => (
                        <RangeSliderMark
                            key={index}
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
                        </RangeSliderMark>
                    ))}
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <Tooltip label="最小値">
                        <RangeSliderThumb index={0} />
                    </Tooltip>
                    <Tooltip label="最大値">
                        <RangeSliderThumb index={1} />
                    </Tooltip>
                </RangeSlider>
            )}
        />
    );
};

export default TemperatureRangeSlider;
