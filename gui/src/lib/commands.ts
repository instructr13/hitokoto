import { invoke } from "@tauri-apps/api";

import type { SerializedHealth } from "./health";

export const getCoreName = async (): Promise<string> => {
    return invoke("get_core_name");
};

export const getCoreVersion = async (): Promise<string> => {
    return invoke("get_core_version");
};

export const getRandomTemperature = async (rangeMin: number, rangeMax: number): Promise<number> => {
    return invoke("get_random_temperature", { rangeMax, rangeMin });
};

export const getTemperatureRangeMax = async (): Promise<number> => {
    return invoke("get_temperature_range_max");
};

export const getTemperatureRangeMin = async (): Promise<number> => {
    return invoke("get_temperature_range_min");
};

export const generateRandomTemplate = async (health: SerializedHealth, additional?: string): Promise<string> => {
    return invoke("generate_random_template", { additional, health });
};

export const fullGenerate = async (
    temperature: number,
    health: SerializedHealth,
    additional?: string
): Promise<string> => {
    return invoke("full_generate", { additional, health, temperature });
};
