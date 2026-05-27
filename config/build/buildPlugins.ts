import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';

export const buildPlugins = (
  options: BuildOptions,
): webpack.WebpackPluginInstance[] => {
  const { paths } = options;

  return [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    // Show progress bar during build
    new webpack.ProgressPlugin(),
  ];
};
