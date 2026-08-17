import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Shared CSS Modules loader rule for *.scss, used by both the app webpack
// config (config/build/buildLoaders.ts) and the Storybook webpack config
// (config/storybook/main.ts), so the two stay in sync.
export function buildCssLoader(isDev?: boolean): webpack.RuleSetRule {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local',
            // auto - automatically apply unique class names to files with .module.* extension
            auto: (resourcePath: string) => resourcePath.endsWith('.module.scss'),
            localIdentName: isDev ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };
}
