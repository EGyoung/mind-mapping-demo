const path = require("path");
const { srcPath } = require("./paths");

module.exports = {
  // 入口文件
  entry: {
    main: path.join(srcPath, "index.tsx"),
  },
  resolve: {
    // 定义了扩展名之后，在import文件时就可以不用写后缀名了，会按循序依次查找
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".less"],
    // 设置链接
    alias: {
      // 注意resolve方法开始的查找的路径是/
      "@": srcPath,
    },
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        // 匹配js/jsx ts/tsx
        test: /\.(ts|js)x?$/,
        // 排除node_modules
        include: srcPath,
        exclude: /node_modules/,
        use: [
          {
            // 确定使用的loader
            loader: "babel-loader",
            // 参数配置
            options: {
              presets: [
                [
                  // 预设polyfill
                  "@babel/preset-env",
                  {
                    // polyfill 只加载使用的部分
                    useBuiltIns: "usage",
                    // 使用corejs解析，模块化
                    corejs: "3",
                  },
                ],
                // 解析react
                "@babel/preset-react",
              ],
              // 使用transform-runtime，避免全局污染，注入helper
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
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
              publicPath: "/statics/",
            },
          },
        ],
      },
    ],
  },
};
