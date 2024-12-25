// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: ["expo"],
    plugins: [],
    rules: {
        "quotes": ["error", "double", { "avoidEscape": true }],
        "semi": ["error", "always"],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    ignorePatterns: [
        "node_modules/",
        "dist/",
        "build/",
    ],

};
