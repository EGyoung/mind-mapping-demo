const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "..", "./src/index.tsx"),
  },
  resolve: {
    // 定义了扩展名之后，在import文件时就可以不用写后缀名了，会按循序依次查找
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".less"],
    // 设置链接
    alias: {
      // 注意resolve方法开始的查找的路径是/
      "@": path.resolve(__dirname, "..", "./src"),
    },
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.svg$/,
        include: /assets[\/\\]svgs/,
        use: ["svg-sprite-loader"],
      },
      {
        test: /\.svg$/,
        exclude: /(assets[\/\\]svgs)/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./public/index.html"),
    }),
  ],
  devtool: "source-map",
  devServer: {
    port: 3003,
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩
    client: {
      progress: true,
    },
    historyApiFallback: true,
  },
});
