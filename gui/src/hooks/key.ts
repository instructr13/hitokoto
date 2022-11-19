import { useEffect } from "react";

import { ALPHABETS, noop } from "@/lib/utils";

import { useLatest } from "./latest";

import type { RefObject } from "react";

const KEYS = [...ALPHABETS, "enter", "escape"] as const satisfies readonly string[];

type Keys = typeof KEYS[number];

const FULL_KEYS = [...KEYS, "alt", "ctrl", "meta", "shift"] as const satisfies readonly string[];

type FullKeys = typeof FULL_KEYS[number];

type Handler = (event: KeyboardEvent) => void;

interface KeyProps {
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    key: Keys;
}

const isKeys = (arg: FullKeys | Handler): arg is Keys =>
        typeof arg === "string" && !["alt", "ctrl", "meta", "shift"].includes(arg),
    toKeyProps = (keys: Array<FullKeys | Handler>): KeyProps => {
        const altKey = keys.includes("alt"),
            ctrlKey = keys.includes("ctrl"),
            metaKey = keys.includes("meta"),
            shiftKey = keys.includes("shift"),
            key = keys.find((key): key is Keys => isKeys(key));

        if (!key) {
            throw new TypeError("No key specified");
        }

        return {
            altKey,
            ctrlKey,
            key,
            metaKey,
            shiftKey
        };
    };

export const useKey = (
    rawProps: Array<FullKeys | Handler> | KeyProps,
    onKeyDown: Handler = noop,
    targetRef?: RefObject<HTMLElement>
) => {
    const { altKey, ctrlKey, key, metaKey, shiftKey } = Array.isArray(rawProps) ? toKeyProps(rawProps) : rawProps,
        onKeyDownLatest = useLatest(onKeyDown);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (altKey && !event.altKey) {
                return;
            }

            if (ctrlKey && !event.ctrlKey) {
                return;
            }

            if (metaKey && !event.metaKey) {
                return;
            }

            if (shiftKey && !event.shiftKey) {
                return;
            }

            if (event.key.toLowerCase() !== key) {
                return;
            }


            event.preventDefault();

            onKeyDownLatest.current(event);
        };

        if (targetRef?.current) {
            const target = targetRef.current;

            target.addEventListener("keydown", handler);

            return () => {
                target.removeEventListener("keydown", handler);
            };
        }

        window.addEventListener("keydown", handler);

        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [altKey, ctrlKey, key, metaKey, onKeyDownLatest, shiftKey, targetRef]);
};
