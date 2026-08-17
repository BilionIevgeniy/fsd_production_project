import webpack from 'webpack';

// Shared SVG-as-React-component loader rule, used by both the app webpack
// config (config/build/buildLoaders.ts) and the Storybook webpack config
// (config/storybook/main.ts), so the two stay in sync.
export function buildSvgLoader(): webpack.RuleSetRule {
  return {
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
  };
}
