const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // 或 'production'，根据需要选择
  entry: './src/index.js', // 入口文件路径修正
  output: {
    path: path.resolve(__dirname, 'build'), // 输出目录改为 'build'
    filename: 'bundle.js',
    publicPath: '/' // 添加这一行以便正确处理路由
  },
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "url": require.resolve("url"),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 正则表达式修正
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  }
};
