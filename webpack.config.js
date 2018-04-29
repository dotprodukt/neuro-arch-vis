const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const defaultLoaders = [{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
}];

const jsRule = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader']
};

const tsRule = {
  test: /\.(ts|tsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader','ts-loader']
};


const extractLess = new ExtractTextPlugin({
  filename: "[name].css"
});

const lessRule = {
  test: /\.(css|less)$/,
  use: extractLess.extract({ use:['css-loader','less-loader']})
};

const imageRule = {
  test: /\.(png|jpg|gif|svg)$/,
  use: ['url-loader']
};

const fontRule = {
  test: /\.(ttf|eot|woff|woff2)$/,
  use: ['url-loader']
};

const cleaner = new CleanWebpackPlugin(['build/']);

module.exports = [{
  target: 'web',
  context: __dirname,
  entry: {
    vendor : ['react','react-dom'],
    index : "./src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname,"dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js','.json','.jsx','.ts', '.tsx']
  },
  module: {
    rules: [jsRule,tsRule,lessRule,imageRule,fontRule]
  },
  plugins: [
    //cleaner,
    new webpack.optimize.CommonsChunkPlugin({ name:"vendor", filename:"vendor.js" }),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs"
    }),
    extractLess
  ]
}];