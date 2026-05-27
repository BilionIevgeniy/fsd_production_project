import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  module: {
    //   rules - rules for processing files(ts, js, css, scss, svg, etc).
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  //   resolve - help to write import 'components/Button' instead of 'components/Button.tsx'
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  //   plugins - additional functionality for webpack
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    // Show progress bar during build
    new webpack.ProgressPlugin(),
  ],
};

export default config;
