import { Box, Fade, FormControl, FormHelperText, FormLabel, Heading, Switch, Textarea } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const AdditionalInput = () => {
    const { register, watch } = useFormContext(),
        useAdditional: boolean = watch("useAdditional");

    return (
        <Box mt={4}>
            <FormControl alignItems="center" flexDir="row" display="flex">
                <FormLabel mb="0" htmlFor="use-additional">
                    <Heading
                        as="h2"
                        mx={2}
                        color={useAdditional ? undefined : "gray.400"}
                        fontSize="xl"
                        fontStyle="none"
                    >
                        備考
                    </Heading>
                </FormLabel>
                <Switch id="use-additional" {...register("useAdditional")} size="lg" />
            </FormControl>
            <Fade in={useAdditional}>
                <FormControl>
                    <Textarea mt={2} {...register("additional")} />
                    <FormHelperText>追加で書くことがあれば入力してください</FormHelperText>
                </FormControl>
            </Fade>
        </Box>
    );
};

export default AdditionalInput;
