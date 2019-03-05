const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.html$/,
        use: { loader: "html-loader" }
      },
      {
      test: /\.(gif|svg|jpg|png)$/,
      use: {loader: "file-loader"}
      },
      {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    // contentBase: './',
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 1000
    // }
  },
  devtool: '#eval-source-map',
  plugins: [htmlPlugin],
  resolve: {
    alias: {
      static: path.resolve(__dirname, './static'),
      configs: path.resolve(__dirname, './configs'),
      components: path.resolve(__dirname, './src/components'),
      containers: path.resolve(__dirname, './src/containers'),
      src: path.resolve(__dirname, './src')
    }
  }
};