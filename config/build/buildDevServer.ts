import type { Configuration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export const buildDevServer = (options: BuildOptions): Configuration => {
  const { port, isDev } = options;

  return {
    port,
    open: isDev,
  };
};
