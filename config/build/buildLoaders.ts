import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  // order matters! webpack processes loaders from bottom to top

  // TypeScript loader for .ts and .tsx files
  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  // SCSS loader for styling
  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local',
            // auto - automatically apply unique class names to files with .module.* extension
            auto: (resourcePath: string) => resourcePath.endsWith('.module.scss'),
            localIdentName: options.isDev ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  // SVG loader for SVG files - converts SVG to React components
  const svgLoader = {
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
  };

  // File loader for other file types (images, fonts, etc.)
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  return [fileLoader, svgLoader, tsLoader, scssLoader];
};
