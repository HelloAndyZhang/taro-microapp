import MiniPlugin from '@tarojs/mini-runner/dist/plugins/MiniPlugin'
import { AppConfig, Config } from '@tarojs/taro'
import {
  isEmptyObject,
  printLog,
  readConfig,
  promoteRelativePath,
  processTypeEnum,
  resolveMainFilePath,
} from '@tarojs/helper'
import * as webpack from 'webpack'
import { PrerenderConfig, validatePrerenderPages } from '@tarojs/mini-runner/dist/prerender/prerender'


import { componentConfig } from '@tarojs/mini-runner/dist/template/component'
import * as path from 'path'


interface AppConfigs {
  [configName: string]: AppConfig
}
export default class BuildMicroAppPlugin extends MiniPlugin {
  appConfigs:AppConfigs={}
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
      this.getPackagePages()

      this.getPages()

      this.getPagesConfig()
      this.getDarkMode()
      this.getConfigFiles(compiler)
      this.addEntries()
    }
  }

  getPackages() {
    const { frameworkExts, prerender } = this.options
    const appPackages = this.appConfig.packages
    if(!appPackages) return
    delete this.appConfig.packages
    for (const item of appPackages) {
      const packagePath = resolveMainFilePath(path.join(this.options.sourceDir, item ), frameworkExts)
      if (!this.isWatch) {
        printLog(processTypeEnum.COMPILE, '发现子应用', this.getShowPath(packagePath))
      }
      this.compileFile({
        name: item,
        path: packagePath,
        isNative: false
      })
      const fileConfig = this.filesConfig[this.getConfigFilePath(item)]
      const appConfig = fileConfig ? fileConfig.content || {} : {}
      if (isEmptyObject(appConfig)) {
        throw new Error('子应用缺少 app 全局配置文件，请检查！')
      }

      // console.log(appConfig,'appConfig')
      this.appConfigs[`${this.getConfigFilePath(item)}`] = appConfig
    }
  }

  getPackagePages(){
    const { frameworkExts, prerender } = this.options
    for (const appConfig in this.appConfigs) {
      console.log(this.appConfigs[appConfig],'appConfig')
      let pages = this.appConfigs[appConfig].pages as string[]

      let subPackages = this.appConfigs[appConfig].subPackages as any[]

      for (let i of subPackages) {
        i.root = path.join(appConfig.replace('app.config',''),i.root)
        this.appConfig.subPackages.push(i)
      }
      for(let i of pages){
        console.log(path.join(appConfig.replace('app.config',''),i))
        this.appConfig.pages.push(path.join(appConfig.replace('app.config',''),i))
      }
    }


    // const fileConfig = this.filesConfig[this.getConfigFilePath(item)]
    // const appConfig = fileConfig ? fileConfig.content || {} : {}

  }
}
