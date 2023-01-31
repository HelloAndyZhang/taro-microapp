const path = require('path')
const config = {
  projectName: "taro-shell",
  date: "2022-9-13",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {},
  plugins: [ '@taro-microapp/plugin-build-microapp', '@taro-microapp/plugin-project-config', ['@taro-microapp/plugin-inject']],
  copy: {
    patterns: [],
    options: {},
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  framework: "react",

  mini: {
    optimizeMainPackage: {
      enable: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    commonChunks(commonChunks) {
      commonChunks.push('JiaZheng/common')
      return commonChunks
    },
    webpackChain(chain, webpack) {
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              'JiaZheng/common': {
                name: 'JiaZheng/common',
                priority: 10,
                test(module) {
                  const reg = /src[\\/]JiaZheng[\\/]((?!.config).)*\.js$/
                  return reg.test(module.resource)
                }
              }
            }
          }
        },
      })
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
