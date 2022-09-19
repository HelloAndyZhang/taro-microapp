import MiniPlugin from '@tarojs/mini-runner/dist/plugins/MiniPlugin'
import { AppConfig } from '@tarojs/taro'
import {
  isEmptyObject,
  printLog,
  readConfig,
  processTypeEnum,
  resolveMainFilePath,
} from '@tarojs/helper'

import * as path from 'path'


interface AppConfigs {
  [configName: string]: AppConfig
}
const PLUGIN_NAME = 'MicroAppMiniPlugin'
export default class MicroAppMiniPlugin extends MiniPlugin {
  [x: string]: any
  appConfigs: AppConfigs = {}
  PACKAGE_ENV = process.env.PACKAGE_ENV
  constructor(opts: any) {
    super(opts)
  }

  /**
   * 分析 app 入口文件，搜集页面、组件信息，
   * 往 this.dependencies 中添加资源模块
   */
  run(compiler) {
    if (this.options.isBuildPlugin) {
      this.getPluginFiles()
      this.getConfigFiles(compiler)
    } else {
      this.appConfig = this.getAppConfig()
      this.getPackages()
      this.getPages()
      this.getPagesConfig()
      this.getDarkMode()
      this.getConfigFiles(compiler)
      this.addEntries()
    }
    // compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
    //   // compilation.hooks.optimizeChunkAssets.tap(PLUGIN_NAME, (chunks) => {
    //   //   console.log(chunks)
    //   // });
    //   compilation.hooks.normalModuleLoader.tap(PLUGIN_NAME, (_loaderContext, module:/** TaroNormalModule */ any) => {
    //     if(module.miniType  == "ENTRY"){
    //       // console.log(module)
    //     }
    //   })


    // });
  }

  getPackages() {
    const { frameworkExts } = this.options
    let appPackages = this.appConfig.packages
    if (!appPackages) return
    delete this.appConfig.packages
    let packages = appPackages.find((i) => i.name === this.PACKAGE_ENV)
    if (packages) appPackages = packages.packages
    if (appPackages.length === 0) return printLog(processTypeEnum.ERROR, '全局配置缺少 packages 字段，请检查！')
    for (const item of appPackages) {
      const filePath = resolveMainFilePath(path.join(this.options.sourceDir, item), frameworkExts)
      const fileConfigPath = this.getConfigFilePath(filePath)
      if (!this.isWatch) {
        printLog(processTypeEnum.COMPILE, '发现应用', this.getShowPath(fileConfigPath))
      }
      const fileConfig = readConfig(fileConfigPath)
      if (isEmptyObject(fileConfig)) {
        throw new Error(`${this.getConfigFilePath(item)}应用缺少 app 全局配置文件，请检查！`)
      }
      this.appConfigs[this.getConfigFilePath(item)] = fileConfig
    }
    this.getMergeAppConfig()
  }

  getMergeAppConfig() {
    for (const [filePath, appConfig] of Object.entries(this.appConfigs)) {
      let packagePath = filePath.replace('app.config', '')
      if (!this.isWatch) {
        printLog(processTypeEnum.COMPILE, '合并配置', packagePath.replace('/',''))
      }
      for (let config in appConfig) {
        // 合并pages
        if (config === 'pages') {
          for (let i of appConfig.pages as string[]) {
            this.appConfig.pages.push(path.join(packagePath, i))
          }
          continue
        }
        // 合并 subPackages
        if (config === 'subPackages') {
          for (let i of appConfig.subPackages as any) {
            i.root = path.join(packagePath, i.root)
            this.appConfig.subPackages.push(i)
          }
          continue
        }
        //把打包的应用其他信息合并至壳子
        if (filePath.includes(this.PACKAGE_ENV || '')) {
          this.appConfig[config] = Object.assign((this.appConfig[config] || appConfig[config]), appConfig[config])
        }
      }
    }
  }
}
