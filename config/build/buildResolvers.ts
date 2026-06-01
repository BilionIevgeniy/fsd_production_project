import webpack from 'webpack';
import { BuildOptions } from './types/config';

export const buildResolvers = (
  options: BuildOptions,
): webpack.ResolveOptions => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    // modules - where to look for modules
    modules: [options.paths.src, 'node_modules'],
  };
};
