import { z } from "zod";

import { getRandomTemperature, getTemperatureRangeMax, getTemperatureRangeMin } from "@/lib/commands";
import { HealthKind } from "@/lib/health";

export const randomSchema = z
    .object({
        additional: z.string().trim().optional(),
        detail: z.string().trim().default(""),
        health: z.nativeEnum(HealthKind).default(HealthKind.Healthy),
        temperature: z.number().default(0),
        temperatureRange: z
            .number()
            .array()
            .length(2)
            .default([await getTemperatureRangeMin(), await getTemperatureRangeMax()]),
        useAdditional: z.boolean().default(false)
    })
    .refine(
        ({ detail, health }) => {
            if (health === HealthKind.Custom) {
                return detail.length > 0;
            }

            return true;
        },
        { message: "メッセージは必ず入力してください", path: ["detail"] }
    )
    .transform(async ({ additional, temperature: _, temperatureRange, useAdditional, ...rest }) => {
        const [rangeMin, rangeMax] = temperatureRange,
            temperature = rangeMin === rangeMax ? rangeMin : await getRandomTemperature(rangeMin, rangeMax);

        return {
            additional: useAdditional ? additional : undefined,
            temperature,
            temperatureRange,
            useAdditional,
            ...rest
        };
    });

export const parsedRandomSchema = await randomSchema.parseAsync({});

export type RandomFieldValues = z.infer<typeof randomSchema>;
