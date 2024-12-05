// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: ["expo"],
    plugins: [],
    rules: {
        "quotes": ["error", "double", { "avoidEscape": true }],
        "semi": ["error", "always"],
        "func-style": ["error", "declaration", { "allowArrowFunctions": false }],
        "no-restricted-exports": ["error", {
            "restrictDefaultExports": {
                "defaultPropsLast": true,
                "namedExport": true,
            },
        }],

        "import/prefer-default-export": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    ignorePatterns: ["/dist/*"],
};
