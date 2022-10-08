import { Box } from "@chakra-ui/react";
import dot from "dot-object";

import { typeIsReactNode } from "@/lib/utils";

import CheckboxSetting from "./CheckboxSetting";

import type { ReactNode } from "react";

// the initial state of checkboxes the user defines

interface BaseInitialCheckbox {
    checked: boolean;
    description: ReactNode;
    label: string;
}

interface InitialParentCheckbox extends BaseInitialCheckbox {
    [rest: string]: BaseInitialCheckbox | InitialParentCheckbox | ReactNode;
}

export type InitialCheckboxTree = BaseInitialCheckbox | InitialParentCheckbox;

// end of the initial state of checkboxes

// the updated state of checkboxes that used internally

type InternalChildCheckbox = boolean;

interface InternalParentCheckbox {
    checked: boolean;
    [rest: string]: InternalChildCheckbox | InternalParentCheckbox;
}

type InternalCheckboxTree = InternalChildCheckbox | InternalParentCheckbox;

// end of the updated state

type ChildCheckboxTree = boolean;

interface ParentCheckboxTree {
    checked: boolean;
    [checkboxes: string]: ChildCheckboxTree | ParentCheckboxTree;
}

export type CheckboxTree = ChildCheckboxTree | ParentCheckboxTree;

const internalTreeHasChildren = (tree: InitialCheckboxTree): tree is InitialParentCheckbox =>
        Object.getOwnPropertyNames(tree).some(key => !["checked", "description", "label"].includes(key)),
    getTreeCondition = (tree: CheckboxTree): boolean => {
        if (typeof tree === "boolean") {
            return tree;
        }

        // indeterminate = checkedArray.some(condition => condition.indeterminate) && !all;

        return tree.checked;
    },
    createInternalTree = (
        initialTree: InitialCheckboxTree,
        currentTree: CheckboxTree,
        onChange: (tree: InternalCheckboxTree, targetKey: string) => void,
        componentsToAdd: ReactNode[],
        currentKey = "#root#",
        isDisabled = false
    ): InternalCheckboxTree => {
        const depth = currentKey.split(".").length - 1;

        if (!internalTreeHasChildren(initialTree)) {
            const { checked: defaultChecked, description: children, label } = initialTree;

            if (typeof currentTree !== "boolean") {
                throw new TypeError("conversion error. current tree is not a boolean");
            }

            componentsToAdd.push(
                <Box mt={2} ml={depth * 6}>
                    <CheckboxSetting
                        isDisabled={isDisabled}
                        label={label}
                        value={currentTree}
                        defaultChecked={defaultChecked}
                        onChange={value => {
                            onChange(value, currentKey);
                        }}
                    >
                        {children}
                    </CheckboxSetting>
                </Box>
            );

            return currentTree;
        }

        if (typeof currentTree === "boolean") {
            throw new TypeError("conversion error. current tree is a boolean");
        }

        const keysToSearch = Object.getOwnPropertyNames(currentTree).filter(key => key !== "checked"),
            conditionTree: InternalCheckboxTree = {
                checked: getTreeCondition(currentTree)
            };

        for (const key of keysToSearch) {
            const initialChild = initialTree[key],
                currentChild = currentTree[key];

            if (typeIsReactNode(initialChild)) {
                throw new Error("children was a react component");
            }

            conditionTree[key] = createInternalTree(
                initialChild,
                currentChild,
                onChange,
                componentsToAdd,
                `${currentKey}.${key}`,
                isDisabled || !conditionTree.checked
            );
        }

        const { checked: defaultChecked, description: children, label } = initialTree;

        componentsToAdd.unshift(
            <Box mt={2} ml={depth * 6}>
                <CheckboxSetting
                    isDisabled={isDisabled}
                    label={label}
                    defaultChecked={defaultChecked}
                    value={currentTree.checked}
                    onChange={value => {
                        onChange(value, `${currentKey}.checked`);
                    }}
                >
                    {children}
                </CheckboxSetting>
            </Box>
        );

        return conditionTree;
    };

export const createCheckboxTree = (tree: InitialCheckboxTree): CheckboxTree => {
    if (!internalTreeHasChildren(tree)) {
        return tree.checked;
    }

    const keysToSearch = Object.getOwnPropertyNames(tree).filter(
            key => !["checked", "description", "label"].includes(key)
        ),
        result: CheckboxTree = { checked: tree.checked };

    for (const key of keysToSearch) {
        const child = tree[key];

        if (typeIsReactNode(child)) {
            throw new Error("children was a react component");
        }

        result[key] = createCheckboxTree(child);
    }

    return result;
};

interface CheckboxTreeProps {
    initialValue: InitialCheckboxTree;
    onChange(tree: CheckboxTree): void;
    value: CheckboxTree;
}

const CheckboxTreeSetting = ({ initialValue, onChange, value }: CheckboxTreeProps) => {
    const componentsToAdd: ReactNode[] = [],
        _ = createInternalTree(
            initialValue,
            value,
            (tree, key) => {
                if (typeof value === "boolean") {
                    onChange(tree);

                    return;
                }

                const newValue = { ...value };

                dot.str(key.split("#root#.")[1], tree, newValue);

                onChange(newValue);
            },
            componentsToAdd
        );

    return (
        <>
            {componentsToAdd.map((children, index) => (
                <div key={index}>{children}</div>
            ))}
        </>
    );
};

export default CheckboxTreeSetting;
