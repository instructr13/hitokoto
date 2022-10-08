import type { ReactNode } from "react";

export default interface BaseSettingProps<T> {
    children: ReactNode;
    label: string;
    onChange(value: T): void;
    value: T;
}
