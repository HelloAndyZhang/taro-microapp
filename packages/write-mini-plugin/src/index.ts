import { PLATFORMS, taroJsComponents } from '@tarojs/helper'
import { IPluginContext } from '@tarojs/service'
import minimist from 'minimist'
import * as path from 'path'

import {
  getEntry,
  getRuntimeConstants,
  mergeOption,
  processEnvOption
} from '@tarojs/mini-runner/dist/webpack/chain'
import BuildMicroAppPlugin from './build-microapp-plugin'
let miniPluginOptions = {};

export default (ctx: IPluginContext) => {
  const appPath = ctx.ctx.appPath
  const { PACKAGE_ENV, API_ENV}  = minimist(process.argv.slice(2),{
    string:['PACKAGE_ENV','API_ENV']
  })
  let defaultENV = ctx.initialConfig.env || {}
  process.env.PACKAGE_ENV =  JSON.stringify(PACKAGE_ENV||"PaoTui")
  process.env.API_ENV =  JSON.stringify(API_ENV||'prod')
  console.log(process.env.PACKAGE_ENV )
  const env = {
    PACKAGE_ENV: process.env.PACKAGE_ENV,
    API_ENV: process.env.API_ENV
  }
  Object.assign(ctx.initialConfig, { env: Object.assign(defaultENV, env) })
  ctx.modifyComponentConfig(({ config }) => {
    const {
      buildAdapter = PLATFORMS.WEAPP,
      alias = {},
      entry = {},
      fileType = {
        style: '.wxss',
        config: '.json',
        script: '.js',
        templ: '.wxml'
      },
      outputRoot = 'dist',
      sourceRoot = 'src',
      isBuildPlugin = false,
      runtimePath,
      taroComponentsPath,

      designWidth = 750,
      deviceRatio,
      baseLevel = 16,
      framework = 'nerv',
      frameworkExts,
      prerender,
      minifyXML = {},
      hot = false,

      defineConstants = {},
      runtime = {},
      env = {},
      nodeModulesPath,
      isBuildQuickapp = false,
      template,
      quickappJSON,

      commonChunks,
      addChunkPages,

      blended,
      isBuildNativeComp,

      modifyMiniConfigs,
      modifyBuildAssets,
      onCompilerMake,
      onParseCreateElement
    } = config
    const sourceDir = path.join(appPath, sourceRoot)
    const outputDir = path.join(appPath, outputRoot)
    alias[taroJsComponents + '$'] = taroComponentsPath || `${taroJsComponents}/mini`
    env.FRAMEWORK = JSON.stringify(framework)
    env.TARO_ENV = JSON.stringify(buildAdapter)
    const runtimeConstants = getRuntimeConstants(runtime)
    const constantsReplaceList = mergeOption([processEnvOption(env), defineConstants, runtimeConstants])
    const entryRes = getEntry({
      sourceDir,
      entry,
      isBuildPlugin
    })
    const defaultCommonChunks = isBuildPlugin
      ? ['plugin/runtime', 'plugin/vendors', 'plugin/taro', 'plugin/common']
      : ['runtime', 'vendors', 'taro', 'common']
    let customCommonChunks = defaultCommonChunks
    if (typeof commonChunks === 'function') {
      customCommonChunks = commonChunks(defaultCommonChunks.concat()) || defaultCommonChunks
    } else if (Array.isArray(commonChunks) && commonChunks.length) {
      customCommonChunks = commonChunks
    }
    Object.assign(miniPluginOptions, {
      sourceDir,
      outputDir,
      constantsReplaceList: constantsReplaceList,
      nodeModulesPath,
      isBuildQuickapp,
      template,
      fileType,
      quickappJSON,
      designWidth,
      deviceRatio,
      pluginConfig: entryRes.pluginConfig,
      pluginMainEntry: entryRes.pluginMainEntry,
      isBuildPlugin: Boolean(isBuildPlugin),
      commonChunks: customCommonChunks,
      baseLevel,
      framework,
      frameworkExts,
      prerender,
      addChunkPages,
      modifyMiniConfigs,
      modifyBuildAssets,
      onCompilerMake,
      onParseCreateElement,
      minifyXML,
      runtimePath,
      blended,
      isBuildNativeComp,
      alias,
      hot
    })
  })
  ctx.modifyWebpackChain(({ chain }) => {
    chain.plugins.delete('miniPlugin')
    chain.merge({
      plugin: {
        install: {
          plugin: BuildMicroAppPlugin,
          args: [miniPluginOptions,]
        }
      }
    })
  })
}
