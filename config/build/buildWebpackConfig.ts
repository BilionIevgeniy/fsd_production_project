import webpack from 'webpack';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';
import { buildDevServer } from './buildDevServer';

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths, isDev } = options;
  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    //   plugins - additional functionality for webpack
    plugins: buildPlugins(options),
    module: {
      //   rules - for processing files(ts, js, css, scss, svg, etc).
      rules: buildLoaders(options),
    },
    //   resolve - help to write import without extensions (.ts, .tsx, .js, etc.)
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: buildDevServer(options),
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
