/*
 * @Autor: 邓易
 * @Date: 2020-10-20 11:56:46
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-31 15:36:34
 */
// 导入compression-webpack-plugin
const webpack = require("webpack");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const APP_MODEL = {
  guandi_dev: "https://dev.cninct.com/GUANDI_DEV",
  guandi: "https://build.cninct.com/GUANDI",
  mixin_dev: "https://dev.cninct.com/STD2021_DEV",
  mixin: "https://build.cninct.com/STD2021_DEV",
  pmai_dev: "https://dev.cninct.com/PMAI_DEV",
  pmai: "https://build.cninct.com/PMAI",
};
module.exports = {
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构件。
  productionSourceMap: false,
  publicPath: "./",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@comp", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@common", resolve("src/common"))
      .set("@layout", resolve("src/layout"));
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");

    // 生产环境取消 console.log
    // if (process.env.NODE_ENV === "production") {
    //   config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    // }
    //修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
    config.plugin("html").tap(args => {
      args[0].title = "";
      args[0].BaseUrl = APP_MODEL[process.env.VUE_APP_MODE];
      return args;
    });
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        api: ["@/api/index", "default"],
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        // 要用less或者scss公用变量之类的，这样写就不用每个页面去引用一次
        prependData: `@import "~@/assets/css/theme.scss";`,
      },
    },
  },
  lintOnSave: false,
  devServer: {
    proxy: {
      "/PMAI_AIP_DEV": {
        target: "https://dev.cninct.com", //源地址
        ws: true,
        changeOrigin: true,
      },
    },
    port: "8088",
    // https: true,
  },
};
