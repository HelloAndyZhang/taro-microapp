import { IPluginContext } from '@tarojs/service'
import minimist from 'minimist'
import MicroAppMiniPlugin from './plugins/MicroAppMiniPlugin'
let miniPluginOptions = {};
import {createMiniPluginOptions} from './utils'
import * as path from 'path'

export default (ctx: IPluginContext) => {
  const appPath = ctx.ctx.appPath
  const { PACKAGE_ENV, API_ENV}  = minimist(process.argv.slice(2),{
    string:['PACKAGE_ENV','API_ENV']
  })
  let defaultENV = ctx.initialConfig.env || {}
  process.env.PACKAGE_ENV =  PACKAGE_ENV||"PaoTui"
  process.env.API_ENV =  API_ENV||'prod'
  const env = {
    PACKAGE_ENV: JSON.stringify(process.env.PACKAGE_ENV) ,
    API_ENV:JSON.stringify(process.env.API_ENV)
  }
  Object.assign(ctx.initialConfig, { env: Object.assign(defaultENV, env) })
  ctx.modifyComponentConfig(({ config }) => {
    miniPluginOptions = createMiniPluginOptions(appPath,config)
  })
  ctx.modifyWebpackChain(({ chain }) => {
    chain.plugins.delete('miniPlugin')
    chain.merge({
      plugin: {
        install: {
          plugin: MicroAppMiniPlugin,
          args: [miniPluginOptions,]
        }
      },
      module: {
        rule: {
          'microapp-loader': {
            test: /\/src\/app\.(js|jsx)$/,
            loader: require.resolve('./loaders/withAppLoader'),
            options:{
              PACKAGE_ENV:process.env.PACKAGE_ENV,
            },
            // enforce: 'pre',
          }
        }
      }
    })
    setTimeout(() => {
      console.log(chain.toConfig().module.rules[5])
    },2000)
  })
}
