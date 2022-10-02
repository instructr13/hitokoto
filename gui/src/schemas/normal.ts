import { z } from "zod";

import { HealthKind } from "@/lib/health";

export const normalSchema = z
    .object({
        additional: z.string().trim().optional(),
        detail: z.string().trim().default(""),
        health: z.nativeEnum(HealthKind).default(HealthKind.Healthy),
        temperature: z
            .union([z.number(), z.string()])
            .transform(n => +n)
            .default(36.5),
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
    .transform(({ additional, detail, health, temperature, useAdditional }) => ({
        additional: useAdditional ? additional : undefined,
        detail,
        health,
        temperature,
        useAdditional
    }));

export type GenerateFieldValues = z.infer<typeof normalSchema>;
