import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildOptions, BuildPaths } from './config/build/types/config';
import path from 'path';

const paths: BuildPaths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  build: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  src: path.resolve(__dirname, 'src'),
};
const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isDev = mode === 'development';
const port = process.env.PORT ? Number(process.env.PORT) : 3006;

const options: BuildOptions = {
  mode,
  port,
  paths,
  isDev,
};

const config: webpack.Configuration = buildWebpackConfig(options);

export default config;
