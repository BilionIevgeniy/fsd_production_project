import type { Configuration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export const buildDevServer = (options: BuildOptions): Configuration => {
  const { port, isDev } = options;

  return {
    port,
    open: isDev,
    // historyApiFallback - open pages through react router after refresh
    historyApiFallback: true,
    // hot - force reload page without refresh when changes in files occur
    hot: true,
  };
};
