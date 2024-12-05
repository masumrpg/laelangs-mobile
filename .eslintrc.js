// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: ["expo"],
    plugins: [],
    rules: {
        "quotes": ["error", "double", { "avoidEscape": true }],
        "semi": ["error", "always"],
        "import/no-extraneous-dependencies": false,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    ignorePatterns: ["/dist/*"],
};
