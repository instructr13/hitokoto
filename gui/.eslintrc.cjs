module.exports = {
    env: {
        browser: true,
        node: true
        // jest: true,
    },
    extends: ["eslint:recommended", "plugin:eslint-comments/recommended"],
    ignorePatterns: ["vite.config.ts"],
    overrides: [
        {
            extends: [
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:import/typescript"
            ],
            files: ["**.ts{,x}"],
            plugins: ["chakra-ui"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: {
                    jsx: true
                },
                project: ["./tsconfig.json"],
                tsconfigRootDir: __dirname
            },
            rules: {
                "@typescript-eslint/array-type": [
                    "error",
                    {
                        default: "array-simple"
                    }
                ],
                "@typescript-eslint/ban-tslint-comment": "error",
                "@typescript-eslint/consistent-indexed-object-style": ["error", "index-signature"],
                "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
                "@typescript-eslint/consistent-type-imports": [
                    "error",
                    {
                        disallowTypeAnnotations: false,
                        prefer: "type-imports"
                    }
                ],
                "@typescript-eslint/default-param-last": "error",
                "@typescript-eslint/explicit-member-accessibility": [
                    "error",
                    {
                        accessibility: "explicit"
                    }
                ],
                "@typescript-eslint/lines-between-class-members": [
                    "error",
                    {
                        exceptAfterOverload: true
                    }
                ],
                "@typescript-eslint/method-signature-style": ["error", "method"],
                "@typescript-eslint/no-confusing-non-null-assertion": "error",
                "@typescript-eslint/no-confusing-void-expression": "error",
                "@typescript-eslint/no-duplicate-imports": [
                    "error",
                    {
                        includeExports: false
                    }
                ],
                "@typescript-eslint/no-invalid-this": "error",
                "@typescript-eslint/no-meaningless-void-operator": "error",
                "@typescript-eslint/no-misused-promises": [
                    "error",
                    {
                        checksVoidReturn: false
                    }
                ],
                "@typescript-eslint/no-require-imports": "error",
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
                "@typescript-eslint/no-unnecessary-condition": "error",
                "@typescript-eslint/no-unnecessary-qualifier": "error",
                "@typescript-eslint/no-unnecessary-type-arguments": "error",
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
                "@typescript-eslint/no-unused-expressions": "error",
                "@typescript-eslint/no-unused-vars": "off",
                "@typescript-eslint/non-nullable-type-assertion-style": "error",
                "@typescript-eslint/padding-line-between-statements": [
                    "error",
                    {
                        blankLine: "always",
                        next: "*",
                        prev: ["block", "block-like"]
                    },
                    {
                        blankLine: "always",
                        next: "export",
                        prev: "block"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "const"
                    },
                    {
                        blankLine: "never",
                        next: "singleline-const",
                        prev: "singleline-const"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "let"
                    },
                    {
                        blankLine: "never",
                        next: "singleline-let",
                        prev: "singleline-let"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "var"
                    },
                    {
                        blankLine: "never",
                        next: "singleline-var",
                        prev: "singleline-var"
                    },
                    {
                        blankLine: "always",
                        next: ["interface", "type"],
                        prev: "*"
                    },
                    {
                        blankLine: "never",
                        next: ["exports", "require"],
                        prev: ["exports", "require"]
                    },
                    {
                        blankLine: "always",
                        next: ["return", "continue", "break", "throw"],
                        prev: "*"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "directive"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: ["case", "default"]
                    }
                ],
                "@typescript-eslint/prefer-includes": "error",
                "@typescript-eslint/prefer-reduce-type-parameter": "error",
                "@typescript-eslint/prefer-regexp-exec": "error",
                "@typescript-eslint/prefer-return-this-type": "error",
                "@typescript-eslint/prefer-string-starts-ends-with": "error",
                "@typescript-eslint/prefer-ts-expect-error": "error",
                "@typescript-eslint/promise-function-async": "error",
                "@typescript-eslint/return-await": "error",
                "@typescript-eslint/sort-type-union-intersection-members": "error",
                "chakra-ui/props-order": "error",
                "chakra-ui/props-shorthand": "error",
                "chakra-ui/require-specific-component": "error"
            }
        },
        {
            env: {
                node: true
            },
            extends: [
                "plugin:import/recommended",
                "plugin:react/recommended",
                "plugin:react-hooks/recommended",
                "plugin:react/jsx-runtime",
                "plugin:unicorn/recommended"
            ],
            files: ["**.{js,ts}{,x}"],
            parserOptions: {
                sourceType: "module"
            },
            plugins: [
                "react",
                "sort-class-members",
                "sort-destructure-keys",
                "sort-keys-fix",
                "unicorn",
                "unused-imports"
            ],
            rules: {
                "block-spacing": "error",
                "constructor-super": "error",
                "default-case-last": "error",
                eqeqeq: "error",
                "for-direction": "error",
                "func-style": ["error", "expression"],
                "import/order": [
                    "error",
                    {
                        alphabetize: {
                            order: "asc"
                        },
                        groups: ["builtin", "external", "parent", "sibling", "index", "object", "type"],
                        "newlines-between": "always",
                        pathGroups: [
                            {
                                group: "parent",
                                pattern: "@/**",
                                position: "before"
                            }
                        ]
                    }
                ],
                "lines-between-class-members": "error",
                "new-parens": "error",
                "no-alert": "error",

                // For web apps
                "no-console": "warn",

                "no-div-regex": "error",
                "no-extra-bind": "error",
                "no-label-var": "error",
                "no-lone-blocks": "error",
                "no-lonely-if": "error",
                "no-mixed-spaces-and-tabs": "off",
                "no-multi-assign": "error",
                "no-multi-str": "error",
                "no-nested-ternary": "off",
                "no-new-func": "error",
                "no-new-object": "error",
                "no-octal-escape": "error",
                "no-param-reassign": "error",

                // For web apps
                "no-process-exit": "error",

                "no-proto": "error",
                "no-return-assign": "error",
                "no-script-url": "error",
                "no-self-compare": "error",
                "no-sequences": "error",
                "no-throw-literal": "error",
                "no-undef-init": "error",
                "no-unmodified-loop-condition": "error",
                "no-unneeded-ternary": "error",

                "no-useless-call": "error",
                "no-useless-computed-key": "error",
                "no-useless-concat": "error",
                "no-useless-constructor": "error",
                "no-useless-rename": "error",
                "no-useless-return": "error",
                "no-var": "error",
                "no-warning-comments": "warn",
                "node/no-missing-import": "off",
                "nonblock-statement-body-position": ["error", "below"],
                "object-shorthand": "error",
                "one-var": [
                    "error",
                    {
                        const: "consecutive",
                        let: "consecutive",
                        separateRequires: true,
                        var: "consecutive"
                    }
                ],
                "operator-assignment": "error",
                "operator-linebreak": "error",
                "prefer-arrow-callback": [
                    "error",
                    {
                        allowNamedFunctions: true
                    }
                ],
                "prefer-const": [
                    "error",
                    {
                        destructuring: "all",
                        ignoreReadBeforeAssign: false
                    }
                ],
                "prefer-destructuring": "error",
                "prefer-exponentiation-operator": "error",
                "prefer-object-spread": "error",
                "prefer-promise-reject-errors": "error",
                "prefer-regex-literals": "error",
                "prefer-rest-params": "error",
                "prefer-spread": "error",
                "prefer-template": "error",
                "quote-props": [
                    "error",
                    "as-needed",
                    {
                        keywords: true,
                        numbers: false,
                        unnecessary: false
                    }
                ],
                radix: "error",
                "react/destructuring-assignment": ["error", "always"],
                "react/function-component-definition": ["error", { namedComponents: "arrow-function" }],
                "react/hook-use-state": "error",
                "react/jsx-boolean-value": ["error", "never"],
                "react/jsx-child-element-spacing": "off",
                "react/jsx-closing-bracket-location": "off",
                "react/jsx-closing-tag-location": "off",
                "react/jsx-curly-brace-presence": [
                    "error",
                    { props: "never", children: "never", propElementValues: "always" }
                ],
                "react/jsx-curly-newline": "off",
                "react/jsx-curly-spacing": "off",
                "react/jsx-equals-spacing": "off",
                "react/jsx-fragments": ["error", "syntax"],
                "react/jsx-filename-extrntion": "off",
                "react/jsx-first-prop-new-line": "off",
                "react/jsx-indent": "off",
                "react/jsx-indent-props": "off",
                "react/jsx-max-props-per-line": "off",
                "react/jsx-no-leaked-render": "error",
                "react/jsx-no-useless-fragment": "error",
                "react/jsx-one-expression-per-line": "off",
                "react/jsx-props-no-multi-spaces": "off",
                "react/jsx-space-before-closing": "off",
                "react/jsx-tag-spacing": "off",
                "react/jsx-wrap-multilines": "off",

                "require-yield": "error",
                "rest-spread-spacing": ["error", "never"],
                "sort-class-members/sort-class-members": [
                    "error",
                    {
                        accessorPairPositioning: "getThenSet",
                        order: [
                            "[static-properties]",
                            "[static-methods]",
                            "[properties]",
                            "[conventional-private-properties]",
                            "constructor",
                            "[methods]",
                            "[conventional-private-methods]"
                        ]
                    }
                ],
                "sort-destructure-keys/sort-destructure-keys": [
                    "error",
                    {
                        caseSensitive: false
                    }
                ],
                "sort-keys-fix/sort-keys-fix": "error",
                "unicorn/prefer-module": "off",
                "unicorn/prevent-abbreviations": "off",
                "unused-imports/no-unused-imports": "error",
                "unused-imports/no-unused-vars": [
                    "error",
                    {
                        args: "after-used",
                        argsIgnorePattern: "^_",
                        caughtErrors: "all",
                        caughtErrorsIgnorePattern: "^_",
                        destructuredArrayIgnorePattern: "^_",
                        vars: "local",
                        varsIgnorePattern: "^_"
                    }
                ],
                "wrap-iife": ["error", "inside"],
                "wrap-regex": "error",
                yoda: "error"
            }
        },
        {
            env: {
                es6: true
            },
            files: ["*.js{,x}"],
            rules: {
                "default-param-last": ["error"],
                "lines-between-class-members": "error",
                "no-array-constructor": "error",
                "no-duplicate-imports": [
                    "error",
                    {
                        includeExports: false
                    }
                ],
                "no-extra-parens": [
                    "error",
                    "all",
                    {
                        conditionalAssign: false,
                        enforceForFunctionPrototypeMethods: false,
                        ignoreJSX: "multi-line",
                        nestedBinaryExpressions: false,
                        returnAssign: false
                    }
                ],
                "no-implied-eval": "error",
                "no-invalid-this": "error",
                "no-shadow": [
                    "error",
                    {
                        builtinGlobals: true
                    }
                ],
                "no-unused-expressions": "error",
                "no-unused-vars": "off",
                "no-void": "error",
                "padding-line-between-statements": [
                    "error",
                    {
                        blankLine: "always",
                        next: "*",
                        prev: ["block", "block-like"]
                    },
                    {
                        blankLine: "always",
                        next: "export",
                        prev: "block"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "const"
                    },
                    {
                        blankLine: "never",
                        next: "singleline-const",
                        prev: "singleline-const"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "let"
                    },
                    {
                        blankLine: "never",
                        next: "singleline-let",
                        prev: "singleline-let"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "var"
                    },
                    {
                        blankLine: "never",
                        next: "singleline-var",
                        prev: "singleline-var"
                    },
                    {
                        blankLine: "never",
                        next: ["cjs-export", "cjs-import"],
                        prev: ["cjs-export", "cjs-import"]
                    },
                    {
                        blankLine: "always",
                        next: ["return", "continue", "break", "throw"],
                        prev: "*"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "directive"
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: ["case", "default"]
                    }
                ],
                "require-await": "error"
            }
        },
        {
            files: ["next-env.d.ts"],
            plugins: ["unicorn"],
            rules: {
                "unicorn/no-empty-file": "off"
            }
        },
        {
            files: ["src/components/**/*.tsx"],
            plugins: ["unicorn"],
            rules: {
                "unicorn/filename-case": "off"
            }
        },
        {
            files: ["./*{rc,.config}.js"],
            rules: {
                "quote-props": "off"
            }
        }
    ],
    root: true,
    rules: {
        "space-before-blocks": "error",
        "spaced-comment": [
            "error",
            "always",
            {
                block: {
                    exceptions: ["*"]
                },
                line: {
                    exceptions: ["-"],
                    markers: ["/"]
                }
            }
        ]
    },
    settings: {
        "import/core-modules": ["~react-pages"],
        "import/ignore": [".*@chakra-ui.*"],
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: ["tsconfig.json"]
            }
        },
        react: {
            version: "detect"
        }
    }
};
