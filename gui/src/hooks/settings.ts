import { useState } from "react";

import type {
    CheckboxTree,
    InitialCheckboxTree
} from "@/components/pages/Settings/components/items/CheckboxTreeSetting";
import { createCheckboxTree } from "@/components/pages/Settings/components/items/CheckboxTreeSetting";

import type { Dispatch, SetStateAction } from "react";

export const useCheckboxTree = <T extends InitialCheckboxTree>(
    initialTree: T
): [T, CheckboxTree, Dispatch<SetStateAction<CheckboxTree>>] => {
    const [tree, setTree] = useState(createCheckboxTree(initialTree));

    return [initialTree, tree, setTree];
};
