// import { PLATFORMS, taroJsComponents } from '@tarojs/helper'
import { IPluginContext } from '@tarojs/service'
// import * as path from 'path'
// import BuildMicroAppPlugin from '@taro-microapp/build-microapp-plugin'
// import {
//   getEntry,
//   getRuntimeConstants,
//   mergeOption,
//   processEnvOption
// } from '@tarojs/mini-runner/dist/webpack/chain'
// let miniPluginOptions =  {};

export default (ctx: IPluginContext) => {
	// const appPath = ctx.ctx.appPath
	ctx.modifyWebpackChain(({chain}) => {
		console.log('modifyWebpackChain')
		chain.plugins.delete('miniPlugin')
		// chain.merge({
		// 	plugin: {
		// 	  install: {
		// 	    plugin:BuildMicroAppPlugin,
		// 	    args: [miniPluginOptions]
		// 	  }
		// 	}
		// })
	})
	// ctx.modifyComponentConfig(({config}) => {
	// 	console.log('modifyComponentConfig',)
	// 	const {
	// 		buildAdapter = PLATFORMS.WEAPP,
	// 		alias = {},
	// 		entry = {},
	// 		fileType = {
	// 			style: '.wxss',
	// 			config: '.json',
	// 			script: '.js',
	// 			templ: '.wxml'
	// 		},
	// 		outputRoot = 'dist',
	// 		sourceRoot = 'src',
	// 		isBuildPlugin = false,
	// 		runtimePath,
	// 		taroComponentsPath,

	// 		designWidth = 750,
	// 		deviceRatio,
	// 		baseLevel = 16,
	// 		framework = 'nerv',
	// 		frameworkExts,
	// 		prerender,
	// 		minifyXML = {},
	// 		hot = false,

	// 		defineConstants = {},
	// 		runtime = {},
	// 		env = {},
	// 		nodeModulesPath,
	// 		isBuildQuickapp = false,
	// 		template,
	// 		quickappJSON,

	// 		commonChunks,
	// 		addChunkPages,

	// 		blended,
	// 		isBuildNativeComp,

	// 		modifyMiniConfigs,
	// 		modifyBuildAssets,
	// 		onCompilerMake,
	// 		onParseCreateElement
	// 	} = config
	// 	const sourceDir = path.join(appPath, sourceRoot)
	// 	const outputDir = path.join(appPath, outputRoot)
	// 	alias[taroJsComponents + '$'] = taroComponentsPath || `${taroJsComponents}/mini`
	// 	env.FRAMEWORK = JSON.stringify(framework)
	// 	env.TARO_ENV = JSON.stringify(buildAdapter)
	// 	const runtimeConstants = getRuntimeConstants(runtime)
	// 	const constantsReplaceList = mergeOption([processEnvOption(env), defineConstants, runtimeConstants])
	// 	const entryRes = getEntry({
	// 		sourceDir,
	// 		entry,
	// 		isBuildPlugin
	// 	})
	// 	const defaultCommonChunks = isBuildPlugin
	// 		? ['plugin/runtime', 'plugin/vendors', 'plugin/taro', 'plugin/common']
	// 		: ['runtime', 'vendors', 'taro', 'common']
	// 	let customCommonChunks = defaultCommonChunks
	// 	if (typeof commonChunks === 'function') {
	// 		customCommonChunks = commonChunks(defaultCommonChunks.concat()) || defaultCommonChunks
	// 	} else if (Array.isArray(commonChunks) && commonChunks.length) {
	// 		customCommonChunks = commonChunks
	// 	}
	// 	miniPluginOptions = {
	// 		sourceDir,
	// 		outputDir,
	// 		constantsReplaceList:constantsReplaceList,
	// 		nodeModulesPath,
	// 		isBuildQuickapp,
	// 		template,
	// 		fileType,
	// 		quickappJSON,
	// 		designWidth,
	// 		deviceRatio,
	// 		pluginConfig: entryRes.pluginConfig,
	// 		pluginMainEntry: entryRes.pluginMainEntry,
	// 		isBuildPlugin: Boolean(isBuildPlugin),
	// 		commonChunks: customCommonChunks,
	// 		baseLevel,
	// 		framework,
	// 		frameworkExts,
	// 		prerender,
	// 		addChunkPages,
	// 		modifyMiniConfigs,
	// 		modifyBuildAssets,
	// 		onCompilerMake,
	// 		onParseCreateElement,
	// 		minifyXML,
	// 		runtimePath,
	// 		blended,
	// 		isBuildNativeComp,
	// 		alias,
	// 		hot
	// 	}
	// })
	// ctx.modifyMiniConfigs((args) => {
	// 	delete args.configMap['app.config'].content.subPackages
	// 	console.log('modifyMiniConfigs', args.configMap['app.config'].content)
	// })
}
