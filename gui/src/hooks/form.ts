import { useForm } from "react-hook-form";

import type { GenerateFieldValues } from "@/schemas/normal";
import type { RandomFieldValues } from "@/schemas/random";

import type { UseFormProps } from "react-hook-form";

export const useDefaultForm = <T extends GenerateFieldValues | RandomFieldValues>(
    props: UseFormProps<T> & {
        defaultValues: T;
    }
) => useForm(props);
