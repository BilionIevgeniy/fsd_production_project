import path from 'path';
import type { StorybookConfig } from '@storybook/core-common';
import type { RuleSetRule } from 'webpack';
import { buildCssLoader } from '../loaders/cssLoader';
import { buildSvgLoader } from '../loaders/svgLoader';

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

    // Storybook's own webpack5 preset already ships a rule that sends .svg
    // through asset/resource (emits a file, imports resolve to a URL string) —
    // that's what was turning `import Icon from '*.svg'` into a plain path
    // and blowing up `<Icon />` with "createElement: invalid tag name".
    // Exclude .svg from it so our svgLoader (below) is the only one handling it.
    const rules = config.module?.rules ?? [];
    const defaultSvgRule = rules.find(
      (rule): rule is RuleSetRule =>
        !!rule && typeof rule === 'object' && rule.test instanceof RegExp && rule.test.test('.svg'),
    );
    if (defaultSvgRule) {
      defaultSvgRule.exclude = /\.svg$/i;
    }

    // Same CSS Modules and SVG-as-React-component setup as config/build/buildLoaders.ts.
    config.module = {
      ...config.module,
      rules: [...rules, buildCssLoader(true), buildSvgLoader()],
    };

    return config;
  },
};

export default storybookConfig;
