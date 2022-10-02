import { CopyIcon } from "@chakra-ui/icons";
import { Button, Tooltip } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const CopySubmitButton = () => {
    const {
        formState: { isSubmitting, isValid }
    } = useFormContext();

    return (
        <Tooltip isDisabled={!isValid} label="結果を生成し、コピーします">
            <Button colorScheme="green" disabled={!isValid} isLoading={isSubmitting} type="submit">
                <CopyIcon mr={2} />
                コピー
            </Button>
        </Tooltip>
    );
};

export default CopySubmitButton;
