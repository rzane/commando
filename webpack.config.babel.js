import { paths, env } from './config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const webpackConfig = {
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    paths.client('app.js')
  ],

  output: {
    filename: 'app.js',
    path: paths.public()
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: env.development
          ? ['es2015', 'stage-0', 'react', 'react-hmre']
          : ['es2015', 'stage-0', 'react']
      }
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: paths.client('index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};

if (env.development) {
  webpackConfig.devtool = 'source-map';

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

export default webpackConfig;