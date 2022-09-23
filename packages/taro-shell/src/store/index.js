import { init } from '@rematch/core'
import appConfig from "@/app.config"
const PACKAGE_ENV = process.env.PACKAGE_ENV
import {getModels} from '@/utils'

const getPackages = () => {
  let { packages } = appConfig;
  let subPackages = packages.find((i) => i.name === PACKAGE_ENV);
  return subPackages?.packages || packages
}
const mergeModels = ()=>{
  let packages = getPackages()
  const models = getModels(require.context("./models", false, /\.js$/));
  for (const key of packages) {
    let name = key.replace('app','store/index')
    const subModels = require('@/'+ name+ ".js").models
    for (const [name, config] of Object.entries(subModels)){
      if(Object.keys(models).includes(name)){
        for (const [key, value] of Object.entries(config)) {
          if(key === 'effects'){
            let rootEffects = models[name][key]()
            let effects = value()
            models[name][key] = dispatch => ({
              ...rootEffects,
              ...effects
            })
          }
          if(key !== 'name' && key !== 'effects'){
            let rootValue = models[name][key]
            models[name][key] = { ...rootValue, ...value }
          }
        }
      }else{
        models[name] = config
      }
    }
  }
  return models
}

const middlewares = []
if (process.env.API_ENV == 'prod' && process.env.TARO_ENV !== 'quickapp') {
  middlewares.push(require('redux-logger').createLogger({ collapsed: true }))
}

const store = init({
  name: "taro-shell",
  models: mergeModels(),
  plugins: [],
  redux: {
    middlewares,
  },
})

export default store

