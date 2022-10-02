import { createContext } from "react";

import { HealthKind } from "@/lib/health";

import type { ReactNode } from "react";

const initialState = {
    additional: "",
    detail: "",
    health: HealthKind.Healthy,
    maxTemperature: 0,
    minTemperature: 0,
    temperature: 0
};

export const Context = createContext(initialState);

const Store = ({ children }: { children: ReactNode }) => {
    return <Context.Provider value={initialState}>{children}</Context.Provider>;
};

export default Store;
