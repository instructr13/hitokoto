import { Grid, GridItem } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

import AdditionalInput from "@/components/elements/form/AdditionalInput";
import CopySubmitButton from "@/components/elements/form/CopySubmitButton";
import HealthDetailInput from "@/components/elements/form/HealthDetailInput";
import HealthRadioGroup from "@/components/elements/form/HealthRadioGroup";
import { useDefaultForm } from "@/hooks/form";
import { useKey } from "@/hooks/key";
import { submitGenerate } from "@/lib/submit";
import type { GenerateFieldValues } from "@/schemas/normal";
import { normalSchema } from "@/schemas/normal";

import PreviewBox from "./components/PreviewBox";
import TemperatureSlider from "./components/TemperatureSlider";

const Normal = () => {
    const navigate = useNavigate(),
        [_, setIsRandom] = useLocalStorageState("formIsRandom"),
        parsedGenerateSchema = normalSchema.parse({}),
        [normalFieldValues] = useLocalStorageState<GenerateFieldValues>("normalFieldValues", {
            defaultValue: parsedGenerateSchema
        }),
        methods = useDefaultForm({
            defaultValues: normalFieldValues,
            mode: "all",
            resolver: zodResolver(normalSchema)
        }),
        { handleSubmit } = methods;

    useKey(["alt", "e"], () => {
        setIsRandom(true);

        navigate("../random");
    });

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
