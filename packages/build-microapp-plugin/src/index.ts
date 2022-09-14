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

import * as path from 'path'


interface AppConfigs {
  [configName: string]: AppConfig
}
export default class BuildMicroAppPlugin extends MiniPlugin {
  [x: string]: any
  appConfigs:AppConfigs={}
  constructor(private opts: any) {
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
  }

  getPackages() {
    const { frameworkExts, prerender } = this.options
    const appPackages = this.appConfig.packages
    if(!appPackages) return
    delete this.appConfig.packages
    for (const item of appPackages) {
      const filePath = resolveMainFilePath(path.join(this.options.sourceDir, item ), frameworkExts)
      const fileConfigPath = this.getConfigFilePath(filePath)
      if (!this.isWatch) {
        printLog(processTypeEnum.COMPILE, '发现子应用', this.getShowPath(fileConfigPath))
      }
      const fileConfig = readConfig(fileConfigPath)
      if (isEmptyObject(fileConfig)) {
        throw new Error('子应用缺少 app 全局配置文件，请检查！')
      }
      this.appConfigs[this.getConfigFilePath(item)] = fileConfig
    }
    this.getMergeAppConfig()
  }

  getMergeAppConfig(){
    for (const [filePath, appConfig] of Object.entries(this.appConfigs)) {
      let packagePath = filePath.replace('app.config','')
      for(let config  in  appConfig){
        // 合并pages
        if(config === 'pages'){
          for(let i of appConfig.pages){
            this.appConfig.pages.push(path.join(packagePath,i))
          }
          continue
        }
        // 合并 subPackages
        if(config === 'subPackages'){
          for (let i of appConfig.subPackages) {
            i.root = path.join(packagePath,i.root)
            this.appConfig.subPackages.push(i)
          }
          continue
        }
        //把打包的应用合并至壳子
        if(filePath.includes(this.opts.PACKAGE_ENV)){
          this.appConfig[config] = Object.assign((this.appConfig[config]||appConfig[config]),appConfig[config])
        }
      }
    }
  }
}
