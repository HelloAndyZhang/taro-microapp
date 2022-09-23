import { getModels } from '@/utils'
const models = getModels(require.context("./models", false, /\.js$/))

export {
  models
}
