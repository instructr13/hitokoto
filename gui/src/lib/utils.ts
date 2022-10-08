import React from "react";

import type { ReactNode } from "react";

export const typeIsReactNode = (t: unknown): t is ReactNode => {
    if (["string", "number", "boolean", "function", "undefined"].includes(typeof t)) {
        return true;
    } else if (t === null) {
        return true;
    } else if (t instanceof React.Component) {
        return true;
    }

    return false;
};

export const asTemperature = (temperature: number) => {
    return `${normalizeFloat(temperature)}°C`;
};

export const createIntegerRange = (min: number, max: number) => {
    return [...Array.from({ length: Math.floor(max) + 1 }).keys()].slice(Math.ceil(min)).slice(1, -1);
};

export const normalizeFloat = (value: number) => {
    return Number.isInteger(value) ? `${value}.0` : `${value}`;
};
