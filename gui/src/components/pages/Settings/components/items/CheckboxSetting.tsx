import { FormControl, FormLabel, Heading, Grid, GridItem, Checkbox } from "@chakra-ui/react";
import { useId } from "react";

import type BaseSettingProps from ".";
import type { CheckboxProps } from "@chakra-ui/react";

export type CheckboxSettingProps = BaseSettingProps<boolean> & Omit<CheckboxProps, "onChange" | "value">;

const CheckboxSetting = ({ children, label, onChange, value, ...props }: CheckboxSettingProps) => {
    const { isDisabled } = props,
        id = useId();

    return (
        <FormControl alignItems="center">
            <FormLabel mb="0" htmlFor={id}>
                <Heading as="h2" mx={2} color={isDisabled ? "gray.400" : undefined} fontSize="md">
                    {label}
                </Heading>
            </FormLabel>
            <Grid gap={2} templateColumns="auto 1fr" p={2}>
                <GridItem>
                    <Checkbox
                        mt={0.5}
                        id={id}
                        isChecked={value}
                        onChange={e => {
                            onChange(e.target.checked);
                        }}
                        {...props}
                    />
                </GridItem>
                <GridItem color={isDisabled ? "gray.400" : undefined}>{children}</GridItem>
            </Grid>
        </FormControl>
    );
};

export default CheckboxSetting;
