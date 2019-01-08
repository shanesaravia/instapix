const HtmlWebPackPlugin = require("html-webpack-plugin");

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
      }
    ]
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
  plugins: [htmlPlugin]
};