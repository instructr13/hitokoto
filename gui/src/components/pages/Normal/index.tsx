import { Grid, GridItem } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useKey, useLocalStorage } from "react-use";

import AdditionalInput from "@/components/elements/form/AdditionalInput";
import CopySubmitButton from "@/components/elements/form/CopySubmitButton";
import HealthDetailInput from "@/components/elements/form/HealthDetailInput";
import HealthRadioGroup from "@/components/elements/form/HealthRadioGroup";
import { useDefaultForm } from "@/hooks/form";
import { submitGenerate } from "@/lib/submit";
import type { GenerateFieldValues } from "@/schemas/normal";
import { normalSchema } from "@/schemas/normal";

import PreviewBox from "./components/PreviewBox";
import TemperatureSlider from "./components/TemperatureSlider";

const Normal = () => {
    const navigate = useNavigate(),
        [_, setIsRandom] = useLocalStorage("formIsRandom", false),
        parsedGenerateSchema = normalSchema.parse({}),
        [normalFieldValues] = useLocalStorage<GenerateFieldValues>("normalFieldValues", parsedGenerateSchema),
        methods = useDefaultForm({
            defaultValues: normalFieldValues || parsedGenerateSchema,
            mode: "all",
            resolver: zodResolver(normalSchema)
        }),
        { handleSubmit } = methods;

    useKey(
        event => event.altKey && event.key === "e",
        () => {
            setIsRandom(true);

            navigate("../random");
        },
        { event: "keydown" }
    );

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitGenerate)}>
                <Grid gap={6} templateColumns="1fr auto" my={5}>
                    <GridItem />
                    <GridItem>
                        <CopySubmitButton />
                    </GridItem>
                </Grid>
                <TemperatureSlider />
                <HealthRadioGroup />
                <HealthDetailInput />
                <AdditionalInput />
                <PreviewBox />
            </form>
        </FormProvider>
    );
};

export default Normal;
