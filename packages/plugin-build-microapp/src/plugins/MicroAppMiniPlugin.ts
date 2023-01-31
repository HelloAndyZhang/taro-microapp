import MiniPlugin from '@tarojs/mini-runner/dist/plugins/MiniPlugin';
import { AppConfig } from '@tarojs/taro';
import {
  isEmptyObject,
  printLog,
  readConfig,
  processTypeEnum,
  resolveMainFilePath,
  normalizePath,
} from '@tarojs/helper';
import * as webpack from 'webpack';
import * as path from 'path';

function isLoaderExist(loaders, loaderName: string) {
  return loaders.some((item) => item.loader === loaderName);
}
interface subAppConfigs {
  [configName: string]: AppConfig;
}
interface AppPackage{
  name: string;
  packages: string[];
}
const PLUGIN_NAME = 'MicroAppMiniPlugin';
export default class MicroAppMiniPlugin extends MiniPlugin {
  [x: string]: any;
  appPackage:AppPackage ;
  subAppConfigs: subAppConfigs = {};
  PACKAGE_ENV = process.env.PACKAGE_ENV;
  constructor(public opts: any) {
    super(opts);
  }
  /**
   * 插件入口
   */
  apply(compiler: webpack.Compiler) {
    this.addLoader(compiler)
    super.apply(compiler);
  }
  /**
   * 分析 app 入口文件，搜集页面、组件信息，
   * 往 this.dependencies 中添加资源模块
   */
  run(compiler) {
    if (this.options.isBuildPlugin) {
      this.getPluginFiles();
      this.getConfigFiles(compiler);
    } else {
      this.appConfig = this.getAppConfig();
      this.getPackages();
      this.getPages();
      this.getPagesConfig();
      this.getDarkMode();
      this.getConfigFiles(compiler);
      this.addEntries();
    }
  }

  getPackages() {
    const { frameworkExts } = this.options;
    let packagesConfig = this.appConfig.packages;
    delete this.appConfig.packages;
    if (!packagesConfig) return;
    this.appPackage = packagesConfig.find((i) => i.name === this.PACKAGE_ENV) || packagesConfig;
    if (this.appPackage.packages.length === 0)
      return printLog(
        processTypeEnum.ERROR,
        '全局配置缺少 packages 字段，请检查！',
      );
    for (const item of this.appPackage.packages) {
      const filePath = resolveMainFilePath(
        path.join(this.options.sourceDir, item),
        frameworkExts,
      );
      const fileConfigPath = this.getConfigFilePath(filePath);
      if (!this.isWatch) {
        printLog(
          processTypeEnum.COMPILE,
          '发现应用',
          this.getShowPath(fileConfigPath),
        );
      }
      const fileConfig = readConfig(fileConfigPath);
      if (isEmptyObject(fileConfig)) {
        throw new Error(
          `${this.getConfigFilePath(item)}应用缺少 app 全局配置文件，请检查！`,
        );
      }
      this.subAppConfigs[this.getConfigFilePath(item)] = fileConfig;
    }
    this.getMergeAppConfig();
  }

  getMergeAppConfig() {
    for (const [filePath, appConfig] of Object.entries(this.subAppConfigs)) {
      const packagePath = filePath.replace('app.config', '');
      const packageName = packagePath.replace('/', '')
      if (!this.isWatch) {
        printLog(
          processTypeEnum.COMPILE,
          '合并配置',
          packageName,
        );
      }
      for (let config in appConfig) {
        // 合并pages
        if (config === 'pages') {
            for (let i of appConfig.pages as string[]) {
              this.appConfig.pages.push(normalizePath(path.join(packagePath, i)));
            }
          continue;
        }
        // 合并 subPackages
        if (config === 'subPackages') {
          for (let i of appConfig.subPackages as any) {
            i.root = normalizePath(path.join(packagePath, i.root));
            this.appConfig.subPackages.push(i);
          }
          continue;
        }
        //把打包的应用其他信息合并至壳子
        if (filePath.includes(this.PACKAGE_ENV || '')) {
          this.appConfig[config] = Object.assign(
            this.appConfig[config] || appConfig[config],
            appConfig[config],
          );
        }
      }
    }
  }
  addLoader(compiler) {
    // 添加 loader 时  数据修改无法修改
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.buildModule.tap(PLUGIN_NAME,(module)=>{
        if (module.miniType == 'ENTRY') {
          console.log('0000')
          const loaderName = require.resolve("@taro-microapp/loader-with-app");
          if (!isLoaderExist(module.loaders, loaderName)) {
            module.loaders.push({
              loader: loaderName,
              options: {
                appPackages: this.appPackage.packages,
              },
            });
            console.log(module.loaders)
          }
        }
      })
      compilation.hooks.normalModuleLoader.tap(
        PLUGIN_NAME,
        (_loaderContext, module: /** TaroNormalModule */ any) => {
          if (module.miniType == 'ENTRY') {
            console.log('111')
            console.log(module.loaders)
            const loaderName = require.resolve("@taro-microapp/loader-with-app");
            if (!isLoaderExist(module.loaders, loaderName)) {
              module.loaders.unshift({
                loader: loaderName,
                options: {
                  appPackages: this.appPackage.packages,
                },
              });
              console.log(module.loaders)
            }
          }
        },
      );
    });
  }
}
