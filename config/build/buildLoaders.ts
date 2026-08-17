import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from '../loaders/cssLoader';

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  // order matters! webpack processes loaders from bottom to top

  // TypeScript loader for .ts and .tsx files
  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  // SCSS loader for styling
  const scssLoader = buildCssLoader(options.isDev);

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
