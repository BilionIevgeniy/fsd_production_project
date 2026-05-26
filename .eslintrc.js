module.exports = {
  // Define the environment in which the code will run
  env: {
    browser: true, // Adds browser global variables (window, document, etc.)
    es2021: true, // Adds all ECMAScript 2021 global variables
    jest: true, // Adds Jest global variables for testing
  },
  // Configurations that extend the set of rules
  extends: [
    'eslint:recommended', // Basic recommended ESLint rules
    'plugin:react/recommended', // Recommended rules for React
    'plugin:react-hooks/recommended', // Recommended rules for React Hooks
    'plugin:@typescript-eslint/recommended', // Recommended rules for TypeScript from ESLint
    'airbnb', // Popular Airbnb rule set for JS
    'airbnb-typescript', // Airbnb rules for TypeScript
    'plugin:prettier/recommended', // Important: Disables conflicting ESLint rules and enables the prettier/prettier rule
  ],
  // Parser that ESLint will use to analyze the code
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  // Parser options
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allow parser to understand JSX
    },
    ecmaVersion: 'latest', // ECMAScript version
    sourceType: 'module', // Allows using imports/exports
    project: './tsconfig.json', // Path to tsconfig.json file for TypeScript rules
    tsconfigRootDir: __dirname,
  },
  // Plugins that add extra rules or functionality
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next', // Plugin for working with i18next
    'prettier', // Prettier plugin for ESLint
  ],
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // Always try to resolve types from TypeScript
        project: path.resolve(__dirname, 'tsconfig.json'),
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    // === Formatting-related rules delegated to Prettier ===
    // Delegate all formatting rules to Prettier.
    // Prettier will automatically use configuration from .prettierrc.json
    'prettier/prettier': 'error',
    indent: 'off', // Disable standard ESLint indent rule as Prettier handles it
    'react/jsx-indent': 'off', // Disable as Prettier manages this
    'react/jsx-indent-props': 'off', // Disable as Prettier manages this
    'linebreak-style': 'off', // Prettier also manages line breaks

    // === Common rules you often configure ===
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // Allow warn, error, info
    'import/prefer-default-export': 'off', // Do not require default export
    'no-underscore-dangle': 'off', // Allow dangling underscores (e.g., _id)
    'react/jsx-props-no-spreading': 'off', // Allow using spread operator for props
    'react/require-default-props': 'off', // Do not require defaultProps for optional props (less relevant for TS)
    // 'jsx-a11y/no-static-element-interactions': 'off', // Disable if there is a need to use click/keypress on non-interactive elements
    // 'jsx-a11y/click-events-have-key-events': 'off', // Disable if necessary
    'react/react-in-jsx-scope': 'off', // Disable for React 17+ (new JSX Transform)
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], // Allow JSX in .ts and .tsx files
    'import/extensions': [
      // Allow imports without specifying extensions for certain file types
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'max-len': [
      // Maximum line length
      'warn',
      {
        code: 120, // Maximum code length
        tabWidth: 4, // Tab width for length calculation. Must match .prettierrc.json
        comments: 120, // Maximum comment length
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'max-classes-per-file': ['error', 3], // Maximum number of classes per file (can be configured as desired)

    // === TypeScript-specific rules ===
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Do not require explicit return types for exported functions
    '@typescript-eslint/no-explicit-any': 'warn', // Warn about using 'any'
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused variables (ignore those starting with _)
    // Airbnb rule that conflicts with TypeScript and should be disabled
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'], // Use no-shadow version from TypeScript ESLint

    // === Rules that can be disabled when using TypeScript ===
    // Disable as TypeScript provides type checking
    'react/prop-types': 'off',
    'react/button-has-type': 'off',

    // === Rule for component definition ===
    // Allow using both function declaration and arrow functions for components
    'react/function-component-definition': [
      'error',
      { namedComponents: ['function-declaration', 'arrow-function'] },
    ],

    // === Rule for import/no-extraneous-dependencies ===
    'import/no-extraneous-dependencies': [
      'error',
      {
        // Allow importing devDependencies in files that do not go into prod build
        devDependencies: [
          './webpack.config.ts', // Allow for root Webpack config
          '**/.storybook/**', // Allow for Storybook configs
          '**/config/**', // all files in config folder (webpack, jest, storybook)
          '**/*.test.{ts,tsx}', // all test files
          '**/*.stories.{ts,tsx}', // all story files for storybook
        ],
      },
    ],
    'i18next/no-literal-string': [
      'error',
      { markupOnly: true, ignoreAttribute: ['to', 'target', 'path'] },
    ],
  },
  globals: {
    __IS_DEV__: true,
  },
  overrides: [
    {
      // Disable rules requiring type information for configuration files
      files: ['./.eslintrc.js', './webpack.config.ts', './config/**/*.ts'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
};
