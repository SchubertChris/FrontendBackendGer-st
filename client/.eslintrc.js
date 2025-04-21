module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended', // Prettier mit ESLint kombinieren
    ],
    rules: {
        'prettier/prettier': 'error',
        // Deine anderen ESLint-Regeln hier
    },
};
