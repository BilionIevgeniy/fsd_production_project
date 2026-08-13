const path = require('path');

module.exports = {
  "stories": [
    "../../src/**/*.stories.mdx",
    "../../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  // Storybook builds with its own webpack config, unaware of config/build/*.
  // Mirror the two settings stories actually need from there.
  webpackFinal: async (config) => {
    // Same absolute-import resolution as config/build/buildResolvers.ts,
    // tsconfig.json's baseUrl, and Jest's modulePaths.
    config.resolve.modules = [
      path.resolve(__dirname, '../../src'),
      'node_modules',
    ];

    // Same CSS Modules setup as the scssLoader in config/build/buildLoaders.ts.
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              auto: (resourcePath) => resourcePath.endsWith('.module.scss'),
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
    });

    return config;
  },
}
