import { keyframes, Text, usePrefersReducedMotion } from "@chakra-ui/react";
import { useEffect, useReducer } from "react";
import useLocalStorageState from "use-local-storage-state";

const animatedGradient = keyframes`
    0% {
        background-position: 0 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
`,
    RandomModeText = () => {
        const [_, updateComponent] = useReducer<(x: number) => number, number>(
                x => x + 1,
                0,
                () => 0
            ),
            prefersReducedMotion = usePrefersReducedMotion(),
            [isRandom] = useLocalStorageState("formIsRandom"),
            animation = prefersReducedMotion ? undefined : `${animatedGradient} 10s ease infinite`;

        useEffect(() => {
            window.addEventListener("storage", () => {
                updateComponent();
            });
        }, []);

        if (!isRandom) {
            // eslint-disable-next-line unicorn/no-null
            return null;
        }

        return (
            <Text
                mr={6}
                color="transparent"
                lineHeight="40px"
                bg="linear-gradient(45deg, #d422b1, #ffce00)"
                bgSize="200% 200%"
                bgClip="text"
                animation={animation}
            >
                ランダム生成モード
            </Text>
        );
    };

export default RandomModeText;
