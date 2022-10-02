import { writeText } from "@tauri-apps/api/clipboard";
import { toast } from "react-toastify";

import type { GenerateFieldValues } from "@/schemas/normal";

import { fullGenerate } from "./commands";
import Health from "./health";

import type { RandomFieldValues } from "../schemas/random";
import type { SubmitHandler } from "react-hook-form";

export const submitGenerate: SubmitHandler<GenerateFieldValues> = async values => {
    localStorage.setItem("normalFieldValues", JSON.stringify(values));

    const generated = await fullGenerate(
        values.temperature,
        Health.from(values.health, values.detail).serialize(),
        values.additional
    );

    await writeText(generated);

    toast.success("結果をコピーしました");
};

export const submitRandom: SubmitHandler<RandomFieldValues> = async values => {
    localStorage.setItem("randomFieldValues", JSON.stringify(values));

    const generated = await fullGenerate(
        values.temperature,
        Health.from(values.health, values.detail).serialize(),
        values.additional
    );

    await writeText(generated);

    toast.success("結果をコピーしました");
};
