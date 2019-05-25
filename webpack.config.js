const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' })
}

module.exports = (env) => {
  const isProd = env === 'production'
  const bundleAnalyzer = !isProd ? [new BundleAnalyzerPlugin()] : []

  return {
    mode: isProd ? 'production' : 'development',
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      publicPath: '/',
      filename: '[name].[contenthash].js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: !isProd }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: !isProd }
          }
        ]
      }]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|firebase|)[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({template: path.join(__dirname, 'public', 'index.html')}),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      }),
      new CompressionPlugin({
        filename: '[path].br',
        algorithm: 'brotliCompress',
        compressionOptions: { level: 11 },
        test: /\.js$|\.css$|\.html$/,
        minRatio: Number.MAX_SAFE_INTEGER
      }),
      ...bundleAnalyzer
    ],
    devtool: isProd ? '(none)' : 'inline-source-map',
    devServer: {
      contentBase: [path.join(__dirname, 'public', 'dist'), path.join(__dirname, 'public')],
      historyApiFallback: true,
      publicPath: '/'
    }
  }
}
