import { Grid, GridItem, Kbd, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useKey, useLocalStorage } from "react-use";

import AdditionalInput from "@/components/elements/form/AdditionalInput";
import CopySubmitButton from "@/components/elements/form/CopySubmitButton";
import HealthDetailInput from "@/components/elements/form/HealthDetailInput";
import HealthRadioGroup from "@/components/elements/form/HealthRadioGroup";
import { useDefaultForm } from "@/hooks/form";
import { submitRandom } from "@/lib/submit";
import type { RandomFieldValues } from "@/schemas/random";
import { parsedRandomSchema, randomSchema } from "@/schemas/random";

import PreviewBox from "./components/PreviewBox";
import TemperatureRangeSlider from "./components/TemperatureRangeSlider";

const Random = () => {
    const navigate = useNavigate(),
        [_, setIsRandom] = useLocalStorage("formIsRandom", false),
        [randomFieldValues] = useLocalStorage<RandomFieldValues>("randomFieldValues", parsedRandomSchema),
        methods = useDefaultForm({
            defaultValues: randomFieldValues || parsedRandomSchema,
            mode: "all",
            resolver: zodResolver(randomSchema)
        }),
        { handleSubmit } = methods;

    useKey(
        event => event.altKey && event.key === "e",
        () => {
            setIsRandom(false);

            navigate("../normal");
        },
        { event: "keydown" }
    );

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitRandom)}>
                <Grid gap={6} templateColumns="auto 1fr auto" my={5}>
                    <GridItem>
                        <Text color="gray.400">
                            <Kbd>Alt</Kbd> + <Kbd>e</Kbd> で通常生成とランダム生成を切り替え
                        </Text>
                    </GridItem>
                    <GridItem />
                    <GridItem>
                        <CopySubmitButton />
                    </GridItem>
                </Grid>
                <TemperatureRangeSlider />
                <HealthRadioGroup />
                <HealthDetailInput />
                <AdditionalInput />
                <PreviewBox />
            </form>
        </FormProvider>
    );
};

export default Random;
