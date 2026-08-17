import path from 'path';
import type { StorybookConfig } from '@storybook/core-common';
import { buildCssLoader } from '../loaders/cssLoader';

const storybookConfig: StorybookConfig = {
  stories: ['../../src/**/*.stories.mdx', '../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  // Storybook builds with its own webpack config, unaware of config/build/*.
  // Mirror the two settings stories actually need from there.
  webpackFinal: async (config) => {
    // Same absolute-import resolution as config/build/buildResolvers.ts,
    // tsconfig.json's baseUrl, and Jest's modulePaths.
    // Spread rather than mutate config.resolve/config.module in place — both
    // are optional on webpack's Configuration type, and Storybook's own
    // webpack5 defaults (e.g. resolve.extensions already covering .ts/.tsx)
    // live on those objects, so we extend them instead of assuming shape.
    config.resolve = {
      ...config.resolve,
      modules: [path.resolve(__dirname, '../../src'), 'node_modules'],
    };

    // Same CSS Modules setup as the scssLoader in config/build/buildLoaders.ts.
    config.module = {
      ...config.module,
      rules: [...(config.module?.rules ?? []), buildCssLoader(true)],
    };

    return config;
  },
};

export default storybookConfig;
