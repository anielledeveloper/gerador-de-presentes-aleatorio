const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'newtab/newtab': './src/newtab/newtab.ts',
    'background/background': './src/background/background.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'styles/[name].[ext]'
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'manifest.json',
          to: 'manifest.json'
        },
        {
          from: 'icons',
          to: 'icons'
        },
        {
          from: 'src/newtab/newtab.html',
          to: 'newtab.html'
        },
        {
          from: 'src/styles/style.css',
          to: 'styles/style.css'
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
